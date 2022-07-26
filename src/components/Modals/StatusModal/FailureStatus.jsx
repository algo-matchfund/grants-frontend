import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalBody } from 'shards-react';

const FailureStatus = ({ children }) => (
  <ModalBody>
    <div id="status-failure" className="d-flex flex-column align-items-center">
      <FontAwesomeIcon icon={faTimes} size="5x" />
      {children}
    </div>
  </ModalBody>
);

FailureStatus.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FailureStatus;
