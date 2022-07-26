import { useContext } from 'react';
import { ApiContext } from '/context';

const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new ReferenceError('ApiContext used without ApiContext provider');
  }

  return context;
};

export default useApi;
