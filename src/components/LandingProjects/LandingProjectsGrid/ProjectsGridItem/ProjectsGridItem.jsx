import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'shards-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useToggle } from '/hooks';
import { ShareModal, DonateModal } from '/components/Modals';

import './ProjectsGridItem.scss';

const ProjectsGridItem = ({ project }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [openDonate, toggleDonate] = useToggle(false);
  const [openShare, toggleShare] = useToggle(false);

  const fundAmount = (project.fund_amount / 1000000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const matchAmount = Math.round(project.match / 1000000);

  return (
    <>
      <div
        className='projects-grid-item'
        onClick={() => history.push(`/projects/${project.id}`)}
        role='button'
      >
        <div className='content-container d-flex flex-column align-items-center'>
          <div className='content-header w-100 d-flex justify-content-between align-items-center'>
            <h2>{project.name}</h2>
            <div className='social-buttons'>
              <button>
                <FontAwesomeIcon icon={faGithub} size='lg' color='#CCC' />
              </button>
              <button>
                <FontAwesomeIcon icon={faGlobe} size='lg' color='#CCC' />
              </button>
            </div>
          </div>
          <p>{project.description}</p>
          <div className='gradient-font'>{fundAmount} Algos</div>
          <p>
            <b>{matchAmount}</b> Algos {t('match from')} <b>{project.donors}</b>
            &nbsp;
            {project.donors === 1 ? t('donor') : t('donors')}
          </p>
          <div className='buttons'>
            <Button
              size='sm'
              onClick={(e) => {
                e.stopPropagation();
                toggleDonate();
              }}
            >
              {t('Fund')}
            </Button>
            <Button
              size='sm'
              theme='light'
              onClick={(e) => {
                e.stopPropagation();
                toggleShare();
              }}
            >
              {t('Share')}
            </Button>
          </div>
        </div>
        <div className='image-container' style={{ backgroundColor: '#fff' }}>
          <img src={project.icon} alt='logo' />
        </div>
      </div>

      {openDonate && (
        <DonateModal
          open={openDonate}
          toggle={toggleDonate}
          project={project}
        />
      )}
      {openShare && (
        <ShareModal
          open={openShare}
          toggle={toggleShare}
          detail={{
            name: project.name,
            projectLink: project.homepage,
            projectId: project.id,
          }}
        />
      )}
    </>
  );
};

ProjectsGridItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectsGridItem;
