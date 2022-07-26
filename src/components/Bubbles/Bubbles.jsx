import { useHistory } from 'react-router-dom';

import './Bubbles.scss';
import projects from '../LandingProjects/fakeProjects';

const Bubbles = () => {
  const history = useHistory();

  const bubbles = [];
  let i = 1;
  projects.forEach((project) => {
    if (
      project.id === '1' ||
      project.id === '4' ||
      project.id === '5' ||
      project.id === '6' ||
      project.id === '7' ||
      project.id === '9' ||
      project.id === '10' ||
      project.id === '11'
    ) {
      bubbles.push(
        <div
          className={`bubble bubble-${i++}`}
          key={project.id}
          style={{ backgroundColor: project.imageBackground }}
          onClick={() => history.push(`/projects/${project.id}`)}
        >
          <img src={project.image} alt='logo' />
        </div>
      );
    }
  });

  return (
    <div className='bubbles'>
      <div className='first'>{bubbles}</div>
      <div className='second'>{bubbles}</div>
    </div>
  );
};

export default Bubbles;
