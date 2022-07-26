import { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi, useAsyncEffect } from '/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDollarToSlot,
  faCoins,
  faEye,
  faGlobe,
  faMagnifyingGlassDollar,
  faShareAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'shards-react';
import ReactMarkdown from 'react-markdown';
import { useToggle } from '/hooks';
import { DonateModal, ShareModal } from '/components/Modals';
import ContractOverview from '/components/ContractOverview';
import MatchCalculator from '/components/MatchCalculator';
import { Project } from '/service/doc';

import './ProjectDetail.scss';
import content from './placeholder';
import ASAsDisplay from '/components/ASAsDisplay';

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const { state } = useLocation();
  const api = useApi();

  const [project, setProject] = useState(Project);
  const [openDonate, toggleDonate] = useToggle(state?.open || false);
  const [openShare, toggleShare] = useToggle(false);

  useAsyncEffect(
    async (_, safeUpdate) => {
      const [data] = await api.getProject(id);
      if (data.length === 0) {
        history.push('/');
      }

      const currentProject = { ...data, fundAmount: data.fund_amount };
      delete currentProject.fund_amount;
      safeUpdate(() => setProject(currentProject));
    },
    [api, history]
  );

  const fundAmount = (project.fundAmount / 1000000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const matchAmount = Math.round(project.match / 1000000);

  return (
    <div className='project-detail-container'>
      <div className='project-detail'>
        <main>
          <header>
            <div className='logo' style={{ backgroundColor: 'fff' }}>
              {project && <img src={project.icon} alt='logo' />}
            </div>
            <h1>{project.name}</h1>
            <div className='links d-flex align-items-center'>
              <div>
                <FontAwesomeIcon icon={faGithub} size='lg' color='#aaa' />
                <a>{content.github}</a>
              </div>
              <div>
                <FontAwesomeIcon icon={faGlobe} size='lg' color='#aaa' />
                <a>{content.website}</a>
              </div>
            </div>
          </header>
          <article>
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </article>
        </main>
        <aside>
          <div className='project-detail-panel'>
            <div className='stats'>
              <div className='text-center'>
                <div>
                  <b>{fundAmount}</b> Algos
                </div>
                <div>
                  {t('funds raised')}
                  <FontAwesomeIcon
                    icon={faCoins}
                    size='xs'
                    color='#aaa'
                    className='ml-1'
                  />
                </div>
              </div>
              <div className='text-center'>
                <div>
                  <b>{matchAmount}</b> Algos
                </div>
                <div>
                  {t('match')}
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassDollar}
                    size='xs'
                    color='#aaa'
                    className='ml-1'
                  />
                </div>
              </div>
              <div className='text-center'>
                <div>
                  <b>{project.donors}</b>
                </div>
                <div>
                  {project.donors === 1 ? t('donor') : t('donors')}
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    size='xs'
                    color='#aaa'
                    className='ml-1'
                  />
                </div>
              </div>
              <div className='text-center'>
                <div>
                  <b>{content.followers}</b>
                </div>
                <div>
                  {t('followers')}
                  <FontAwesomeIcon
                    icon={faEye}
                    size='xs'
                    color='#aaa'
                    className='ml-1'
                  />
                </div>
              </div>
            </div>
            <ASAsDisplay appId={project.appId} />
            <div className='actions'>
              <Button className='donate' onClick={toggleDonate}>
                {t('Donate')}
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  size='lg'
                  color='#fff'
                  className='ml-4'
                />
              </Button>
              <Button className='share' onClick={toggleShare}>
                {t('Share')}
                <FontAwesomeIcon
                  icon={faShareAlt}
                  size='lg'
                  color='#5890FF'
                  className='ml-4'
                />
              </Button>
            </div>
          </div>
          {project?.image && (
            <div className='image-container'>
              <img src={project.image} alt='project highlights' />
            </div>
          )}
        </aside>
      </div>
      <ContractOverview appId={project.appId} />
      <MatchCalculator appId={project.appId} />
      <DonateModal open={openDonate} toggle={toggleDonate} project={project} />
      <ShareModal
        open={openShare}
        toggle={toggleShare}
        detail={{
          name: project.name,
          projectLink: project.homepage,
          projectId: project.id,
        }}
      />
    </div>
  );
};

export default ProjectDetail;
