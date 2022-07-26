import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Spinner from '../Spinner';

const Suspense = ({
  children, spinnerContainer: Tag, area, delay, extraCondition, ...rest
}) => {
  const { promiseInProgress } = usePromiseTracker({ area, delay });
  const [timeout, setSpinnerTimeout] = useState(false);

  useEffect(() => {
    setSpinnerTimeout(!promiseInProgress);
  }, [promiseInProgress]);

  useEffect(() => {
    if (extraCondition) {
      setSpinnerTimeout(true);
      return () => {};
    }

    const timer = setTimeout(() => setSpinnerTimeout(true), 10000);

    return () => clearTimeout(timer);
  }, [children, extraCondition]);

  return (!promiseInProgress && extraCondition) || timeout
    ? children
    : <Tag><Spinner {...rest} /></Tag>;
};

Suspense.propTypes = {
  children: PropTypes.node,
  spinnerContainer: PropTypes.elementType,
  area: PropTypes.string,
  delay: PropTypes.number,
  extraCondition: PropTypes.bool,
};

Suspense.defaultProps = {
  children: null,
  spinnerContainer: Fragment,
  area: undefined,
  delay: 500,
  extraCondition: true,
};

export default Suspense;
