/**
 * parses an url given a specified format.
 *
 * @param {string } format - the format in which the hash will be built.
 * @param {string} url - the url.
 * @returns {object} - the hashed url instance.
 */
function parse(format, url) {
  if (!format || !url)
    throw Error("parameters `format` and `url` are required");

  const rgx = new RegExp(/(?<=\?).+/, "g");

  const query = url
    .match(rgx)
    .join("")
    .split("&")
    .reduce((acc, v) => {
      const [key, val] = v.split("=");
      return {
        ...acc,
        [key]: /^[A-Za-z]+$/.test(val) ? val : parseInt(val),
      };
    }, {});

  const uri = url
    .replace(/(?=\?).+/g, "")
    .split("/")
    .filter((item) => item);

  return format
    .split("/")
    .filter((item) => item)
    .reduce(
      (acc, val, index) => ({
        ...acc,
        ...(val.includes(":") && {
          [val.replace(":", "")]: /^[A-Za-z]+$/.test(uri[index])
            ? uri[index]
            : parseInt(uri[index]),
        }),
      }),
      query
    );
}

module.exports = parse;
