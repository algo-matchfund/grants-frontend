import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from '@react-hook/debounce';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';
import { FormInput, ModalBody, Button } from 'shards-react';
import { useHistory } from 'react-router-dom';

import { PopupAlertDispatchContext } from '/context';
import { useApi, useAsyncEffect, useCookieStorage } from '/hooks';
import { ProjectShape } from '/service/doc';
import LiftOff from '/components/LiftOff';
import MeteorShowerEffect from '/components/FundingRound/MeteorShowerEffect';
import AlgoLogo from '/assets/images/AlgoLogo';

const toTwoDP = (number) =>
  Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

const SetAlgorandValue = ({ project, launch, setLaunch }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { keycloak } = useKeycloak();
  const { alertWarning } = useContext(PopupAlertDispatchContext);
  const [cartItems, setCartItems] = useCookieStorage('cartItems');
  const api = useApi();

  const [input, setInput] = useState('0');
  const [amount, setAmountDebounced, setAmount] = useDebounce(0, 200);
  const [matchIncrease, setMatchIncrease] = useState(0);

  useEffect(() => {
    const [integer, decimal] = input.split('.');
    if (
      !isNaN(input) &&
      integer.length < 8 &&
      (!decimal || (decimal && decimal.length < 3))
    ) {
      setAmountDebounced(+input);
    }
  }, [input]);

  const toCheckout = () => {
    if (!keycloak?.token) {
      alertWarning('You must sign in to continue');
      return;
    }

    setLaunch(true);
    setTimeout(() => {
      setCartItems([{ project, fund: amount, match: matchIncrease, type: 'Algorand', assetId: -1 }]);
      // change this place to support multiple cart items

      history.push({
        pathname: '/checkout',
        state: { project, fund: amount, match: matchIncrease, type: 'Algorand', assetId: -1 },
      });
    }, 4000);
  };

  useAsyncEffect(
    async (_, safeUpdate) => {
      if (amount > 0) {
        const [data, status] = await api.getMatchCalculation(
          project.id,
          Math.round(amount * 1000000) // For fixing floating point precision problem (e.g. 10.2 * 100 = 1019.9999999999999)
        );
        if (status !== 200) {
          alertWarning('There is a problem with calculation match.');
          return;
        }

        safeUpdate(() => setMatchIncrease(data / 1000000));
      }
    },
    [api, amount]
  );

  let phase = 0;
  if (amount >= 35) {
    phase = 3;
  } else if (amount >= 20) {
    phase = 2;
  } else if (amount > 0) {
    phase = 1;
  }

  return (
    <ModalBody className='p-0 px-2 d-flex align-items-center flex-column justify-content-center'>
      {amount && <MeteorShowerEffect vertical />}
      <LiftOff
        phase={phase}
        launch={launch}
        match={matchIncrease}
        fund={amount}
      />
      <div className='donation-stats d-flex align-items-center flex-column justify-content-center'>
        <h2 className='donation-stats-total d-flex'>
          <AlgoLogo />
          {toTwoDP(amount)}
        </h2>
        <div>{t('Donation Amount')}</div>
        <h2 className='d-flex'>
          <AlgoLogo />
          {toTwoDP(matchIncrease)}
        </h2>
        <div>{t('Match you generate')}</div>
      </div>
      <div className='donate-content d-flex flex-column align-items-center'>
        <h3>{t('How much would you like to donate?')}</h3>
        <div className='buttons'>
          <button
            onClick={() => {
              setInput('5');
              setAmount(5);
            }}
          >
            5
          </button>
          <button
            onClick={() => {
              setInput('10');
              setAmount(10);
            }}
          >
            10
          </button>
          <button
            onClick={() => {
              setInput('20');
              setAmount(20);
            }}
          >
            20
          </button>
          <button
            onClick={() => {
              setInput('50');
              setAmount(50);
            }}
          >
            50
          </button>
          <button
            onClick={() => {
              setInput('100');
              setAmount(100);
            }}
          >
            100
          </button>
        </div>
        <div className='my-4 pb-3 d-flex align-items-center'>
          <FormInput
            id='amount'
            type='number'
            placeholder={t('Custom amount')}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            required
          />
        </div>
        <button
          disabled={amount <= 0 || launch || !matchIncrease}
          className='donate-checkout'
          onClick={toCheckout}
        >
          {t('Checkout')}
        </button>
      </div>
    </ModalBody>
  );
};

SetAlgorandValue.propTypes = {
  project: PropTypes.shape(ProjectShape).isRequired,
  launch: PropTypes.bool.isRequired,
  setLaunch: PropTypes.func.isRequired,
};

export default SetAlgorandValue;
