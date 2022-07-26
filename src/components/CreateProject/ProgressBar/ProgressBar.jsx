import PropTypes from 'prop-types';
import { classNames } from '/util';

import './ProgressBar.scss';

const STEPS = ['Project detail', 'Description', 'Review'];

const ProgressBar = ({ step }) => {
  const bars = STEPS.map((title, i) => {
    const highlight = classNames(
      {
        completed: step > i,
        current: step === i + 1,
      },
    );

    return (
      <div className={`${highlight} create-project-progress-item`} key={title}>
        <div>{title}</div>
        <div className="create-project-progress-bar" />
      </div>
    );
  });

  return (
    <div className="create-project-progress">
      {bars}
    </div>
  );
};

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
};

export default ProgressBar;
