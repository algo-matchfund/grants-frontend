import { useLocation } from 'react-router-dom';
import AlgoLogo from '/assets/images/AlgoLogo';

import './RocketAndMoon.scss';

const RocketAndMoon = () => {
  const { state } = useLocation();

  const rocket = (
    <div className='lift-off-container'>
      <div className='rocket burn'>
        <div className='nose' />

        <div className='booster'>
          <div className='booster-body' />
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
          <div className='body-section' />
        </div>

        <div className='booster'>
          <div className='booster-body' />
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

  const moon = (
    <>
      <div className='star-1' />
      <div className='star-2' />
      <div className='moon' />
    </>
  );

  return (
    <div className='rocket-and-moon'>
      {rocket}
      {moon}
    </div>
  );
};

export default RocketAndMoon;
