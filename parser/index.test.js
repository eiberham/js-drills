const parse = require("./index");

describe("parse function", () => {
  test("url with query params", () => {
    const hash = parse(
      "/:version/api/:collection/:id",
      "/6/api/listings/3?sort=desc&limit=10"
    );

    const expected = {
      version: 6,
      collection: "listings",
      id: 3,
      sort: "desc",
      limit: 10,
    };

    expect(() => parse()).toThrow();
    expect(hash).toMatchObject(expected);
  });

  test("url without query params", () => {
    const hash = parse("/:version/api/:collection/:id", "/6/api/listings/3");

    const expected = {
      version: 6,
      collection: "listings",
      id: 3,
    };

    expect(() => parse()).toThrow();
    expect(hash).toMatchObject(expected);
  });

  test("url with host name", () => {
    const hash = parse(
      "/:version/api/:collection/:id",
      "https://website.com/6/api/listings/3"
    );

    const expected = {
      version: 6,
      collection: "listings",
      id: 3,
    };

    expect(() => parse()).toThrow();
    expect(hash).toMatchObject(expected);
  });
});
