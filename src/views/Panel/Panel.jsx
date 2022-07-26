import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';
import ReviewPendingItem from '/components/ReviewPendingItem';
import { useApi, useAsyncEffect } from '/hooks';
import { format, startOfDay, subDays } from 'date-fns';

import './Panel.scss';

const Panel = () => {
  const api = useApi();
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  const [projects, setProjects] = useState();
  const [selected, setSelected] = useState('all');

  useAsyncEffect(async (_, safeUpdate) => {
    const [results, status] = await api.getProjectsForModeration(
      keycloak?.token
    );

    if (status === 500 || !results) {
      return;
    }

    safeUpdate(() =>
      setProjects(
        results.map((r) => ({
          id: r.moderationId,
          date:
            new Date(r.date) >= startOfDay(new Date())
              ? format(new Date(r.date), 'HH:mm')
              : format(new Date(r.date), 'yyyy-MM-DD'),
          _date: new Date(r.date),
          title: r.after.name ? r.after.name : r.before.name,
          user: r.after.socials.web
            ? r.after.socials.web
            : r.before.socials.web,
        }))
      )
    );
  }, []);

  let projectsToday, projectsThisWeek, projectsEarlier;

  if (projects) {
    projectsToday = projects
      .filter((p) => p.date.includes(':'))
      .map((p) => <ReviewPendingItem key={p.id} type='project' data={p} />);

    projectsThisWeek = projects
      .filter(
        (p) =>
          p._date < startOfDay(new Date()) && p._date >= subDays(new Date(), 7)
      )
      .map((p) => <ReviewPendingItem key={p.id} type='project' data={p} />);

    projectsEarlier = projects
      .filter((p) => p._date < subDays(new Date(), 7))
      .map((p) => <ReviewPendingItem key={p.id} type='project' data={p} />);
  }

  return (
    <div className='panel'>
      <nav>
        <button
          className={selected === 'all' ? 'selected' : ''}
          onClick={() => setSelected('all')}
        >
          {t('All')}
        </button>
        <button
          className={selected === 'users' ? 'selected' : ''}
          onClick={() => setSelected('users')}
        >
          {t('Users')}
        </button>
        <button
          className={selected === 'projects' ? 'selected' : ''}
          onClick={() => setSelected('projects')}
        >
          {t('Projects')}
        </button>
      </nav>
      <main>
        <div className='panel-header'>
          <h2>{t('Today')}</h2>
          <div>{t('User')}</div>
          <div>{t('Creation date')}</div>
        </div>
        {projectsToday?.length > 0 ? projectsToday : t('No pending projects.')}
        {projectsThisWeek?.length > 0 && <h2>{t('Previous 7 days')}</h2>}
        {projectsThisWeek}
        {projectsEarlier?.length > 0 && <h2>{t('Earlier')}</h2>}
        {projectsEarlier}
      </main>
    </div>
  );
};

export default Panel;
