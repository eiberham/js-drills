const parse = require("./index");

test("parse", () => {
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
