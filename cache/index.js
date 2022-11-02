/* eslint-disable no-underscore-dangle */

/**
 * Class representing a simple cache object
 * usage:
 * const options = {
 *  exp: 5 * 60000
 * }
 * const cache = new Cache(options)
 * const data = await cache.get(key, fn)
 * if no option is passed to the cache constructor it defaults the expiration time to three minutes.
 */
class Cache {
  constructor(options) {
    if (Cache._instance) {
      return Cache._instance;
    }
    Cache._instance = this;
    if (!options) {
      this.options = {
        exp: 3 * 60000,
      };
    } else {
      this.options = options;
    }
    this.mem = new Map();
  }

  /**
   * caches results fetched from fn if not available, otherwise returns them from cache
   *
   * @param {any} key - id to the entry
   * @param {Function} fn - async function to fetch results
   * @returns {Array} - results
   */
  async get(key, fn) {
    if (this.mem.has(key)) {
      return this.mem.get(key);
    }

    try {
      const values = await fn();
      this.mem.set(key, values);

      setTimeout(() => {
        this.mem.delete(key);
      }, this.options.exp || 3 * 6000);
    } catch (e) {
      console.error(e);
    }

    return this.mem.get(key);
  }
}

module.exports = Cache;
