import { trackPromise } from 'react-promise-tracker';

/**
 * @callback PromiseFunction
 * @param {any}
 * @returns {Promise<any>}
 */

/**
 * @callback PromiseCallback
 * @param {any}
 * @returns {any} Returns the received params.
 */

/**
 * Creates a curried function, which expects safeUpdate function, then function, and the arguments for the tracked promise function
 *
 * @param {string} area Name of the area to track using react promise tracker.
 * @param {PromiseFunction} promiseFn A function, which return a promise to track.
 * @returns {Function} Tracked promise function. Accepts the safeUpdate function, then function,
 * and the tracked promise' arguments.
 */
const trackFetch = (area, promiseFn) => (safeUpdate, thenFn, ...args) => trackPromise(
  promiseFn(...args)
    .then((...cArgs) => { safeUpdate(() => thenFn(...cArgs)); return cArgs; }),
  area,
).then(([z]) => z);

/**
 * Creates a curried function, which expects safeUpdate function and the arguments for the tracked promise function
 *
 * @param {string} area Name of the area to track using react promise tracker.
 * @param {PromiseFunction} promiseFn A function, which return a promise to track.
 * @param {PromiseCallback} thenFn A promise completion callback.
 * @returns {Function} Tracked promise function. Accepts the safeUpdate function and the tracked promise' arguments.
 */
const trackFetchThen = (area, promiseFn, thenFn) => (safeUpdate, ...args) => trackPromise(
  promiseFn(...args)
    .then((...cArgs) => { safeUpdate(() => thenFn(...cArgs)); return cArgs; }),
  area,
).then(([z]) => z);

export {
  trackFetch,
  trackFetchThen,
};
