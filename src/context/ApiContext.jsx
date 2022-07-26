import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import ApiService from '/service';

const ApiContext = createContext();
ApiContext.displayName = 'ApiContext';

const ApiProvider = ({ children }) => {
  const [api] = useState(new ApiService());

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  ApiContext,
  ApiProvider,
};
