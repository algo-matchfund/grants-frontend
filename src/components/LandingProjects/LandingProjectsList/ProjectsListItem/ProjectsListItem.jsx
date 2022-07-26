import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Button } from 'shards-react';
import { useTranslation } from 'react-i18next';
import { useToggle } from '/hooks';
import { ShareModal, DonateModal } from '/components/Modals';

import './ProjectsListItem.scss';
import avatar from '../../avatars/avatar-dog.jpg';

const MAX_ICONS = 7;

const ProjectsListItem = ({ project }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [openDonate, toggleDonate] = useToggle(false);
  const [openShare, toggleShare] = useToggle(false);

  const fundAmount = (project.fund_amount / 1000000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const matchAmount = Math.round(project.match / 1000000);

  const avatarIcons = [...Array(Math.min(MAX_ICONS, project.donors))].map(
    (_, i) => (
      <div className='avatar' key={i}>
        <img src={avatar} alt='avatar' />
      </div>
    )
  );

  const donorsDisplayCount =
    project.donors > MAX_ICONS ? project.donors - MAX_ICONS : project.donors;

  const donorsSection = (
    <div className='donors d-flex align-items-center'>
      <div className='avatars'>{avatarIcons}</div>
      {project.donors > MAX_ICONS && '+ '}
      <b>{donorsDisplayCount}</b>&nbsp;
      {project.donors === 1 ? t('donor') : t('donors')}
    </div>
  );

  return (
    <>
      <div
        className='projects-list-item'
        onClick={() => history.push(`/projects/${project.id}`)}
        role='button'
      >
        <div className='stats-container d-flex flex-column align-items-center justify-content-between'>
          <div className='d-flex align-items-center justify-content-between w-100'>
            <p className='d-flex align-items-center'>
              <span className='gradient-font'>{fundAmount}</span> Algos {t('raised')}{' '}
              🌟
            </p>
            <p>
              <b>{matchAmount}</b> Algos {t('match')} 📈
            </p>
          </div>
          {donorsSection}
        </div>
        <div className='d-flex align-items-center'>
          <div className='image-container' style={{ backgroundColor: '#fff' }}>
            <img src={project.icon} alt='logo' />
          </div>
          <div className='content-container d-flex flex-column justify-content-between'>
            <div>
              <div className='content-header w-100 d-flex align-items-center'>
                <h2>{project.name}</h2>
                <button>
                  <FontAwesomeIcon icon={faGithub} size='lg' color='#CCC' />
                </button>
                <button>
                  <FontAwesomeIcon icon={faGlobe} size='lg' color='#CCC' />
                </button>
              </div>
              <p>{project.description}</p>
            </div>
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

ProjectsListItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectsListItem;
