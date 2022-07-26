import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'shards-react';
import { useHistory } from 'react-router-dom';

const Step4 = ({ reset }) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <div>
        <div id="status-success" className="d-flex flex-column align-items-center pt-5">
          <FontAwesomeIcon icon={faCheck} size="5x" />
          <div className="pt-5">{t('Your project has been submitted!')}</div>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-center mt-5">
        <Button className="m-4" theme="light" onClick={reset}>{t('Create new project')}</Button>
        <Button className="m-4" onClick={() => push('/')}>{t('To main page')}</Button>
      </div>
    </div>
  );
};

Step4.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default Step4;
