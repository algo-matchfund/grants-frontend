import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import { useApi } from '/hooks';
import { composeMarkdown } from '/util';
import ProgressBar from './ProgressBar';
import { PopupAlertDispatchContext } from '/context';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import './CreateProject.scss';

const CreateProject = () => {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const api = useApi();
  const { alertError } = useContext(PopupAlertDispatchContext);
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState();
  const [contentInfo, setContentInfo] = useState();
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);

    const body = {
      ...basicInfo,
      content: composeMarkdown(contentInfo),
      screenshot: contentInfo?.screenshot || '',
    };

    const [, status] = await api.postProject(body, keycloak.token);
    if (status !== 200) {
      alertError('Failed to create project, please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setStep(4);
  };

  let content, title;

  switch (step) {
    case 1:
      title = 'Create new project';
      content = (
        <Step1
          next={async (input) => {
            try {
              await axios.get(
                `https://indexer.${process.env.ALGOEXPLORER_API_URL}/v2/accounts/${input.algorand_wallet}`
              );
            } catch (e) {
              alertError('You must provide a valid Algorand wallet address');
              return;
            }

            setBasicInfo(input);
            setStep(2);
          }}
        />
      );
      break;
    case 2:
      title = 'Describe your project';
      content = (
        <Step2
          back={() => setStep(1)}
          next={(input) => {
            setContentInfo(input);
            setStep(3);
          }}
        />
      );
      break;
    case 3:
      title = 'Description page review';
      content = (
        <Step3
          project={{
            ...basicInfo,
            ...contentInfo,
            screenshot: contentInfo.files.length
              ? contentInfo.files[0].preview
              : '',
          }}
          back={() => setStep(2)}
          submit={submit}
          submitting={submitting}
        />
      );
      break;
    case 4:
      content = (
        <Step4
          reset={() => {
            setStep(1);
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <main className={`create-project ${step === 3 && 'full-width'}`}>
      <h1>{t(title)}</h1>
      <ProgressBar step={step} />
      {content}
    </main>
  );
};

export default CreateProject;
