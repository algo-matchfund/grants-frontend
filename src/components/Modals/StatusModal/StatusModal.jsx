import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Modal, ModalHeader, ModalFooter, Button,
} from 'shards-react';
import SuccessStatus from './SuccessStatus';
import WarningStatus from './WarningStatus';
import FailureStatus from './FailureStatus';

import './StatusModal.scss';

const StatusModal = ({
  open, toggle, status, children,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} size="md" centered className="status-modal">
      <ModalHeader className="capitalize">
        {t(status)}
      </ModalHeader>

      {status === 'success' && (
        <SuccessStatus>
          {children}
        </SuccessStatus>
      )}

      {status === 'warning' && (
        <WarningStatus>
          {children}
        </WarningStatus>
      )}

      {status === 'failure' && (
        <FailureStatus>
          {children}
        </FailureStatus>
      )}
      <ModalFooter>
        <Button theme="secondary" onClick={toggle} className="ml-auto">{t('OK')}</Button>
      </ModalFooter>
    </Modal>
  );
};

StatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['success', 'warning', 'failure']).isRequired,
  children: PropTypes.node.isRequired,
};

export default StatusModal;
