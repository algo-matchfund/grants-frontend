import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as BaseAlert } from 'shards-react';

const Alert = ({ theme, onClose, children }) => {
  const [state, setState] = useState();

  useEffect(() => {
    const interval = setTimeout(onClose, 5000);
    setState(interval);

    return () => {
      clearTimeout(state);
    };
  }, [onClose]);

  return (
    <BaseAlert style={{ zIndex: 99999 }} dismissible={onClose} theme={theme} open>
      {children}
    </BaseAlert>
  );
};

Alert.propTypes = {
  theme: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Alert;
