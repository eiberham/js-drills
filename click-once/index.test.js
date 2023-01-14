const once = require("./index");

describe("click-once function", () => {
  test("works as intended", () => {
    const multiply = (a, b) => a * b;
    const multiply_once = once(multiply);

    expect(multiply_once(2, 2)).toEqual(4);
    expect(multiply_once(2, 2)).toBe(false);
  });
});
