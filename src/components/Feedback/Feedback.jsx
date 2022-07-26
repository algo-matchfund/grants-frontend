import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  Button,
  FormTextarea,
} from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useToggle } from '/hooks';
import SuccessStatus from '../Modals/StatusModal/SuccessStatus';

import './Feedback.scss';

const Feedback = () => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState('');
  const [bug, setBug] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [open, toggle] = useToggle(false);

  const reset = () => {
    setFeedback('');
    setBug('');
    setSubmitted(false);
    toggle();
  };

  const beforeSubmit = (
    <>
      <p>{t('Your feedback')}</p>
      <FormTextarea
        id='feedback'
        placeholder={t('Anything that can be improved?')}
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
        required
      />
      <p>{t('Bug report')}</p>
      <FormTextarea
        id='bug'
        placeholder={t('What bug did you find?')}
        value={bug}
        onChange={(event) => setBug(event.target.value)}
        required
      />
      <Button
        className='submit-button mt-4'
        onClick={() => {
          setSubmitted(true);
        }}
      >
        {t('Submit')}
      </Button>
    </>
  );

  const afterSubmit = (
    <div className='feedback-result h-100 d-flex align-items-center justify-content-center'>
      <SuccessStatus>
        <h4>{t('Thank you for your feedback!')}</h4>
        <div className='text-center result-message'>{t('We are glad to hear from you. Your feedback will help us improve our service.')}</div>
        <Button className='mt-4' onClick={reset}>{t('Close')}</Button>
      </SuccessStatus>
    </div>
  );

  return (
    <>
      <Modal
        backdropClassName='feedback-backdrop'
        className='feedback-modal'
        open={open}
        toggle={toggle}
        size='lg'
        fade={false}
      >
        <ModalBody className='p-2 d-flex flex-column'>
          {!submitted && beforeSubmit}
          {submitted && afterSubmit}
        </ModalBody>
        <Button className='close-button' onClick={reset}>
          <FontAwesomeIcon icon={faTimes} size='lg' color='#888' />
        </Button>
      </Modal>
      <Button className='feedback-button' onClick={toggle}>
        {t('Share your feedback')}
        <FontAwesomeIcon icon={faCommentDots} size='lg' color='#888' />
      </Button>
    </>
  );
};

export default Feedback;
