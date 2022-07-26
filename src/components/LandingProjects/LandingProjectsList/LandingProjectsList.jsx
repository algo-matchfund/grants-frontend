import PropTypes from 'prop-types';
import ProjectsListItem from './ProjectsListItem';

import './LandingProjectsList.scss';

const LandingProjectsList = ({ projects }) => {
  const projectCards = projects.map((el) => (
    <ProjectsListItem key={el.id} project={el} />
  ));

  return <div className='landing-projects-list'>{projectCards}</div>;
};

LandingProjectsList.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default LandingProjectsList;
