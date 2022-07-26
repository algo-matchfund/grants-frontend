import { useState } from 'react';
import { useAsyncEffect } from '/hooks';
import PropTypes from 'prop-types';
import axios from 'axios';

import './ASAsDisplay.scss';

function ASAsDisplay({ appId }) {
  const [assetAmount, setAssetAmount] = useState(0);

  const toTwoDP = (number) =>
    Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

  useAsyncEffect(
    async (_, safeUpdate) => {
      if (appId) {
        try {
          const { data, status, statusText } = await axios.get(
            `https://indexer.${process.env.ALGOEXPLORER_API_URL}/rl/v1/transactions?application-id=${appId}`
          );
          if (status !== 200) throw new Error(statusText);
          const createAppTxn = data.transactions[data.transactions.length - 1];
          const ownerAddressKey = 'b3duZXJfYWRkcmVzcw=='; //base64
          // base64 to ASCII string
          const ownerAddress = window.atob(
            createAppTxn?.['global-state-delta'].filter(
              (g) => g?.key === ownerAddressKey
            )?.[0].value.bytes
          );
          const {
            data: txnData,
            status: txnStatus,
            statusText: txnStatusText,
          } = await axios.get(
            `https://indexer.${process.env.ALGOEXPLORER_API_URL}/v2/accounts/${ownerAddress}?include-all=false&apps-local-state-limit=50&assets-limit=50&exclude=created-apps,created-assets`
          );
          if (txnStatus !== 200) throw new Error(txnStatusText);
          const USDCid = 10458941;
          const USDCArray = txnData.account.assets.filter(
            (a) => a?.['asset-id'] === USDCid
          );
          if (USDCArray.length > 0)
            setAssetAmount(toTwoDP(USDCArray[0].amount / 1000000));
        } catch (error) {
          console.error(error);
        }
      }
    },
    [appId]
  );
  return assetAmount > 0 ? (
    <div className='ASA-display'>
      <div>Algorand Standard Assets donations:</div>
      <div className='amount'>{assetAmount} USDC</div>
    </div>
  ) : (
    <></>
  );
}

ASAsDisplay.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default ASAsDisplay;
