import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { trackPromise } from 'react-promise-tracker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { useApi, useAsyncEffect } from '/hooks';
import { classNames } from '/util';
import Suspense from 'components/Suspense';
import LandingProjectsGrid from './LandingProjectsGrid';
import LandingProjectsList from './LandingProjectsList';

import './LandingProjects.scss';

const LandingProjects = () => {
  const { t } = useTranslation();
  const api = useApi();
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const observer = useRef();
  const limit = 24;
  const [projects, setProjects] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const buttonStyle = (selected) => classNames({ selected });

  useAsyncEffect(async (_, safeUpdate) => {
    // Fetch credit complaints and token requests
    const [results, status] = await trackPromise(api.getProjects());

    if (status === 500 || !results) {
      return;
    }

    safeUpdate(() => setProjects(results.map(r => ({ ...r, fundAmount: r.fund_amount }))));
  }, []);

  // useAsyncEffect(async (_, safeUpdate) => {
  //   const [stats] = await api.getStats(keycloak.token);
  //   const [projects] = await api.getProjects(keycloak.token);
  //   if (!stats) {
  //     return;
  //   }
  //   if (!projects) {
  //     return;
  //   }

  //   // TODO: these should be updatable separately
  //   safeUpdate(() => setStats(stats));
  //   safeUpdate(() => setProjects(projects));

  //   if (hasSearched) {
  //     trackPromise(updateToken(keycloak));

  //     const [companyList] = await trackPromise(api.getCompanies(keycloak.token, { offset, limit, name }));
  //     // Return companyList only if offset is 0 to avoid duplication.
  //     safeUpdate(() => setCompanies((prev) => (offset === 0 ? companyList : [...prev, ...companyList])));
  //     setHasMore(companyList.length === limit);
  //   }
  // }, [keycloak, offset, api]);

  // const onSearch = useCallback(async (input) => {
  //   setHasSearched(true);
  //   await trackPromise(updateToken(keycloak));

  //   // Only call getCompanies here if offset is already 0, if not trigger getCompanies above by updating offset.
  //   if (offset === 0) {
  //     const [companyList] = await trackPromise(api.getCompanies(keycloak.token, { offset, limit, name: input }));
  //     setCompanies(companyList);
  //     setHasMore(companyList.length === limit);
  //   }
  //   setName(input);
  //   setOffset(0);
  // }, [keycloak, offset, api]);

  const onSearch = () => {};

  const observingRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => limit + prevOffset);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className='landing-projects'>
      <div className='landing-projects-search-section'>
        <div className='landing-projects-search-bar d-flex justify-content-between align-items-center'>
          <h1 id='projects'>{t('Projects')}</h1>
          {/* <SortDropdown />
          <Search
            className='landing-projects-search'
            placeholder='Search project'
            onSubmit={onSearch}
          /> */}
          <div className='landing-projects-filter-container'>
            <button
              className={buttonStyle(showGrid)}
              onClick={() => setShowGrid(true)}
            >
              <FontAwesomeIcon icon={faBorderAll} size='2x' color='#CCC' />
            </button>
            <button
              className={buttonStyle(!showGrid)}
              onClick={() => setShowGrid(false)}
            >
              <FontAwesomeIcon icon={faBars} size='2x' color='#CCC' />
            </button>
          </div>
        </div>
      </div>
      <ul className='landing-projects-container'>
        {showGrid && <LandingProjectsGrid projects={projects} />}
        {!showGrid && <LandingProjectsList projects={projects} />}
        {/* {projects.length !== 0 &&
          projects.map((project, index) => {
            if (projects.length - Math.floor(limit / 2) === index + 1) {
              return (
                <div
                  refProp={observingRef}
                  key={project.name}
                  project={project}
                />
              );
            }
            return (
              <div
                key={project.name}
                project={project}
              />
            );
          })} */}
        {hasSearched && projects.length === 0 && (
          <div className='w-100 d-flex justify-content-center'>
            <p>{t('No projects found.')}</p>
          </div>
        )}
      </ul>
      <Suspense />
    </div>
  );
};

export default LandingProjects;
