import { nanoid } from 'nanoid';

const Particles = ({ enabled, count }) => {
  if (!enabled)
    return (
      <></>
    );


  return (
    <div className='particles'>
      {new Array(count).map(() => <span key={nanoid()} className='particle' />)}
    </div>
  )
};

export default Particles;