import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StatsShape } from '/service/doc';
import MeteorShowerEffect from './MeteorShowerEffect';

import './FundingRound.scss';

const FundingRound = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <div className='funding-round d-flex flex-column align-items-center justify-content-center'>
      <MeteorShowerEffect />
      <div>
        <h1>{t('Funding round has started!')}</h1>
        <p>
          {t('Round ends on')}&nbsp;
          {stats.matchEndDate?.substring(0, 10)}
        </p>
        <h2>
          <span className='gradient-font'>
            {(stats.matchAmount / 1000000).toLocaleString()} Algos
          </span>
          &nbsp;{t('matching fund for this round. Start funding now below!')}
        </h2>
      </div>
    </div>
  );
};

FundingRound.propTypes = {
  stats: PropTypes.shape(StatsShape).isRequired,
};

export default FundingRound;
