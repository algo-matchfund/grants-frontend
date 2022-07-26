import { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { useCallback } from 'react'
import { Navbar, NavbarBrand } from 'shards-react';
import { useKeycloak } from '@react-keycloak/web';
import UserDropdown from './UserDropdown';
import LanguageSelector from './LanguageSelector';
import { classNames } from '/util';
import Logo from '/assets/images/Logo';

import './Header.scss';

const Header = memo(() => {
  useTranslation();
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const history = useHistory()

  const navbarClass = classNames({
    'navbar-custom': true,
    dark: location.pathname === '/network',
  });

  const register = useCallback(() => {
    history.push('/register');
  }, [history])

  const login = useCallback(() => {
    if (!keycloak?.authenticated) {
      keycloak?.login({ redirectUri: `${process.env.DEPLOYMENT_URL}${location.pathname}`})
    }
  }, [keycloak]);

  const loginHeaders = (
    <>
      <button type="button" className="header-auth ml-auto mr-4 light nav-link" onClick={register}>
        <Trans>Register</Trans>
      </button>

      <button type="button" className="header-auth ml-auto mr-4 light nav-link" onClick={login}>
        <Trans>Sign In</Trans>
      </button>
    </>
  );

  return (
    <Navbar className={navbarClass} sticky="true">
      <NavbarBrand href="/">
        <Logo />
      </NavbarBrand>

      <div className="d-flex justify-content-between align-items-center">
        <LanguageSelector />
        {/* Controller components, which fetch data and control modals */}
        { !keycloak?.authenticated && loginHeaders }
        { keycloak?.authenticated && <UserDropdown /> }
      </div>
    </Navbar>
  );
});

export default Header;
