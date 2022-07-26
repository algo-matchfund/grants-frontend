/**
 * Generates a simple and unsafe randomized hash code string from the input string
 * @param {string} str Hashing input
 * @returns {string} Simple and unsafe hash code of the string
 */
const randHash = (str) => Array.from(str).reduce(((r, ch) => {
  /* eslint-disable no-bitwise */
  let hash = r;
  const randomShift = Math.floor(Math.random() * 4) + 4; // random between 4 and 7
  hash = ((hash << randomShift) - hash) + ch.charCodeAt(0);
  hash &= hash; // convert to 32-bit integer
  return hash;
  /* eslint-enable no-bitwise */
}), 0).toString(16);

export default randHash;
