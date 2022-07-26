import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'shards-react';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDollarToSlot,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { StatsShape } from '/service/doc';
import Bubbles from '../Bubbles';

import './Hero.scss';
import background from '/assets/images/hero-background.png';

const Hero = ({ stats }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const register = useCallback(() => {
    history.push('/register');
  }, [history])

  return (
    <>
      <div
        className='hero d-flex justify-content-center'
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='hero-content'>
          <h1>{t('Support your interests')}</h1>
          <p>{t('Leverage the power of quadratic funding.')}</p>
          <p>{t('Be a part of the community to build a better world.')}</p>
          <div className='hero-content-buttons d-flex mb-3'>
            <HashLink smooth to={'/#projects'}>
              <Button
                className='light d-flex justify-content-between'
                size='lg'
              >
                {t('Donate')}
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  size='lg'
                  color='#5890FF'
                />
              </Button>
            </HashLink>
            <Button
              className='explore d-flex justify-content-between'
              size='lg'
              onClick={() => history.push('/projects/1')}
            >
              {t('Explore')}
              <FontAwesomeIcon icon={faCompass} size='lg' color='#fff' />
            </Button>
          </div>
          <div className='pt-4'>
            <a onClick={register}>
              <FontAwesomeIcon
                icon={faRightToBracket}
                size='lg'
                color='#555'
                className='mr-2'
              />
              {t('Sign up with email')}
            </a>
          </div>
        </div>
        <div className='hero-animations'>
          <Bubbles />
        </div>
      </div>
      <div className='hero-stats d-flex justify-content-around align-items-center'>
        <div>
          <b>{stats.projectCount}</b> {stats.projectCount === 1 ? t('project') : t('projects')}
        </div>
        <div>
          <b>{Math.ceil(stats.donationAmount / 1000000)}</b> Algos {t('raised')}
        </div>
        <div>
          <b>{stats.donationCount}</b> {stats.donationCount === 1 ? t('donation') : t('donations')}
        </div>
      </div>
    </>
  );
};

Hero.propTypes = {
  stats: PropTypes.shape(StatsShape).isRequired,
};

export default Hero;
