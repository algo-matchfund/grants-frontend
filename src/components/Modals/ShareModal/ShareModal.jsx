import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Modal, ModalHeader, ModalBody, Button } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import './ShareModal.scss';

const ShareModal = ({ open, toggle, detail }) => {
  const { t } = useTranslation();

  const isProject = !detail?.fund; // "Share project" if there is no fund field in detail props.

  const shareContent = isProject
    ? {
        subject: 'Check out this project at Algorand Grants',
        body: `I have found this cool project, ${detail.name}${
          detail.projectLink ? ' (' + detail.projectLink + ')' : ''
        } on Algorand funds. Check it out here! ${process.env.DEPLOYMENT_URL}/projects/${detail.projectId}`,
      }
    : {
        subject: 'Check out Algorand Grants',
        body: `I have donated $${detail.fund} to my favorite project, ${
          detail.name
        }${
          detail.link ? ' (' + detail.link + ')' : ''
        }. You can do the same on ${process.env.DEPLOYMENT_URL}. Check it out!`,
      };

  return (
    <Modal
      className='share-modal'
      open={open}
      toggle={toggle}
      centered
      backdropClassName='share-modal-backdrop'
    >
      <ModalHeader>
        {isProject ? t('Share this project') : t('Share the good news')}
      </ModalHeader>

      <ModalBody className='p-0 px-2 d-flex align-items-center justify-content-center'>
        <a
          className='share-button twitter-button'
          href={`https://twitter.com/intent/tweet?text=${shareContent.body}`}
          target='_blank'
          onClick={toggle}
        >
          <FontAwesomeIcon icon={faTwitter} size='2x' color='#1d9bf0' />
        </a>
        <a
          className='share-button email-button'
          href={`mailto:?subject=${shareContent.subject}&body=${shareContent.body}`}
          onClick={toggle}
        >
          <FontAwesomeIcon icon={faEnvelope} size='2x' color='#e94134' />
        </a>
      </ModalBody>
      <Button className='close-button' onClick={toggle}>
        <FontAwesomeIcon icon={faTimes} color='#aaa' />
      </Button>
    </Modal>
  );
};

ShareModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
};

export default ShareModal;
