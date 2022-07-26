import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { randHash } from '/util';

const PopupAlertContext = createContext();
PopupAlertContext.displayName = 'PopupAlertContext';

const PopupAlertDispatchContext = createContext();
PopupAlertDispatchContext.displayName = 'PopupAlertDispatchContext';

const PopupAlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  /**
   * Dispatcher method for adding notifications
   * @param {string} theme Theme name
   * @param {string} message Alert message
   * @param {object} interpolation Message translation interpolation values
   * @returns {string} Alert key
   */
  const addAlert = (theme, message, interpolation) => {
    const key = randHash(message);
    // insert the alert in the beginning
    setAlerts((prevAlerts) => [...prevAlerts, {
      key,
      theme,
      message,
      interpolation,
    }]);

    return key;
  };

  const remove = (list, key) => {
    const position = list.findIndex((n) => n.key === key);
    if (position === 0) {
      // Shift is reported to work faster compared to using splice when removing the first element
      list.shift();
    } else if (position === list.length - 1) {
      list.pop();
    } else {
      list.splice(position, 1);
    }

    return list;
  };

  /**
   * Remove a notification
   * @param {string} key Alert key
   */
  const removeAlert = (key) => {
    setAlerts((prevAlerts) => [...remove(prevAlerts, key)]);
  };

  /**
   * Dispatcher method to delete all notifications
   * @returns {void}
   */
  const clearAlerts = () => setAlerts([]);

  const alertSuccess = (message, interpolationValues = {}) => addAlert('success', message, interpolationValues);
  const alertWarning = (message, interpolationValues = {}) => addAlert('warning', message, interpolationValues);
  const alertError = (message, interpolationValues = {}) => addAlert('danger', message, interpolationValues);

  return (
    <PopupAlertContext.Provider value={alerts}>
      <PopupAlertDispatchContext.Provider value={{
        alertSuccess,
        alertWarning,
        alertError,

        addAlert,
        removeAlert,
        clearAlerts,
      }}
      >
        {children}
      </PopupAlertDispatchContext.Provider>
    </PopupAlertContext.Provider>
  );
};

PopupAlertsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  PopupAlertContext,
  PopupAlertDispatchContext,
  PopupAlertsProvider,
};
