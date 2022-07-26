import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Spinner.scss';

const Spinner = (props) => (
  <div className="loader-container">
    <FontAwesomeIcon icon={faCircleNotch} size="5x" spin {...props} />
  </div>
);

export default Spinner;
