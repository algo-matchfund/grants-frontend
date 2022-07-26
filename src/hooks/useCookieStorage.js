import { useContext, useMemo } from 'react';
import { CookieStorageContext } from '/context';

const useCookieStorage = (cookieName) => {
  const { state, setState } = useContext(CookieStorageContext);

  if (!state) {
    throw new ReferenceError('CookieStorageContext used without CookieStorageContextProvider');
  }

  const updateCookieValue = (newVal) => {
    setState(cookieName, newVal, { maxAge: 60 * 60 * 2, path: '/' });
  };

  const cookieValue = useMemo(() => state[cookieName], [state, cookieName]);
  try {
    const jsonCookie = JSON.parse(cookieValue);
    return [jsonCookie, updateCookieValue];
  } catch (e) {
    return [cookieValue, updateCookieValue];
  }
}

export default useCookieStorage;
