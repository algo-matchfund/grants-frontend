import { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { createHash } from 'crypto';
import { Form, Button, FormGroup, FormSelect } from 'shards-react';
import { useAsyncEffect } from '/hooks';
import { PopupAlertDispatchContext } from '/context';
import { useApi, usePaymentProvider } from '/hooks';
import { AMOUNT_MULTIPLIER } from '/constant';

const AlgosignerPayment = ({
  children,
  ConfirmButton,
  paymentState,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const { alertError, alertWarning } = useContext(PopupAlertDispatchContext);
  const history = useHistory();
  const algosigner = usePaymentProvider('algosigner');
  const api = useApi();

  const [algosignerInstalled, setAlgosignerInstalledState] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [paymentAccount, setPaymentAccount] = useState();
  const [algosignerReady, setAlgosignerReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [signedOptinTxn, setSignedOptinTxn] = useState();
  const [signedSetDonationTxn, setSignedSetDonationTxn] = useState();
  // Only disable submit button on load if donation type is "Algorand",
  // because ASAs are currently not recorded in project smart contract so no need to check for it
  const [projectTxnsSent, setProjectTxnsSent] = useState(
    paymentState.type !== 'Algorand'
  );

  const onConnect = useCallback(async () => {
    if (!algosignerInstalled) {
      return;
    }

    const [success, error] = await algosigner.connect();
    setAlgosignerReady(success);
    if (error) {
      alertError(error);
      return;
    }

    const algosignerAccounts = await algosigner.getAccounts();

    setAccounts(algosignerAccounts.map((acc) => acc.address));
    if (algosignerAccounts.length >= 1) {
      setPaymentAccount(algosignerAccounts[0].address);
    }
  }, [algosignerInstalled]);

  const waitForTx = useCallback(async (txid) => {
    let attempt = 0;
    let tx;
    do {
      attempt++;
      tx = await algosigner.getPendingTransaction(txid);
      if (tx !== undefined) {
        break;
      }
      await new Promise((sleepResolve) => setTimeout(sleepResolve, 5000));
    } while (attempt < 12);

    return tx !== undefined;
  });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (inProgress) {
        return;
      }

      if (
        paymentState?.project === undefined ||
        paymentState?.fund === undefined
      ) {
        alertError('No project selected for funding');
        return;
      }

      setInProgress(true);
      try {
        const suggestedParams = await algosigner.getTransactionParams();

        const note = new TextEncoder().encode(
          createHash('sha256')
            .update(paymentState.project.id)
            .update(keycloak.tokenParsed.sub)
            .digest('hex')
        );

        const tx = algosigner.transaction(
          paymentAccount,
          paymentState.project.algorand_wallet,
          paymentState.fund,
          note,
          suggestedParams,
          paymentState.assetId
        );
        const signedTxs = await algosigner.sign(tx);
        if (!signedTxs?.length) {
          alertError('Failed to sign funding transactions');
          setInProgress(false);
          return;
        }

        if (paymentState.type === 'Algorand') {
          // send project optin transaction
          try {
            await algosigner.send(signedOptinTxn);
          } catch (e) {
            if (!e?.message.includes('has already opted in to app')) {
              console.log(e);
              alertError('Failed to call "optin" to app');
            }
            return;
          }

          // send project "set_donation" transaction
          try {
            await algosigner.send(signedSetDonationTxn);
          } catch (e) {
            console.log(e);
            alertError('Failed to call "set_donation" to app');
            return;
          }
        }

        // send transfer transaction
        const result = await algosigner.send(signedTxs[0].blob);

        if (!result.txId) {
          alertError('Failed to send funding transactions');
          setInProgress(false);
          return;
        }

        const txFound = await waitForTx(result.txId);
        if (!txFound) {
          alertError("The transaction wasn't confirmed in 1 minute");
          setInProgress(false);
          return;
        }

        if (paymentState.type === 'Algorand') {
          const [_, status] = await api.submitFundTx(
            paymentState.project.id,
            result.txId,
            'algorand',
            keycloak.token
          );

          if (status !== 200) {
            alertError(
              'Failed to submit funding transactions, please contact support'
            );
            setInProgress(false);
            return;
          }
        }

        let approximateConfirmationWait = -1;
        // the funding was successful, we don't want to display failure if
        // we can't estimate confirmation time, so this part is wrapped in extra
        // try/catch
        try {
          const currentBlock = await algosigner.getCurrentBlock();
          if (currentBlock) {
            const averageBlockTime = await algosigner.getAverageBlockTime(
              currentBlock,
              10
            );
            if (averageBlockTime) {
              approximateConfirmationWait = averageBlockTime * 10;
            }
          }
        } catch (e) {
          console.error(e);
          alertWarning('Cannot estimate approximate funding confirmation time');
        }

        setInProgress(false);
        onSuccess();
        history.push({
          pathname: '/fund/success',
          state: {
            detail: {
              name: paymentState.project.name,
              link: paymentState.project.homepage,
              fund: paymentState.fund,
              wait: approximateConfirmationWait,
            },
          },
        });
      } catch (e) {
        console.error(e);
        setInProgress(false);

        alertError('Failed to fund projects');
      }
    },
    [paymentState, paymentAccount, onSuccess, signedOptinTxn, signedSetDonationTxn]
  );

  useEffect(() => {
    setAlgosignerInstalledState(algosigner.available());
  }, [algosigner]);

  // Prepare signed transactions after connected with Algosigner wallet
  useAsyncEffect(
    async (_, safeUpdate) => {
      if (paymentState.type === 'Algorand') {
        if (paymentAccount) {
          const [result, status] = await api.getUnsignedTransactions(
            paymentState.project.appId,
            paymentState.fund * AMOUNT_MULTIPLIER,
            paymentAccount,
            keycloak.token
          );
          if (status !== 200) {
            alertError(
              'Failed to process funding transactions, please contact support'
            );
            return;
          }

          const signedOptin = await AlgoSigner.signTxn([
            { txn: result?.optin },
          ]);
          if (!signedOptin?.length) {
            alertError('Failed to sign "optin" transaction');
            return;
          }
          setSignedOptinTxn(signedOptin[0].blob);

          const signedSetDonation = await AlgoSigner.signTxn([
            { txn: result?.set_donation },
          ]);
          if (!signedSetDonation?.length) {
            console.log(e);
            alertError('Failed to sign "set_donation" transaction');
            return;
          }
          setSignedSetDonationTxn(signedSetDonation[0].blob);

          setProjectTxnsSent(true);
        }
      }
    },
    [paymentAccount]
  );

  return (
    <>
      <Form
        id='payment-form'
        action='#'
        onSubmit={onSubmit}
        className='d-flex flex-column justify-content-between'
      >
        {algosignerInstalled && !algosignerReady && (
          <Button onClick={onConnect}>{t('Connect AlgoSigner')}</Button>
        )}

        {algosignerReady && accounts && accounts.length > 0 && (
          <FormGroup>
            <label htmlFor='payment-account'>
              {t('Select an account to pay from')}
            </label>
            <FormSelect
              id='payment-account'
              value={paymentAccount}
              onChange={(e) => setPaymentAccount(e.target.value)}
            >
              {accounts.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
        )}

        {algosignerReady && paymentAccount !== undefined && (
          <p>{t('Click confirm to pay using AlgoSigner extension.')}</p>
        )}

        {!algosignerInstalled && (
          <p>{t("AlgoSigner extension doesn't seem to be installed.")}</p>
        )}

        <p>
          {t(
            'AlgoSigner is an open source Algorand wallet extension for Chrome.'
          )}
          &nbsp;
          <a
            href='https://purestake.com/technology/algosigner'
            target='_blank'
            title={t('AlgoSigner extension')}
          >
            {t('Learn more')}
          </a>
        </p>
      </Form>

      {children}

      {algosignerReady && (
        <ConfirmButton
          inProgress={inProgress}
          disabled={
            !projectTxnsSent ||
            inProgress ||
            paymentState?.project === undefined ||
            paymentState?.fund === undefined
          }
        />
      )}
    </>
  );
};

AlgosignerPayment.propTypes = {
  children: PropTypes.node,
  ConfirmButton: PropTypes.elementType.isRequired,
  paymentState: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

AlgosignerPayment.defaultProps = {
  children: null,
  onSuccess: () => {},
};

export default AlgosignerPayment;
