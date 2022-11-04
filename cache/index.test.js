const Cache = require("./index");

describe("cache class", () => {
  const fn = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 500);
    });
  };

  test("make sure that it is a singleton", async () => {
    const options = {
      exp: 1 * 60000, // one minute
    };
    const cache = new Cache(options);
    await cache.get("numbers", fn);

    expect(cache.get("numbers")).toEqual(new Cache().get("numbers"));
    cache.mem.clear();
  });

  test("calls the cache storage the second time", async () => {
    const cache = new Cache();
    const fn = jest.fn(() => Promise.resolve({ data: {} }));
    await cache.get("numbers", fn);
    await cache.get("numbers", fn);
    await cache.get("numbers", fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
