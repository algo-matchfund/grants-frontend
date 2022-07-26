import { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './LiftOff.scss';
import AlgoLogo from '/assets/images/AlgoLogo';

const MATCH_MULTIPLIER = 20;

const LiftOff = ({ phase, launch, match, fund }) => {
  const burnClass = useMemo(() => classNames({ burn: phase >= 1 }), [match]);

  const launchClass = classNames({ launch });

  const phaseClass = useMemo(
    () =>
      classNames({
        'phase-1': phase == 1,
        'phase-2': phase == 2,
        'phase-3': phase == 3,
      }),
    [match]
  );

  const boosterMargin = useMemo(() => {
    let margin = 320;
    if (phase == 2) margin = 350;
    if (phase == 3) margin = 400;
    return margin;
  }, [match]);

  const boosterHeight = useMemo(
    () => Math.min(50 + match * MATCH_MULTIPLIER, 350),
    [match]
  );
  const boosterTransform = useMemo(
    () => Math.max(1 - fund * 0.018, 0.3),
    [match]
  );
  const boosterExtensionStyle = {
    height: boosterHeight,
  };

  const leftBoosterStyle = useMemo(
    () => ({
      transform: `scale(${boosterTransform})`,
      marginLeft: Math.min(-73 + fund * 0.8, -46),
      marginTop: boosterMargin - boosterHeight * Math.sqrt(boosterTransform),
    }),
    [match]
  );

  const rightBoosterStyle = useMemo(
    () => ({
      transform: `scale(${boosterTransform})`,
      marginLeft: Math.max(73 - fund * 0.8, 46),
      marginTop: boosterMargin - boosterHeight * Math.sqrt(boosterTransform),
    }),
    [match]
  );

  const bodySections = useMemo(() => {
    let sections;
    if (phase >= 2) sections = <div className='body-section ' />;
    if (phase >= 3)
      sections = (
        <>
          <div className='body-section ' />
          <div className='body-section ' />
        </>
      );
    return sections;
  }, [match]);

  return (
    <div className='lift-off-container'>
      <div className={`rocket ${burnClass} ${launchClass} ${phaseClass}`}>
        <div className='nose' />

        <div className={`booster ${phaseClass}`} style={leftBoosterStyle}>
          <div className='booster-body' style={boosterExtensionStyle} />
          <div className='engine-block'>
            <div className='engine' />
            <div className='nozzle' />
            <div className='exhaust' />
            <div className='reactive-mass' />
          </div>
        </div>

        <div className='body'>
          <div className='body-section d-flex align-items-center justify-content-center'>
            <AlgoLogo />
          </div>
          {bodySections}
          <div className='body-section' />
        </div>

        <div className={`booster ${phaseClass}`} style={rightBoosterStyle}>
          <div className='booster-body' style={boosterExtensionStyle} />
          <div className='engine-block'>
            <div className='engine' />
            <div className='nozzle' />
            <div className='exhaust' />
            <div className='reactive-mass' />
          </div>
        </div>

        <div className='engine-block'>
          <div className='engine' />
          <div className='nozzle' />
          <div className='exhaust' />
          <div className='reactive-mass' />
        </div>
      </div>
    </div>
  );
};

LiftOff.propTypes = {
  phase: PropTypes.number.isRequired,
  launch: PropTypes.bool.isRequired,
  match: PropTypes.number.isRequired,
  fund: PropTypes.number.isRequired,
};

export default LiftOff;
