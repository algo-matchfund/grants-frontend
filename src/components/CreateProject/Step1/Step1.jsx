import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Form,
  FormInput,
  FormSelect,
  Button,
  FormTextarea,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { PopupAlertDispatchContext } from '/context';
import COUNTRIES from '../countries';

import './Step1.scss';

const Step1 = ({ next }) => {
  const { t } = useTranslation();
  const { alertError } = useContext(PopupAlertDispatchContext);

  const [name, setName] = useState('');
  const [homepage, setHomepage] = useState('');
  const [github, setGithub] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [country, setCountry] = useState('');
  const [icon, setIcon] = useState('');
  const [algorandWallet, setAlgorandWallet] = useState('');

  const formFields = {
    name,
    homepage,
    algorand_wallet: algorandWallet,
    github,
    shortDescription,
    country,
    icon,
  };

  const readyToProceed = Object.values(formFields).every(f => f);

  const changeIcon = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setIcon(reader.result.toString());
    };
    reader.onerror = () => {
      alertError(
        'Failed to process icon, please select another image.'
      );
      return;
    };
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'grants');
  };

  return (
    <div className='create-project-content'>
      <Form id='create-project-form' className='step-1' autoComplete='off'>
        <FormInput
          id='name'
          className='create-project-name-input'
          type='text'
          placeholder={t('What is the name of the project?')}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoFocus
          spellCheck='false'
        />

        <label htmlFor='#algorand-wallet'>{t('Algorand wallet address')}</label>
        <FormInput
          id='algorand-wallet'
          className='w-100'
          type='text'
          placeholder={t('Wallet address')}
          value={algorandWallet}
          onChange={(event) => setAlgorandWallet(event.target.value)}
          spellCheck='false'
        />
        <div className='ml-2 mb-4'>
          * {t('To accept a specific Algorand Standard Asset type, it is your responsibility to opt-in to the asset to receive it.')}
        </div>

        <label htmlFor='#homepage'>{t('Homepage')}</label>
        <FormInput
          id='homepage'
          className='w-100'
          type='text'
          placeholder={t('Homepage')}
          value={homepage}
          onChange={(event) => setHomepage(event.target.value)}
          spellCheck='false'
        />

        <label htmlFor='#github'>GitHub</label>
        <InputGroup className='w-100'>
          <InputGroupAddon type='prepend'>
            <InputGroupText>
              <FontAwesomeIcon
                icon={faGithub}
                size='lg'
                color='#777'
                className='mr-2'
              />
              github.com/
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            id='github'
            type='text'
            value={github}
            onChange={(event) => setGithub(event.target.value)}
            spellCheck='false'
          />
        </InputGroup>

        <label htmlFor='#shortDescription'>{t('Short description')}</label>
        <FormTextarea
          id='shortDescription'
          className='w-100'
          placeholder={t('Short description')}
          value={shortDescription}
          onChange={(event) => setShortDescription(event.target.value)}
          required
          spellCheck='false'
        />

        <label htmlFor='#country'>{t('Country')}</label>
        <div>
          <FormSelect
            className='input-half'
            style={country === '' ? { color: '#aaa' } : {}}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value='' disabled>
              Select country
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </FormSelect>
        </div>
        <label htmlFor='#icon' className='create-project-icon-upload-label'>
          Profile picture
        </label>
        <label className='create-project-icon-upload'>
          <input
            type='file'
            name='icon'
            placeholder='change profile photo'
            onChange={changeIcon}
            accept='image/png, image/jpeg, image/jpg'
          />
          {!icon && <FontAwesomeIcon icon={faUser} size='3x' color='#aaa' />}
          {icon && <img src={icon} alt={t('icon')} />}
        </label>
        <div className='d-flex w-100 justify-content-between'>
          <div>
            <Button disabled={!readyToProceed} onClick={() => next(formFields)}>
              {t('Continue')}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

Step1.propTypes = {
  next: PropTypes.func.isRequired,
};

export default Step1;
