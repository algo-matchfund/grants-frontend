/**
 * Get a new URL search string based on the current search string and provided parameters
 * @param {string} search Current search string
 * @param {object.<string, string>} params A map of search keys with values
 * @returns {string} A ? prepended URL search string
 */
const getURLSearchString = (search, params) => {
  const searchParams = new URLSearchParams(search);
  Object.entries(params).forEach(([key, value]) => {
    searchParams.delete(key);
    const isArray = value instanceof Array;
    if ((!isArray && value) || (isArray && value.length !== 0)) {
      searchParams.append(key, value);
    }
  });

  return `?${searchParams.toString()}`;
};

/**
 * Parses URL query search parameters and returns them as an object
 * @param {string} search URL query search parameters
 * @returns {object}
 */
const getQueryParams = (search) => [...new URLSearchParams(search)].reduce((r, p) => ({ ...r, [p[0]]: p[1] }), {});

/**
 * Prepares a URL query search parameter, which might be an array, for usage
 * @param {Array<string>|string} a argument
 * @returns {Array}
 */
const prepareArray = (a) => {
  if (a instanceof Array) return a;

  return a ? a.split(',') : [];
};

/**
 * Prepares a URL query search parameter, which might be a date, for usage
 * @param {Date|any} d argument
 * @returns {Date}
 */
const prepareDate = (d) => {
  if (!d) {
    return undefined;
  }

  return Date.parse(d) ? d : undefined;
};

export {
  getURLSearchString,
  getQueryParams,
  prepareArray,
  prepareDate,
};
