import { useCallback } from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { CookieStorageContextProvider } from './context';
import ErrorBoundary from './ErrorBoundary';
import Router from './Router';
import keycloak from './keycloak';
import Feedback from './components/Feedback';
import CookieBanner from './components/CookieBanner';

import 'theme.scss';
import 'App.scss';

const App = () => {
  const handleKeycloak = useCallback((event, error) => {
    console.log('[KEYCLOAK]', event, error);
    if (event === 'onTokenExpired') {
      console.log("token expired! You should logout now, its okay to refresh the page as well, but don't go to the signin page.");
      window.location.assign(keycloak.createLogoutUrl());
    }
  }, [keycloak]);

  return (
    <ErrorBoundary>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
          flow: 'standard',
          enableLogging: true,
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
          promiseType: 'native',
        }}
        LoadingComponent={<></>}
        onEvent={handleKeycloak}
        autoRefreshToken
      >
        <CookieStorageContextProvider>
          <Router />
        </CookieStorageContextProvider>
      </ReactKeycloakProvider>
      <Feedback />
      <CookieBanner />
    </ErrorBoundary>
  );
};

export default App;
