import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from '@react-hook/debounce';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';
import { FormInput, ModalBody, Button } from 'shards-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { PopupAlertDispatchContext } from '/context';
import { useCookieStorage, useAsyncEffect } from '/hooks';
import { ProjectShape } from '/service/doc';
import AlgosignerService from '/service/PaymentProviders/algosigner';
import LiftOff from '/components/LiftOff';
import MeteorShowerEffect from '/components/FundingRound/MeteorShowerEffect';
import Spinner from '/components/Spinner';

const ALGOSIGNER = new AlgosignerService();

const toTwoDP = (number) =>
  Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

const SetASAValue = ({ project, launch, setLaunch }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { keycloak } = useKeycloak();
  const { alertWarning } = useContext(PopupAlertDispatchContext);
  const [cartItems, setCartItems] = useCookieStorage('cartItems');

  const [input, setInput] = useState('0');
  const [amount, setAmountDebounced, setAmount] = useDebounce(0, 200);
  const [availableAssets, setAvailableAssets] = useState();
  const [selectedAsset, setSelectedAsset] = useState();
  const [errorMessage, setErrorMessage] = useState('');

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
      setCartItems([
        {
          project,
          fund: amount,
          match: 0,
          type: selectedAsset?.name,
          assetId: selectedAsset?.['asset-id'],
        },
      ]);
      // change this place to support multiple cart items

      history.push({
        pathname: '/checkout',
        state: {
          project,
          fund: amount,
          match: 0,
          type: selectedAsset?.name,
          assetId: selectedAsset?.['asset-id'],
        },
      });
    }, 4000);
  };

  let phase = amount > 0 ? 1 : 0;

  useAsyncEffect(async () => {
    if (!ALGOSIGNER.available()) {
      setErrorMessage('Please try again');

      alertWarning('You must have AlgoSigner installed to donate ASAs');
      return;
    }

    await ALGOSIGNER.connect();
    const accounts = await ALGOSIGNER.getAccounts();

    if (accounts.length === 0) {
      setErrorMessage('Please try again');

      alertWarning('You must have an Algorand account to donate ASAs');
      return;
    }

    // get all user asset types
    let res;
    try {
      res = await axios.get(
        `https://indexer.${process.env.ALGOEXPLORER_API_URL}/v2/accounts/${accounts[0].address}`
      );
    } catch (e) {
      setErrorMessage('Please try again');
      alertWarning('There is problem getting your account details');
      return;
    }
    const userAssets = res.data.account.assets;
    // no assets opt-in would be undefined
    if (!userAssets) {
      setAvailableAssets([]);
      return;
    }

    // get all asset types accepted for this project
    let r;
    try {
      r = await axios.get(
        `https://indexer.${process.env.ALGOEXPLORER_API_URL}/v2/accounts/${project.algorand_wallet}`
      );
    } catch (e) {
      setErrorMessage('Please try again');
      alertWarning('There is problem getting project details');
      return;
    }
    const acceptedAssets = r.data.account.assets;
    // no assets opt-in would be undefined
    if (!acceptedAssets) {
      setAvailableAssets([]);
      return;
    }

    const matchingAssets = [];
    for (let u of userAssets) {
      const m = acceptedAssets.filter((a) => a['asset-id'] === u['asset-id']);
      matchingAssets.push(...m);
    }
    setAvailableAssets(matchingAssets);
  }, []);

  const beforeSelectedAssetMenu = (
    <div className='donate-content d-flex flex-column align-items-center'>
      <h3>{t('Select asset type')}</h3>
      {!errorMessage && !availableAssets && <Spinner />}
      {errorMessage}
      {availableAssets && (
        <ul>
          {availableAssets.length === 0 && t('You have no accepted assets')}
          {availableAssets.map((el) => (
            <li
              onClick={() => {
                if (el.amount <= 0) {
                  alertWarning('Your amount for this asset is 0');
                  return;
                }
                setSelectedAsset(el);
              }}
              key={el.name}
            >
              {el.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const afterSelectedAssetMenu = (
    <div className='donate-content d-flex flex-column align-items-center'>
      <h3>{t('How much would you like to donate?')}</h3>
      <div className='buttons'>
        <button
          onClick={() => {
            setInput('1');
            setAmount(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setInput('2');
            setAmount(2);
          }}
        >
          2
        </button>
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
        disabled={amount <= 0 || launch}
        className='donate-checkout'
        onClick={toCheckout}
      >
        {t('Checkout')}
      </button>
    </div>
  );

  return (
    <ModalBody className='p-0 px-2 d-flex align-items-center flex-column justify-content-center'>
      {amount && <MeteorShowerEffect vertical />}
      <LiftOff phase={phase} launch={launch} match={amount} fund={amount} />
      <div className='donation-stats d-flex align-items-center flex-column justify-content-center'>
        <h2 className='donation-stats-total'>{toTwoDP(amount)}</h2>
        <div>{t('Donation Amount')}</div>
      </div>
      {!selectedAsset && beforeSelectedAssetMenu}
      {selectedAsset && afterSelectedAssetMenu}
    </ModalBody>
  );
};

SetASAValue.propTypes = {
  project: PropTypes.shape(ProjectShape).isRequired,
  launch: PropTypes.bool.isRequired,
  setLaunch: PropTypes.func.isRequired,
};

export default SetASAValue;
