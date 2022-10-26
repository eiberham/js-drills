/**
 * finds the unique primitives in an array
 *
 * @param {Array} arr - input array
 * @returns {Array} - resulting array
 */

const findUnique = (arr) => {
  const hashmap = new Map();
  const result = [];

  arr.sort().forEach((el) => {
    if (hashmap.has(el)) {
      hashmap.set(el, hashmap.get(el) + 1);
    } else {
      hashmap.set(el, 1);
    }
  });

  for (let [k, v] of hashmap.entries()) {
    if (v === 1) result.push(k);
  }

  return result;
};

module.exports = findUnique;
