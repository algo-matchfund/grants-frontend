import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useApi, useAsyncEffect } from '/hooks';
import { Stats } from '/service/doc';
import Hero from "/components/Hero";
import FundingRound from "/components/FundingRound";
import LandingProjects from "/components/LandingProjects";

import "./Landing.scss";

const Landing = () => {
  const api = useApi();

  const [stats, setStats] = useState(Stats);

  useAsyncEffect(async (_, safeUpdate) => {
    // Fetch credit complaints and token requests
    const [results, status] = await trackPromise(api.getStats());

    if (status === 500 || !results) {
      return;
    }

    safeUpdate(() =>
      setStats({
        donationAmount: results.donation_amount,
        donationCount: results.donation_count,
        matchAmount: results.match_amount,
        projectCount: results.project_count,
        contributorCount: results.user_count,
        matchStartDate: results.match_start_date,
        matchEndDate: results.match_end_date,
      })
    );
  }, []);

  return (
    <div className="landing">
      <Hero stats={stats} />
      <FundingRound stats={stats} />
      <LandingProjects />
    </ div>
  );
};

export default Landing;
