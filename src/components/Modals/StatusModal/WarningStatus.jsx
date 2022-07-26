import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { ModalBody } from 'shards-react';

const WarningStatus = ({ children }) => (
  <ModalBody>
    <div id="status-warning" className="d-flex flex-column align-items-center">
      <FontAwesomeIcon icon={faExclamation} size="5x" />
      {children}
    </div>
  </ModalBody>
);

WarningStatus.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WarningStatus;
