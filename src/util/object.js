/**
 * Get a list of keys deleted from changed object compared to the original object
 * @param {object} original Original object to compare to
 * @param {object} changed The object being compared to the original
 * @returns {Array[string]} List of deleted keys
 */
const getDeletedKeys = (original, changed) => Object.keys(original).filter((key) => !Object.keys(changed).includes(key));

/**
 * Get a list of keys added to the changed object compared to the original object
 * @param {object} original Original object to compare to
 * @param {object} changed The object being compared to the original
 * @returns {Array[string]} List of new keys
 */
const getNewKeys = (original, changed) => getDeletedKeys(changed, original);

/**
 * Get a map of key changes happened in changed object compared to the original object
 * @param {object} original Original object to compare to
 * @param {object} changed The object being compared to the original
 * @param {Array<string>} filter List of keys to filter out
 * @returns {object} A map of changed keys to objects, which contain the old and the new values
 */
const getKeyChanges = (original, changed, filter) => {
  const values = {};
  // compare original values to the changed object's values only at the original keys
  Object.keys(original).forEach((key) => {
    if (filter.includes(key)) {
      return;
    }
    if (changed[key] !== original[key]) {
      values[key] = { old: original[key], new: changed[key] };
    }
  });

  return values;
};

const objectSize = (obj) => Object.keys(obj).length;

export {
  getDeletedKeys,
  getNewKeys,
  getKeyChanges,
  objectSize,
};
