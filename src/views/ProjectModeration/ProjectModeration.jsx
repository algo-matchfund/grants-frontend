import { useState, useContext } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormTextarea,
} from 'shards-react';
import { CSSTransition } from 'react-transition-group';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleCheck,
  faCircleDollarToSlot,
  faCoins,
  faEye,
  faGlobe,
  faMagnifyingGlassDollar,
  faPenToSquare,
  faShareAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'shards-react';
import { useApi, useAsyncEffect, useToggle } from '/hooks';
import { PopupAlertDispatchContext } from '/context';

import './ProjectModeration.scss';

const ProjectModeration = () => {
  const { t } = useTranslation();
  const api = useApi();
  const { id } = useParams();
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const { alertSuccess, alertError } = useContext(PopupAlertDispatchContext);

  const [project, setProject] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState();
  const [comment, setComment] = useState();
  const [dropdownOpen, toggleDropdown] = useToggle(false);

  useAsyncEffect(
    async (_, safeUpdate) => {
      const [result, status] = await api.getProjectModerationById(
        id,
        keycloak?.token
      );

      if (status !== 200) {
        history.push('/');
        return;
      }

      // If result.before.name exists, then it is a request for existing project changes. Else, it is a new project
      safeUpdate(() =>
        setProject(result.before.name ? result.before : result.after)
      );
    },
    [api, history]
  );

  const submit = async () => {
    setSubmitting(true);

    const body = {
      projectId: '',
      status,
      comment,
    };

    const [_, resCode] = await api.postProjectModerationById(
      id,
      body,
      keycloak?.token
    );

    if (resCode !== 200) {
      setSubmitting(false);
      alertError('Failed to submit review');
      return;
    }

    alertSuccess('Review sent succesfully!');
    toggleDropdown();
  };

  return project ? (
    <div className='project-moderation-container d-flex flex-column justify-content-between h-100'>
      <div className='project-moderation'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='project-moderation-header'>{t('Review')}</h2>
          <Dropdown
            open={dropdownOpen}
            toggle={toggleDropdown}
            className='active'
          >
            <DropdownToggle caret theme='success'>
              {t('Review')}
            </DropdownToggle>
            <CSSTransition classNames='fade' timeout={200} in={dropdownOpen}>
              <DropdownMenu persist right>
                <div className='status-buttons'>
                  <article>
                    <input
                      type='radio'
                      id='approve'
                      name='status'
                      checked={status === 'approve'}
                      value='approve'
                      onChange={() => setStatus('approve')}
                    />

                    <div id='approve-button'>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size='2x'
                        color='#555'
                      />
                      Approve
                    </div>
                  </article>

                  <article>
                    <input
                      type='radio'
                      id='deny'
                      name='status'
                      checked={status === 'deny'}
                      value='deny'
                      onChange={() => setStatus('deny')}
                    />

                    <div id='deny-button'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size='2x'
                        color='#555'
                      />
                      {t('Deny')}
                    </div>
                  </article>
                </div>
                <FormTextarea
                  id='comment'
                  placeholder={t('Leave review comments')}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <div className='d-flex justify-content-end'>
                  <Button disabled={submitting || !status} onClick={submit}>
                    {t('Submit')}
                  </Button>
                </div>
              </DropdownMenu>
            </CSSTransition>
          </Dropdown>
        </div>
        <div className='project-detail-container'>
          <div className='project-detail'>
            <main className='p-5'>
              <header>
                <div className='logo' style={{ backgroundColor: 'fff' }}>
                  {project && <img src={project.icon} alt='logo' />}
                </div>
                <h1>{project.name}</h1>
                <div className='links d-flex align-items-center'>
                  <div>
                    <FontAwesomeIcon icon={faGithub} size='lg' color='#aaa' />
                    <a>{project.socials.github}</a>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faGlobe} size='lg' color='#aaa' />
                    <a>{project.socials.web}</a>
                  </div>
                </div>
              </header>
              <article>
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </article>
            </main>
            <aside className='p-5'>
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
              {project.image && (
                <div className='image-container'>
                  <img src={project.image} alt='project highlights' />
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProjectModeration;
