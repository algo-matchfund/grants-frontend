import PropTypes from 'prop-types';
import ProjectsGridItem from './ProjectsGridItem';

import './LandingProjectsGrid.scss';

const LandingProjectsGrid = ({ projects }) => {
  const projectCards = projects.map((el) => (
    <ProjectsGridItem key={el.id} project={el} />
  ));

  return <div className='landing-projects-grid'>{projectCards}</div>;
};

LandingProjectsGrid.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default LandingProjectsGrid;
