import { useTranslation } from 'react-i18next';
import { Form, FormGroup, FormInput } from 'shards-react';

const CardPayment = ({ children }) => {
  const { t } = useTranslation();

  return (
    <>
      <Form id='payment-form' action="#">
        <FormGroup>
          <label htmlFor='#name'>{t('Cardholder name')}</label>
          <FormInput
            id='name'
            type='text'
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='#number'>{t('Card number')}</label>
          <FormInput
            id='number'
            type='text'
            required
          />
        </FormGroup>
        <FormGroup className='d-flex justify-content-between'>
          <div className='cvv'>
            <label htmlFor='#cvv'>{t('CVV')}</label>
            <FormInput
              id='cvv'
              type='text'
              required
            />
          </div>
          <div className='date'>
            <label htmlFor='#date'>{t('Expiration date')}</label>
            <FormInput
              id='date'
              type='text'
              required
            />
          </div>
        </FormGroup>
      </Form>

      {children}
    </>
  );
}

export default CardPayment;
