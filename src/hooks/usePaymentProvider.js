import { useContext } from 'react';
import { PaymentProviderContext } from '/context';

const usePaymentProvider = (providerName) => {
  const context = useContext(PaymentProviderContext);
  if (!context) {
    throw new ReferenceError('PaymentProviderContext used without PaymentProviderContextProvider');
  }

  if (!context[providerName]) {
    throw new ReferenceError('PaymentProviderContext doesn\'t implement ' + providerName + " payment provider");
  }

  return context[providerName];
};

export default usePaymentProvider;
