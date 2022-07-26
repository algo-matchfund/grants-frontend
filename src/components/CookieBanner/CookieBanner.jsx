import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shards-react';

import './CookieBanner.scss';

const setCookie = (cookieKey, cookieValue, expirationDays) => {
    const date = new Date();

    date.setTime(`${date.getTime() + (expirationDays || 30) * 24 * 60 * 60 * 1000}`);

    const expiryDate = `; expiryDate=" ${date.toUTCString()}`;

  document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;
}

const getCookie = (cookieKey) => {
  let cookieName = `${cookieKey}=`;

  let cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {

    while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1, cookie.length);
      }

    if (cookie.indexOf(cookieName) == 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
}

const cookie = getCookie('allowCookies');

const CookieBanner = () => {
  const { t } = useTranslation();

  const [hide, setHide] = useState(cookie);

  const allowCookies = () => {
    setCookie('allowCookies', 'allow');
    setHide(true);
  }

  const rejectCookies = () => {
    setCookie('allowCookies', 'reject');
    setHide(true);
  }

  return hide ? (
    <></>
  ) : (
    <div className='cookie-banner d-flex align-items-center justify-content-around'>
      {t(
        'By clicking Allow All, you agree to the storing of cookies on your device to enhance site navigation.'
      )}
      <div>
        <Button theme='light' className='mr-4' onClick={rejectCookies}>
          {t('Reject all')}
        </Button>
        <Button onClick={allowCookies}>{t('Allow all')}</Button>
      </div>
    </div>
  );
};

export default CookieBanner;
