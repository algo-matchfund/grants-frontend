import { memo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { classNames } from '/util';
import AlgorandLogo from '/assets/images/AlgorandLogo';
import Icon from '/assets/images/carbon-negative.png';

import './Footer.scss';

const Footer = memo(() => {
  useTranslation();
  const location = useLocation();

  const darkClass = classNames({
    'dark-footer': location.pathname === '/network',
  });

  return (
    <footer className={`py-4 px-5 ${darkClass}`}>
      <div className='footer-top d-flex justify-content-between'>
        <AlgorandLogo />
        <div className='footer-links d-flex justify-content-between align-items-center'>
          <div>Algorand Community</div>
          <div>Developer Resources</div>
          <div>FAQs</div>
          <div>Disclaimers</div>
          <div>Privacy Policies</div>
          <div>Contact Us</div>
          <div>Algorand Inc.</div>
        </div>
      </div>
      <div className='pt-5 pb-4 footer-bottom d-flex justify-content-between'>
        <div>
        </div>
        <div>
          <img src={Icon} alt="carbon negative icon" className='mr-4' />
          Carbon Negative Since 2021
        </div>
      </div>
    </footer>
  );
});

export default Footer;
