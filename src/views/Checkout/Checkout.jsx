import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shards-react';
import { faCreditCard, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectDonationItem from '/components/ProjectDonationItem/ProjectDonationItem';
import { PaymentProviderContextProvider } from '/context';
import { AlgosignerPayment, CardPayment } from '/components';
import { useCookieStorage } from '/hooks';

import PayPal from '/assets/images/PayPal';
import algorand from '/assets/images/algorand-logo.png';
import AlgosignerLogo from '/assets/images/AlgosignerLogo';

import './Checkout.scss';

const Checkout = () => {
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useCookieStorage('cartItems');
  const [paymentType, setPaymentType] = useState('algosigner');

  const submitButton = ({ inProgress, ...rest }) => (
    <Button className='w-100' type='submit' form='payment-form' {...rest}>
      {inProgress && (
        <>
          {t('Confirming donations')}&nbsp;
          <FontAwesomeIcon icon={faSpinner} spin />
        </>
      )}

      {!inProgress && t('Confirm donations')}
    </Button>
  );

  const paymentComponents = {
    algosigner: ({ children }) => (
      <AlgosignerPayment
        paymentState={{
          project: cartItems?.[0]?.project,
          fund: cartItems?.[0]?.fund,
          type: cartItems?.[0]?.type,
          assetId: cartItems?.[0]?.assetId,
        }}
        ConfirmButton={submitButton}
        onSuccess={() => setCartItems([])}
      >
        {children}
      </AlgosignerPayment>
    ),
    default: ({ children }) => <CardPayment>{children}</CardPayment>,
  };

  const PaymentComponent =
    paymentComponents[paymentType] !== undefined
      ? paymentComponents[paymentType]
      : paymentComponents.default;

  return (
    <div className='checkout'>
      <main>
        <h1>{t('Projects to donate to')}</h1>
        {cartItems && cartItems.length > 0 && (
          <div className='project-donations-list'>
            {cartItems.map((item, idx) => (
              <ProjectDonationItem
                key={item.project.id}
                project={item.project}
                fund={item.fund}
                matchIncrease={item.match}
                type={item.type}
                onDelete={() => {
                  cartItems.splice(idx, 1);
                  setCartItems(cartItems);
                }}
              />
            ))}
          </div>
        )}

        {(!cartItems || cartItems.length === 0) && (
          <div className='project-dontations-list'>
            <p>{t('No projects selected')}</p>
          </div>
        )}
      </main>

      <aside className='d-flex flex-column justify-content-between'>
        <div className='payment'>
          {/*
          <h2>Payment details</h2>
          <div className="payment-methods d-flex justify-content-between">
            <button onClick={() => setPaymentType('algosigner')} className={`btn ${paymentType === 'algosigner' ? 'btn-active' : ''}`} title={t('AlgoSigner extension')}>
              <AlgosignerLogo />
            </button>

            <button onClick={() => setPaymentType('credit')} className={`btn ${paymentType === 'credit' ? 'btn-active' : ''}`} title={t('Credit card')}>
              <FontAwesomeIcon icon={faCreditCard} size='2x' color='#000' />
            </button>

            <button onClick={() => setPaymentType('paypal')} className={`btn ${paymentType === 'paypal' ? 'btn-active' : ''}`} title="PayPal">
              <PayPal />
            </button>

            <button onClick={() => setPaymentType('algorand')} className={`btn ${paymentType === 'algorand' ? 'btn-active' : ''}`} title="Algorand">
              <img src={algorand} alt='Algorand' />
            </button>
          </div>
          */}

          <PaymentProviderContextProvider>
            <PaymentComponent>
              <div className='confirmation'>
                <div className='total-amount d-flex justify-content-between'>
                  <div>{t('Total amount')}</div>
                  {cartItems && cartItems.length > 0 && (
                    <div>
                      {cartItems
                        .reduce((r, item) => r + item.fund, 0)
                        .toFixed(2)}
                      &nbsp;
                      {cartItems[0].type !== 'Algorand' && cartItems[0].type}
                    </div>
                  )}
                </div>
              </div>
            </PaymentComponent>
          </PaymentProviderContextProvider>
        </div>
      </aside>
    </div>
  );
};

export default Checkout;
