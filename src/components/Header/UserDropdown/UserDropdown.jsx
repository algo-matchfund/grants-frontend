import { useCallback } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCircleDollarToSlot,
} from '@fortawesome/free-solid-svg-icons';
import { useToggle } from '/hooks';
import { isModerator } from '/util';

import './UserDropdown.scss';

const UserDropdown = () => {
  const [dropdownOpen, toggleDropdown] = useToggle(false);
  const { keycloak } = useKeycloak();
  const { pathname, search } = useLocation();
  const { t } = useTranslation();
  const history = useHistory();

  const onLogoutClick = useCallback(
    (event) => {
      event.preventDefault();
      keycloak.logout({
        redirectUri: process.env.DEPLOYMENT_URL,
      });
    },
    [pathname]
  );

  const onSettingsClick = useCallback((event) => {
    event.preventDefault();
    //keycloak.accountManagement();
    history.push('/settings');
  }, []);

  return (
    <>
      <button
        className='user-dropdown-checkout'
        title='View your selections'
        onClick={() => history.push('/checkout')}
      >
        <FontAwesomeIcon icon={faCircleDollarToSlot} size='2x' color='#777' />
      </button>
      <Dropdown open={dropdownOpen} toggle={toggleDropdown} className='active'>
        <DropdownToggle nav>
          <div className='user-dropdown-avatar'>
            <FontAwesomeIcon icon={faUser} size='lg' color='#777' />
          </div>
        </DropdownToggle>
        <CSSTransition classNames='fade' timeout={200} in={dropdownOpen}>
          <DropdownMenu persist right>
            {!isModerator(keycloak) && (
              <DropdownItem onClick={() => history.push('/create-new-project')}>
                {t('Create new project')}
              </DropdownItem>
            )}

            {isModerator(keycloak) && (
              <DropdownItem onClick={() => history.push('/panel')}>
                {t('Project moderation')}
              </DropdownItem>
            )}

            <DropdownItem onClick={onSettingsClick}>
              {t('Settings')}
            </DropdownItem>

            <DropdownItem onClick={onLogoutClick}>{t('Log out')}</DropdownItem>
          </DropdownMenu>
        </CSSTransition>
      </Dropdown>
    </>
  );
};

UserDropdown.propTypes = {};

export default UserDropdown;
