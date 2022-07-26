import { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import ScrollToTop from './components/ScrollToTop';
import Landing from './views/Landing';
import { ApiProvider, PopupAlertsProvider } from './context';
import { Footer, Header, Overlay } from './components';
import ProjectDetail from './views/ProjectDetail';
import Checkout from './views/Checkout';
import Settings from './views/Settings';
import Register from './views/Register';
import CreateProject from './components/CreateProject';
import FundSuccess from './views/FundSuccess';
import Panel from './views/Panel';
import ProjectModeration from './views/ProjectModeration';
import { isModerator } from './util';

const ProtectedRoute = ({ path, children }) => {
  const { keycloak, initialized } = useKeycloak();
  const { pathname, search } = useLocation();
  const requestedResource = useMemo(
    () => `${process.env.DEPLOYMENT_URL}${pathname}${search}`,
    [pathname, search]
  );
  const mustAuthenticate = useMemo(
    () =>
      pathname === path &&
      (!keycloak?.authenticated || keycloak?.isTokenExpired(5)),
    [pathname, path, keycloak]
  );

  useEffect(() => {
    if (initialized && mustAuthenticate) {
      window.location.assign(
        keycloak.createLoginUrl({
          redirectUri: requestedResource,
        })
      );
    }
  }, [keycloak, initialized, requestedResource, mustAuthenticate]);

  if ((keycloak && keycloak.authenticated) || !mustAuthenticate) {
    return <Route path={path}>{children}</Route>;
  }

  return <Redirect to={{ pathname: '/', state: { requestedResource } }} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

const Router = memo(() => {
  const { keycloak } = useKeycloak();

  return (
    <BrowserRouter>
      <ApiProvider>
        <PopupAlertsProvider>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <ScrollToTop>
              <ProtectedRoute exact path={'/create-new-project'}>
                <CreateProject />
              </ProtectedRoute>
              <ProtectedRoute exact path={'/settings'}>
                <Settings />
              </ProtectedRoute>
              <ProtectedRoute exact path={'/checkout'}>
                <Checkout />
              </ProtectedRoute>
              {keycloak && isModerator(keycloak) && (
                <>
                  <ProtectedRoute exact path={'/panel'}>
                    <Panel />
                  </ProtectedRoute>
                  <ProtectedRoute exact path={'/moderate/:id'}>
                    <ProjectModeration />
                  </ProtectedRoute>
                </>
              )}

              <Route exact path={`/projects/:id`}>
                <ProjectDetail />
              </Route>
              <Route exact path={`/fund/success`}>
                <FundSuccess />
              </Route>
            </ScrollToTop>
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
          <Footer />
          <Overlay />
        </PopupAlertsProvider>
      </ApiProvider>
    </BrowserRouter>
  );
});

export default Router;
