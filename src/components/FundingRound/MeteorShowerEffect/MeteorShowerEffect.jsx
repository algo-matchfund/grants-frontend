import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { classNames } from '/util';

import './MeteorShowerEffect.scss';

const MeteorShowerEffect = ({ vertical }) => {
  const stars = useMemo(
    () =>
      Object.values(Array(100).fill()).map(() => (
        <div key={nanoid()} className='star' />
      )),
    []
  );

  const starsClass = classNames({
    stars: true,
    vertical,
  });

  return <div className={starsClass}>{stars}</div>;
};

MeteorShowerEffect.propTypes = {
  vertical: PropTypes.bool,
};

MeteorShowerEffect.Props = {
  vertical: false,
};

export default MeteorShowerEffect;
