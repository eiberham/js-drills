const { Animal, Tiger, Lion } = require("./index");

test("zoo", () => {
  const tiger = new Tiger(" grrr ");

  const lion = new Lion(" roar ");

  expect(lion).toBeInstanceOf(Animal);
  expect(tiger).toBeInstanceOf(Animal);
  expect(lion.speak("I'm a Lion")).toContain("roar");
  expect(lion.speak("I'm a Lion")).toEqual("I'm roar a roar Lion roar ");
  expect(tiger.speak("Lion's suck")).toContain("grrr");
  expect(tiger.speak("Lion's suck")).toEqual("Lion's grrr suck grrr ");
});
