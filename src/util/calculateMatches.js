/**
 * @typedef {Array<Fund>} Funds     Array of funds
 *
 * @typedef {object} Fund           Fund object for a project
 * @property {string} projectId     Number of items per page
 * @property {Array<number>} amount Array of fund amounts
 *
 * @typedef {number} MatchingPool   Matching pool amount
 *
 * @typedef {number} MatchAmounts   Array of match amounts
 *
 * @typedef {object} MatchAmount    Array of match amounts
 * @property {string} projectId     Number of items per page
 * @property {number} fund          Total amount of funding
 * @property {number} contributors  Number of contributors
 * @property {number} match         Matched amount
 * @property {number} percent       Percentage of initial amount
 */

const calculateMatches = (funds, matchingPool) => {
  const matches = [];
  for (const fund of funds) {
    let amount;
    if (fund.amount.length === 1) amount = fund.amount[0];
    else {
      amount = fund.amount.reduce((prev, curr) => prev + Math.sqrt(curr), 0);
      amount *= amount;
    }

    const totalFund = fund.amount.reduce((prev, curr) => prev + curr, 0);

    matches.push({
      projectId: fund.projectId,
      match: amount - totalFund,
      fund: totalFund,
      contributors: fund.amount.length,
    });
  }

  const totalMatch = matches.reduce((prev, curr) => prev + curr.match, 0);

  const matchAmounts = [];
  for (const m of matches) {
    let factor = matchingPool / totalMatch;
    let match = totalMatch <= matchingPool ? m.match : m.match * factor;
    let percent = (m.match * factor) / 100;

    matchAmounts.push({
      projectId: m.projectId,
      fund: m.fund,
      contributors: m.contributors,
      match,
      factor: factor,
      percent,
    });
  }

  return matchAmounts;
};

export default calculateMatches;
