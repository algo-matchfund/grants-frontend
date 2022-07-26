import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAsyncEffect } from '/hooks';

import './ContractOverview.scss';

const ContractOverview = ({ appId }) => {
  const { t } = useTranslation();
  const [txnId, setTxnId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [block, setBlock] = useState('');

  useAsyncEffect(async (_, safeUpdate) => {
    if (appId) {
      try {
        const { data, status, statusText } = await axios.get(
          `https://indexer.${process.env.ALGOEXPLORER_API_URL}/rl/v1/transactions?application-id=${appId}`
        );
        if (status !== 200) throw new Error(statusText);
        const createAppTxn = data.transactions[data.transactions.length - 1];
        safeUpdate(() => setTxnId(createAppTxn['id']));
        safeUpdate(() =>
          setTimestamp(
            new Date(createAppTxn['round-time'] * 1000).toUTCString()
          )
        );
        safeUpdate(() => setBlock(createAppTxn['confirmed-round']));
      } catch (error) {
        console.error(error);
      }
    }
  }, [appId]);

  return (
    <div className='contract-overview'>
      <h5>{t('Smart contract overview')}</h5>
      <div className='cards'>
        <div className='card'>
          <h6>{t('Application ID')}</h6>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://${process.env.ALGOEXPLORER_URL}/application/${appId}`}
            className='value'
          >
            {appId}
          </a>
        </div>
        <div className='card'>
          <h6>{t('Timestamp')}</h6>
          <div className='value'>{timestamp}</div>
        </div>
        <div className='card'>
          <h6>{t('Block')}</h6>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://${process.env.ALGOEXPLORER_URL}/block/${block}`}
            className='value'
          >
            {block}
          </a>
        </div>
        <div className='card'>
          <h6>{t('Transaction ID')}</h6>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://${process.env.ALGOEXPLORER_URL}/tx/${txnId}`}
            className='value'
          >
            {txnId}
          </a>
        </div>
      </div>
    </div>
  );
};

ContractOverview.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default ContractOverview;
