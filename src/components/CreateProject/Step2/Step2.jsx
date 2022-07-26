import { useState, useCallback, useMemo, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, FormTextarea } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { PopupAlertDispatchContext } from '/context';
import UseOfFundInput from './UseOfFundsInput';
import TimelineInput from './TimelineInput';

import './Step2.scss';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 250,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#ddd',
  borderStyle: 'dashed',
  backgroundColor: '#fcfcfe',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const Step2 = ({ back, next }) => {
  const { t } = useTranslation();
  const { alertError } = useContext(PopupAlertDispatchContext);

  const [aboutProject, setAboutProject] = useState('');
  const [useOfFunds, setUseOfFunds] = useState([
    { id: 1, title: '', description: '' },
  ]);
  const [timeline, setTimeline] = useState([
    { id: 1, title: '', description: '' },
  ]);
  const [aboutCompany, setAboutCompany] = useState('');
  const [files, setFiles] = useState([]);
  const [screenshot, setScreenshot] = useState('');

  const formFields = {
    aboutProject,
    useOfFunds,
    timeline,
    aboutCompany,
    files,
    screenshot,
  };

  const readyToProceed =
    aboutProject &&
    useOfFunds &&
    useOfFunds[0].title &&
    useOfFunds[0].description &&
    timeline[0].title &&
    timeline[0].description;

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(() => [
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    ]);
    
    let reader = new FileReader();
    reader.onloadend = () => {
      setScreenshot(reader.result.toString());
    };
    reader.onerror = () => {
      alertError(
        'Failed to process screenshot, please select another image.'
      );
      return;
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({ accept: 'image/*', onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
    }),
    [isDragActive, isDragAccept]
  );

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className='create-project-content'>
      <Form id='create-project-form' className='step-2' autoComplete='off'>
        <label htmlFor='#aboutProject'>{t('About project')}</label>
        <FormTextarea
          id='aboutProject'
          className='w-100'
          placeholder={t('Section on summary of the project')}
          value={aboutProject}
          onChange={(event) => setAboutProject(event.target.value)}
          required
          spellCheck='false'
        />
        <UseOfFundInput values={useOfFunds} setValues={setUseOfFunds} />
        <TimelineInput values={timeline} setValues={setTimeline} />
        <label htmlFor='#aboutCompany'>
          {t('About company/ organisation')}
        </label>
        <FormTextarea
          id='aboutCompany'
          className='w-100'
          placeholder={t(
            'Section to describe a little bit about yourself and/or your organisation'
          )}
          value={aboutCompany}
          onChange={(event) => setAboutCompany(event.target.value)}
          required
          spellCheck='false'
        />
        <label>{t('Project screenshot')}</label>
        <div {...getRootProps({ style })} className='upload-container'>
          <input {...getInputProps()} />
          <FontAwesomeIcon icon={faUpload} size='3x' />
          <p className='mt-4 mb-3'>{t('Click or drag and drop file')}</p>
        </div>
        {files.length > 0 && (
          <div className='file-items'>
            <img src={files[0].preview} />
            <button onClick={() => setFiles([])}>
              <FontAwesomeIcon icon={faTimes} size='sm' color='#fff' />
            </button>
          </div>
        )}
        <div className='d-flex w-100 justify-content-between'>
          <Button theme='light' onClick={back}>
            {t('Back')}
          </Button>
          <Button
            disabled={!readyToProceed}
            onClick={() =>
              next({
                ...formFields,
                useOfFunds: useOfFunds.filter(
                  (el) => el.title && el.description
                ),
                timeline: timeline.filter((el) => el.title && el.description),
              })
            }
          >
            {t('Continue')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

Step2.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default Step2;
