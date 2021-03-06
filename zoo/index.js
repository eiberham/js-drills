/**
 * Class representing an animal.
 *
 * @author Abraham <cedenoabraham@gmail.com>
 */
class Animal {
  constructor(sound) {
    this.sound = sound;
  }

  /**
   * Makes the animal speak with an
   * interspersed sound.
   *
   * @param {string} speech - speech.
   * @returns {void} -
   */
  speak(speech) {
    const phrase = speech
      .split(" ")
      .map((bit) => bit.concat(this.sound))
      .join("")
      .trimEnd();
    return phrase;
  }
}

/**
 * Subclass representing a lion.
 *
 * @augments Animal
 * @author Abraham <cedenoabraham@gmail.com>
 */
class Lion extends Animal {
  constructor(sound) {
    super(sound);
  }
}

/**
 * Subclass that represents a tiger.
 *
 * @augments Animal
 * @author Abraham <cedenoabraham@gmail.com>
 */
class Tiger extends Animal {
  constructor(sound) {
    super(sound);
  }
}

module.exports = { Animal, Lion, Tiger };
