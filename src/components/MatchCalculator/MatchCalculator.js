import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'shards-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import { PopupAlertDispatchContext } from '/context';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import AlgosignerService from '/service/PaymentProviders/algosigner';
import { useApi } from '/hooks';

import './MatchCalculator.scss';
import AlgoLogo from '/assets/images/AlgoLogo';

const ALGOSIGNER = new AlgosignerService();
// base64 bytes
const TOTAL_FUND_KEY = 'dG90YWxfZnVuZA==';
const MATCH_KEY = 'bWF0Y2g=';
const CONTRIBUTOR_KEY = 'Y29udHJpYnV0b3Jz';

const getGlobalStateValue = (txnObj, key) => {
  return txnObj['global-state-delta'].filter((el) => el.key === key)[0].value
    .uint;
};

const findRecentMatch = (txns) => {
  for (let tx of txns) {
    if (tx['global-state-delta']) {
      for (let g of tx['global-state-delta']) {
        if (g.key === MATCH_KEY) {
          return g.value.uint;
        }
      }
    }
  }
  return 0;
};

const findRecentContributors = (txns) => {
  for (let tx of txns) {
    if (tx['global-state-delta']) {
      for (let g of tx['global-state-delta']) {
        if (g.key === CONTRIBUTOR_KEY) {
          return g.value.uint;
        }
      }
    }
  }
  return 0;
};

const calculateMatch = (targetMatch, matches, matchingPool) => {
  const totalMatch = matches.reduce((prev, curr) => prev + curr, 0);
  const factor = matchingPool / totalMatch;
  return totalMatch <= matchingPool ? targetMatch : targetMatch * factor;
};

const formatAlgos = (amount) => {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 1000000);
};

const MatchCalculator = ({ appId }) => {
  const { t } = useTranslation();
  const { alertWarning, alertError } = useContext(PopupAlertDispatchContext);
  const { keycloak } = useKeycloak();
  const api = useApi();

  const [fund, setFund] = useState('--');
  const [matchDifference, setMatchDifference] = useState('--');
  const [algosignerInstalled, setAlgosignerInstalledState] = useState(false);
  const [account, setAccount] = useState();

  const getMatchResult = async () => {
    if (!keycloak.token) {
      alertError('You must be logged in to calculate match');
      return;
    }

    if (!algosignerInstalled) {
      alertError('You must have AlgoSigner installed to calculate match');
    }

    const [, error] = await ALGOSIGNER.connect();
    if (error) {
      alertError(error);
      return;
    }

    let currentAccount = account;
    if (!currentAccount) {
      const algosignerAccounts = await ALGOSIGNER.getAccounts();
      if (algosignerAccounts.length >= 1) {
        currentAccount = algosignerAccounts[0].address;
        setAccount(currentAccount);
      }
    }
    if (!currentAccount) {
      alertError(
        'You must be signed in to your Algorand account in AlgoSigner to calculate match'
      );
      return;
    }

    // get transactions for current project
    const { data, status } = await axios.get(
      `https://indexer.${process.env.ALGOEXPLORER_API_URL}/rl/v1/transactions?application-id=${appId}`
    );
    if (status !== 200) {
      alertError(
        'You must be signed in to your Algorand account in AlgoSigner to calculate match'
      );
      return;
    }

    let userLatestTransaction;
    for (let transaction of data.transactions) {
      if (
        transaction.sender === currentAccount &&
        transaction['local-state-delta']
      ) {
        userLatestTransaction = transaction;
        break;
      }
    }
    if (!userLatestTransaction) {
      alertWarning('You have not donated to this project yet.');
      return;
    }

    // get current round match pool
    const [res, statusCode] = await api.getStats();
    if (statusCode === 500 || !res) {
      alertError('Failed to get projects');
      return;
    }

    const matchingPool = res['match_amount'];

    // get appIds of all projects
    const [r, s] = await api.getProjects();
    if (s === 500 || !r) {
      alertError('Failed to get projects');
      return;
    }
    const promises = r.map((el) =>
      axios.get(
        `https://indexer.${process.env.ALGOEXPLORER_API_URL}/rl/v1/transactions?application-id=${el.appId}`
      ).catch(e => {
        console.log(`failed to get project for ${el.appId}: `, e);
      })
    );
    let results = [];
    try {
      results = await Promise.all(promises);
    } catch (e) {
      alertError('Failed to get projects');
    }
    // filter out failed requests. Note: only suitable for demo purposes. Match should not be calculated if failing to fetch any project.
    results = results.filter(el => el);
    console.log(userLatestTransaction);
    const currentProjectMatch = getGlobalStateValue(
      userLatestTransaction,
      MATCH_KEY
    );
    const matches = results.map((r) => findRecentMatch(r.data.transactions));
    let currentMatch = calculateMatch(
      currentProjectMatch,
      matches,
      matchingPool
    );

    const donatorsCount = findRecentContributors(data.transactions);
    const totalFund = getGlobalStateValue(
      userLatestTransaction,
      TOTAL_FUND_KEY
    );
    const userDonation =
      userLatestTransaction['local-state-delta'][0].delta[0].value.uint;
    const matchLessUserDonation =
      donatorsCount > 1
        ? (Math.sqrt(currentProjectMatch + totalFund) -
            Math.sqrt(userDonation)) **
            2 -
          totalFund -
          userDonation
        : 0;
    const matchWithoutUserDonation = calculateMatch(
      matchLessUserDonation,
      matches,
      matchingPool
    );

    setFund(formatAlgos(userDonation));
    setMatchDifference(formatAlgos(currentMatch - matchWithoutUserDonation));
  };

  // check if AlgoSigner is installed
  useEffect(() => {
    setAlgosignerInstalledState(ALGOSIGNER.available());
  }, []);

  return (
    <div className='match-calculator'>
      <h5>{t('Calculate match you generated for this project')}</h5>
      <Button theme='success' onClick={getMatchResult}>
        {t('Calculate')}
      </Button>
      <div className='cards'>
        <div className='card'>
          <AlgoLogo />
          <h6>{t('Your fund')}</h6>
          <div>{fund} Algos</div>
        </div>
        <div className='card'>
          <div className='match-calculator-match-icon'>
            <FontAwesomeIcon icon={faArrowUp} size='2x' />
          </div>
          <h6>{t('Match generated')}</h6>
          <div>{matchDifference} Algos</div>
        </div>
      </div>
    </div>
  );
};

MatchCalculator.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default MatchCalculator;
