/**
 * Creates a string based on conditions for each provided string
 * @param {object.<string, boolean>} list An map of strings to inclusion flags
 * @returns {string} A Resulting string
 */
const classNames = (list) => {
  if (!list || typeof list !== 'object') {
    throw new TypeError('Invalid argument type.');
  }

  // If a condition is satisfied, return a new array of previous results + the string, then join all the strings together
  return Object.entries(list).reduce((result, [string, condition]) => (condition ? [...result, string] : result), []).join(' ');
};

export default classNames;
