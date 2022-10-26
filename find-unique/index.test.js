const findUnique = require("./index");

describe("find-unique function", () => {
  test("returns the unique primitives", () => {
    const numbers = [1, 1, 1, 2, 1, 1, 3];
    const result = findUnique(numbers);

    expect(result.length).toEqual(2);
    expect(result).toContain(2);
    expect(result).toContain(3);
    expect(result).not.toContain(1);
  });
});
