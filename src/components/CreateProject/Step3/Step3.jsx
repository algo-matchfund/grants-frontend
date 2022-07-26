import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleDollarToSlot,
  faCoins,
  faEye,
  faGlobe,
  faMagnifyingGlassDollar,
  faShareAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'shards-react';
import { composeMarkdown } from '/util';

import './Step3.scss';

const Step3 = ({ back, submit, project, submitting }) => {
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column justify-content-between h-100'>
      <div className='review-container'>
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
                    <a>{project.github}</a>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faGlobe} size='lg' color='#aaa' />
                    <a>{project.homepage}</a>
                  </div>
                </div>
              </header>
              <article>
                <ReactMarkdown>{composeMarkdown(project)}</ReactMarkdown>
              </article>
            </main>
            <aside>
              <div className='project-detail-panel'>
                <div className='stats'>
                  <div className='text-center'>
                    <div>
                      <b>0</b>
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
                      <b>0</b>
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
                      <b>0</b>
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
                      <b>0</b>
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
              </div>
              {project.screenshot && (
                <div className='image-container'>
                  <img src={project.screenshot} alt='project highlights' />
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between mx-5'>
        <Button theme='light' onClick={back}>
          {t('Back')}
        </Button>
        <Button disabled={submitting} onClick={submit}>
          {t('Submit')}
        </Button>
      </div>
    </div>
  );
};

Step3.propTypes = {
  back: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Step3;
