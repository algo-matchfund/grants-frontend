import React from 'react';

/**
 * @typedef {boolean} ToggleState Boolean toggled component state
 * @typedef {Function} ToggleFunction A function to toggle component
 * @typedef {[ToggleState, ToggleFunction]} UseToggleReturn Value returned from useToggle hook
 */

/**
 * A React stateful hook for toggling components
 * @param {boolean} initialState Initial component state: on/off
 * @returns {UseToggleReturn}
 */
const useToggle = (initialState) => {
  const [state, setState] = React.useState(initialState);
  const toggleCallback = () => setState(!state);

  return [state, toggleCallback];
};

export default useToggle;
