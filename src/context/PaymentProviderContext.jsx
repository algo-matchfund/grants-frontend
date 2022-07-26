import { createContext, useState } from 'react';
import AlgosignerService from '/service/PaymentProviders/algosigner';

const PaymentProviderContext = createContext();

const PaymentProviderContextProvider = ({ children }) => {
  const [algosignerService] = useState(new AlgosignerService());

  return (
    <PaymentProviderContext.Provider value={{ algosigner: algosignerService, }}>
      {children}
    </PaymentProviderContext.Provider>
  );
};

export {
  PaymentProviderContextProvider,
  PaymentProviderContext,
};
