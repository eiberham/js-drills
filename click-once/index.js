/**
 * Executes a function only once using closures
 *
 * @param {Function} func - the function to be run
 */

const clickOnce = (func) => {
  return function () {
    const f = func;
    func = null;
    return f instanceof Function && f.apply(this, arguments);
  };
};

module.exports = clickOnce;
