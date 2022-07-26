import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PopupAlertContext, PopupAlertDispatchContext } from '/context';
import Alert from '../Alert';
import Suspense from '../Suspense';

import './Overlay.scss';

const Overlay = () => {
  const { t } = useTranslation();
  const alerts = useContext(PopupAlertContext);
  const { removeAlert } = useContext(PopupAlertDispatchContext);

  return (
    <>
      {alerts.length > 0 && (
        <div className='overlay'>
          <div className='alerts-container'>
            {alerts.map((alert) => (
              <Alert
                key={alert.key}
                theme={alert.theme}
                onClose={() => removeAlert(alert.key)}
              >
                {t(alert.message, alert.interpolation)}
              </Alert>
            ))}
          </div>

          <div className='post-loader'>
            <Suspense area='post' size='3x'>
              <span />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
