import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button } from 'shards-react';
import PropTypes from 'prop-types';
import { ProjectShape } from '/service/doc';
import AlgoLogo from '/assets/images/AlgoLogo';

import './ProjectDonationItem.scss';

const ProjectDonationItem = ({
  project,
  fund,
  matchIncrease,
  onDelete,
  type,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const adjustFund = () => {
    history.push({
      pathname: `/projects/${project?.id}`,
      state: { open: true },
    });
  };

  return (
    <div className='project-donation-item'>
      <div className='stats-container d-flex align-items-center justify-content-end'>
        <div className='stats mr-4'>
          <div className='donate-text d-flex align-items-center mb-3'>
            {t('You donate')}
            &nbsp;
            <h3>
              {type === 'Algorand' && <AlgoLogo />}
              {fund.toFixed(2)}
            </h3>
          </div>
          {type === 'Algorand' && (
            <div>
              {t('results in')}&nbsp;
              <b>
                <AlgoLogo />
                {Math.ceil(matchIncrease)}
              </b>
              &nbsp;match
            </div>
          )}
        </div>
        <div className='buttons d-flex flex-column justify-content-between'>
          <Button size='sm' className='mb-3' onClick={adjustFund}>
            {t('Adjust')}
          </Button>
          <Button size='sm' theme='light' onClick={onDelete}>
            {t('Delete')}
          </Button>
        </div>
      </div>
      <div className='d-flex align-items-center'>
        <div className='image-container' style={{ backgroundColor: '#f7f7f7' }}>
          <img src={project.icon} alt='logo' />
        </div>
        <div className='content-container d-flex flex-column justify-content-between'>
          <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectDonationItem.propTypes = {
  project: PropTypes.shape(ProjectShape).isRequired,
  fund: PropTypes.number.isRequired,
  matchIncrease: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectDonationItem;
