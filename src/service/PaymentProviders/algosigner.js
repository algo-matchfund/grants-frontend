import {
  Algodv2,
  algosToMicroalgos,
  makePaymentTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  assignGroupID,
} from 'algosdk';
import axios from 'axios';

import PaymentProvider from './provider';

const ERROR_DESC_MAP = {
  4100: 'Algorand wallet is not set up',
  4001: 'Access to your wallet was rejected',
};

const ALGO_NODE = {
  MainNet: 'https://mainnet-algorand.api.purestake.io/ps2/v2',
  TestNet: 'https://testnet-algorand.api.purestake.io/ps2/v2',
};

class AlgosignerService extends PaymentProvider {
  constructor() {
    super();
    this.ledger = process.env.ALGORAND_LEDGER || 'TestNet';
    this.client = axios.create({
      baseURL: ALGO_NODE[this.ledger],
      headers: {
        'x-api-key': process.env.ALGOD_TOKEN,
      },
    });
  }

  available() {
    return typeof AlgoSigner !== 'undefined';
    // if the AlgoSigner extension is installed on the user's browser, the `AlgoSigner` object will be injected
  }

  async connect() {
    try {
      const r = await AlgoSigner.connect();
      if (!r) {
        // timeout
        return [false];
      }

      // an empty object is returned if access was granted, otherwise there's a code and message
      if (r && r.code) {
        return [false, ERROR_DESC_MAP[r.code] || 'Unknown AlgoSigner error'];
      }

      return [true];
    } catch (e) {
      console.error(e);
      // an empty object is returned if access was granted, otherwise there's a code and message
      if (e && e.code) {
        return [false, ERROR_DESC_MAP[r.code] || 'Unknown AlgoSigner error'];
      }
    }
  }

  async getAccounts() {
    return AlgoSigner.accounts({ ledger: this.ledger });
  }

  async getTransactionParams() {
    const resp = await this.client.get('/transactions/params');
    return resp.data;
  }

  async getPendingTransaction(txid) {
    const resp = await this.client.get(`/transactions/pending/${txid}`);
    return resp?.data?.txn?.txn;
  }

  async getCurrentBlock() {
    const resp = await this.client.get('/status');
    return resp?.data?.['last-round'];
  }

  async getBlockTime(block) {
    const resp = await this.client.get(`/blocks/${block}`);
    return resp?.data?.block.ts;
  }

  async getAverageBlockTime(lastBlock, blockWindow) {
    if (lastBlock < blockWindow) {
      return -1;
    }

    const [first, last] = await Promise.all([
      this.getBlockTime(lastBlock - blockWindow),
      this.getBlockTime(lastBlock),
    ]);

    if (first && last) {
      return Math.round((last - first) / blockWindow);
    }

    return -1;
  }

  transaction(from, to, amount, note, params, assetIndex = -1) {
    let txn;
    // "assetIndex" should be -1 or not provided if funding with Algos 
    if (assetIndex > 0) {
      txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount: algosToMicroalgos(amount),
        note,
        assetIndex,
        suggestedParams: {
          flatFee: params['min-fee'],
          fee: params['min-fee'],
          firstRound: params['last-round'],
          lastRound: params['last-round'] + 100,
          genesisID: params['genesis-id'],
          genesisHash: params['genesis-hash'],
        },
      });
    } else {
      txn = makePaymentTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount: algosToMicroalgos(amount),
        note,
        suggestedParams: {
          flatFee: params['min-fee'],
          fee: params['min-fee'],
          firstRound: params['last-round'],
          lastRound: params['last-round'] + 100,
          genesisID: params['genesis-id'],
          genesisHash: params['genesis-hash'],
        },
      });
    }

    return txn;
  }

  async sign(tx) {
    [tx] = assignGroupID([tx]);
    const binTx = tx.toByte();
    const encodedTx = await AlgoSigner.encoding.msgpackToBase64(binTx);

    return AlgoSigner.signTxn([{ txn: encodedTx }]);
  }

  async send(rawTx) {
    return AlgoSigner.send({ ledger: this.ledger, tx: rawTx });
  }
}

export default AlgosignerService;
