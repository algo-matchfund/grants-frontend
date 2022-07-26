import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shards-react';
import { useHistory, useLocation } from 'react-router-dom';
import { useToggle } from '/hooks';
import RocketAndMoon from '/components/RocketAndMoon';
import ShareModal from '/components/Modals/ShareModal';

import './FundSuccess.scss';

const FundSuccess = () => {
  const { state } = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  const [open, toggle] = useToggle(false);

  useEffect(() => {
    if (!state?.detail) history.push('/');
  }, []);

  return state?.detail ? (
    <>
      <div className='fund-success'>
        <main>
          <h1>
            {t('Fund')}&nbsp;<span>{t('success')}!</span>
          </h1>
          <p>{t('Thank you for your support')}!</p>
          {state.detail.wait > 0 && (
            <>
              <p>{t('It can take some time for the transaction to get enough confirmations.')}</p>
              <p>{t('Approximate confirmation time is {{ count }} seconds.', { count: state.detail.wait })}</p>
            </>
          )}
          <div className='fund-success-buttons-container'>
            <Button onClick={toggle}>{t('Share')}</Button>
            <Button theme='light' onClick={() => history.push('/')}>
              {t('Back Home')}
            </Button>
          </div>
        </main>
        <RocketAndMoon />
      </div>
      {open && (
        <ShareModal open={open} toggle={toggle} detail={state?.detail} />
      )}
    </>
  ) : (
    <></>
  );
};

export default FundSuccess;
