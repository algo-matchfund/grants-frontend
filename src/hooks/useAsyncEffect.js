import { useEffect } from 'react';

/**
 * @callback SideEffect
 * @param {boolean} mounted Whether the component mounted or not
 * @param {Function} safeStateUpdate A wrapper function for safe state updates
 * @returns {void|Function} Void return or effect cleanup function
 */

/**
 * Creates a side effect of `callback`, which keeps track of component mount status to
 * avoid unmounted component state updates.
 * @param {SideEffect} callback A component side effect
 * @param {Array<any>} [dependencies=[]] List of effect dependencies
 * @ If callback changes component state it should do that only if `mounted` argument is true or use
 * safeStateUpdate wrapper
 */
const useAsyncEffect = (callback, dependencies = []) => {
  useEffect(() => {
    let mounted = true;
    const safeStateUpdate = (updateFn) => {
      if (mounted) {
        updateFn();
      }
    };
    const optionalCleanup = callback(mounted, safeStateUpdate);

    return () => {
      if (typeof optionalCleanup === 'function') {
        optionalCleanup();
      }
      mounted = false;
    };
  }, [...dependencies]);
};

export default useAsyncEffect;
