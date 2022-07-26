import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, FormInput, Form, FormTextarea, Button } from 'shards-react';
import { useKeycloak } from '@react-keycloak/web';
import { PopupAlertDispatchContext } from '/context';
import { useApi, useAsyncEffect } from '/hooks';
import avatar from '../../components/LandingProjects/avatars/avatar-dog.jpg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import GoogleLogo from '/assets/images/GoogleLogo';
// import { faCheck } from '@fortawesome/free-solid-svg-icons';

import './Settings.scss';

const Settings = () => {
  const api = useApi();
  const { keycloak } = useKeycloak();
  const { alertSuccess, alertError } = useContext(PopupAlertDispatchContext);

  const { t } = useTranslation();
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  // const [googleConnected, setGoogleConnected] = useState(false);
  // const [facebookConnected, setFacebookConnected] = useState(false);

  // const changeAvatar = (e) => {
  //   const file = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.onloadend = () => {
  //     setAvatar(reader.result.toString());
  //   };
  //   reader.readAsDataURL(file);

  //   const data = new FormData();
  //   data.append('file', file);
  //   data.append('upload_preset', 'grants');
  // };

  useAsyncEffect(async (_, safeUpdate) => {
    const [result, status] = await api.getUserProfile(keycloak.token);

    if (status === 500 || !result) {
      return;
    }

    safeUpdate(() => {
      setFirstName(result.firstName);
      setLastName(result.lastName);
      // if (result?.attributes.avatar) setAvatar(result.attributes.avatar);
      if (result?.attributes.website) setWebsite(result.attributes.website);
      if (result?.attributes.location) setLocation(result.attributes.location);
      if (result?.attributes.bio) setBio(result.attributes.bio);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      attributes: {
        // avatar,
        website,
        location,
        bio,
      },
    };
    if (!firstName || !lastName) return;

    const [_, status] = await api.updateUserProfile(body, keycloak.token);
    if (status !== 204) {
      alertError('Failed to update profile');
      return;
    }
    alertSuccess('Profile updated');
  };

  return (
    <div className='settings'>
      <main>
        <h4 className='mb-5 mt-2 text-dark'>{t('Settings')}</h4>
        {/* <div className='settings-avatar'>
          <div className='settings-image-container'>
            {avatar && <img src={avatar} alt='avatar' />}
          </div>
          <div className='settings-username'>
            <h4>{firstName} {lastName}</h4>
            <label className='settings-upload'>
              Change profile photo
              <input
                type='file'
                name='file'
                placeholder='change profile photo'
                onChange={changeAvatar}
                accept='image/png, image/jpeg, image/jpg'
              />
            </label>
          </div>
        </div> */}
        <Form onSubmit={onSubmit} id='settings-form'>
          <FormGroup>
            <label htmlFor='#firstName'>{t('First Name')}</label>
            <FormInput
              id='firstName'
              type='text'
              placeholder={t('First Name')}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#lastName'>{t('Last Name')}</label>
            <FormInput
              id='lastName'
              type='text'
              placeholder={t('Last Name')}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#website'>{t('Website')}</label>
            <FormInput
              id='website'
              type='text'
              placeholder={t('Website')}
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#location'>{t('Location')}</label>
            <FormInput
              id='location'
              type='text'
              placeholder={t('Location')}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor='#bio'>{t('Bio')}</label>
            <FormTextarea
              id='bio'
              placeholder={t('Tell us a little bit about yourself')}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </FormGroup>
          <Button className='update-button mt-3 mb-5' type='submit'>
            {t('Update profile')}
          </Button>
        </Form>
        {/* <hr />
        <h4 className='mt-5'>{t('Link with accounts')}</h4>
        <div className='link-buttons pt-4 pb-5 mb-5 d-flex justify-content-center w-100'>
          <Button
            className='w-50 light d-flex justify-content-between mr-3'
            size='lg'
            onClick={() => setGoogleConnected(true)}
            disabled={googleConnected}
          >
            {!googleConnected && (
              <>
                {t('Connect with Google')}
                <GoogleLogo />
              </>
            )}
            {googleConnected && (
              <>
                {t('Connected with Google')}
                <FontAwesomeIcon icon={faCheck} size='lg' color='#666' />
              </>
            )}
          </Button>
          <Button
            className='w-50 d-flex justify-content-between ml-3'
            size='lg'
            onClick={() => setFacebookConnected(true)}
            disabled={facebookConnected}
          >
            {!facebookConnected && (
              <>
                {t('Connect with Facebook')}
                <FontAwesomeIcon icon={faFacebook} size='lg' color='#fff' />
              </>
            )}
            {facebookConnected && (
              <>
                {t('Connected with Facebook')}
                <FontAwesomeIcon icon={faCheck} size='lg' color='#666' />
              </>
            )}
          </Button>
        </div> */}
      </main>
    </div>
  );
};

export default Settings;
