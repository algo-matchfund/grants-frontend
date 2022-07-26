import { useTranslation } from 'react-i18next';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormInput, Button, FormTextarea, FormGroup } from 'shards-react';

let ID = 2;

const UseOfFundsInput = ({ values, setValues }) => {
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
          id='useOfFunds'
          className='w-100'
          type='text'
          placeholder={t('A concise sentence describing the usage of fund')}
          value={values[i].title}
          onChange={(event) => {
            setValues((uof) => {
              const newValues = [...uof];
              newValues[i] = {
                ...uof[i],
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
            'Provide explanations on how you will use the received funds'
          )}
          value={values[i].description}
          onChange={(event) => {
            setValues((uof) => {
              const newValues = [...uof];
              newValues[i] = {
                ...uof[i],
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
      <label htmlFor='#useOfFunds'>{t('Use of funds')}</label>
      {fields}
      <Button className='add' onClick={add}>
        <FontAwesomeIcon icon={faPlus} color='#fff' />
        {t('Add another point')}
      </Button>
    </>
  );
};

export default UseOfFundsInput;
