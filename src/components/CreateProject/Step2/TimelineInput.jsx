import { useTranslation } from 'react-i18next';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormInput, Button, FormTextarea, FormGroup } from 'shards-react';

let ID = 2;

const TimelineInput = ({ values, setValues }) => {
  const { t } = useTranslation();

  const add = () => {
    setValues((prev) => [...prev, { id: ID++, title: '', description: '' }]);
  };

  const remove = (idx) => {
    setValues((prev) => {
      const newValues = [...prev];
      newValues.splice(idx, 1);
      return newValues;
    });
  };

  const fields = values.map((v, i) => (
    <div key={`uof-${v.id}`} className='d-flex flex-column mb-5'>
      {values.length > 1 && (
        <Button theme='secondary' className='remove' onClick={() => remove(i)}>
          <FontAwesomeIcon icon={faMinus} color='#fff' />
          {t('Remove')}
        </Button>
      )}
      <FormGroup>
        <FormInput
          id='timeline'
          className='w-100'
          type='text'
          placeholder={t('A concise sentence describing the step in timeline')}
          value={values[i].title}
          onChange={(event) => {
            setValues((v) => {
              const newValues = [...v];
              newValues[i] = {
                ...v[i],
                title: event.target.value,
              };
              return newValues;
            });
          }}
          spellCheck='false'
        />
        <FormTextarea
          id='useOfFunds'
          className='w-100'
          placeholder={t(
            'Provide explanations on what you will do in this step'
          )}
          value={values[i].description}
          onChange={(event) => {
            setValues((v) => {
              const newValues = [...v];
              newValues[i] = {
                ...v[i],
                description: event.target.value,
              };
              return newValues;
            });
          }}
          required
          spellCheck='false'
        />
      </FormGroup>
    </div>
  ));

  return (
    <>
      <label htmlFor='#timeline'>{t('Timeline')}</label>
      {fields}
      <Button className='add' onClick={add}>
        <FontAwesomeIcon icon={faPlus} color='#fff' />
        {t('Add step')}
      </Button>
    </>
  );
};

export default TimelineInput;
