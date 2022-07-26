import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, ModalBody } from 'shards-react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProjectShape } from '/service/doc';
import SetAlgorandValue from './SetAlgorandValue';
import SetASAValue from './SetASAValue';

import './DonateModal.scss';
import AlgorandLogo from '/assets/images/algorand-logo.png';

const DonateModal = ({ open, toggle, project }) => {
  const { t } = useTranslation();
  const [launch, setLaunch] = useState(false);
  const [fundType, setFundType] = useState('');

  const back = () => {
    setFundType('');
  };

  const reset = () => {
    setLaunch(false);
    setFundType('');
    toggle();
  };

  return (
    <Modal
      backdropClassName='donate-backdrop'
      className='donate-modal'
      open={open}
      toggle={reset}
      size='lg'
      centered
    >
      {!fundType && (
        <ModalBody className='donate-select-type-body p-0 px-2'>
          <h2>{t('Select donation type')}</h2>
          <div className='donate-select-type-buttons'>
            <div className='donate-select-type-button-container'>
              <Button
                onClick={() => {
                  setFundType('Algorand');
                }}
              >
                <img src={AlgorandLogo} alt='Algorand logo' />
              </Button>
              <div>Algorand coin</div>
            </div>
            <div className='donate-select-type-button-container'>
              <Button
                onClick={() => {
                  setFundType('ASA');
                }}
              >
                <div className='asa-logo'>ASA</div>
              </Button>
              <div>Algorand Standard Assets</div>
            </div>
          </div>
        </ModalBody>
      )}
      {fundType === 'Algorand' && (
        <SetAlgorandValue
          project={project}
          launch={launch}
          setLaunch={setLaunch}
        />
      )}
      {fundType === 'ASA' && (
        <SetASAValue
          project={project}
          launch={launch}
          setLaunch={setLaunch}
        />
      )}
      {fundType && (
        <Button className='back-button' onClick={back}>
          <FontAwesomeIcon icon={faArrowLeft} size='2x' color='#FFF' />
        </Button>
      )}
      {!launch && (
        <Button className='close-button' onClick={reset}>
          <FontAwesomeIcon icon={faTimes} size='2x' color='#FFF' />
        </Button>
      )}
    </Modal>
  );
};

DonateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  project: PropTypes.shape(ProjectShape).isRequired,
};

export default DonateModal;
