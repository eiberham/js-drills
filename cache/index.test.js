const Cache = require("./index");

describe("cache class", () => {
  test("make sure that it is a singleton", async () => {
    const fn = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([1, 2, 3, 4, 5]);
        }, 500);
      });
    };
    const options = {
      exp: 1 * 60000, // one minute
    };
    const cache = new Cache();
    await cache.get("numbers", fn);

    expect(cache.get("numbers")).toEqual(new Cache().get("numbers"));
  });
});
