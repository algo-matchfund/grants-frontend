import { createContext, useEffect, useState } from 'react';
import cookie from 'cookie';

const CookieStorageContext = createContext();

const CookieStorageContextProvider = ({ children }) => {
  const [cookieState, setCookieState] = useState(() => cookie.parse(document.cookie));

  const setSingleCookieState = (name, value, storageOptions) => {
    setCookieState({ ...cookieState, [name]: value });
    document.cookie = cookie.serialize(name, JSON.stringify(value), storageOptions);
  };

  return (
    <CookieStorageContext.Provider value={{ state: cookieState, setState: setSingleCookieState }}>
      {children}
    </CookieStorageContext.Provider>
  );
};

export {
  CookieStorageContext,
  CookieStorageContextProvider,
};
