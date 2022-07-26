import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalBody } from 'shards-react';

const SuccessStatus = ({ children }) => (
  <ModalBody>
    <div id="status-success" className="d-flex flex-column align-items-center">
      <FontAwesomeIcon icon={faCheck} size="5x" />
      {children}
    </div>
  </ModalBody>
);

SuccessStatus.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuccessStatus;
