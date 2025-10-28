/**
 * A class to show off how the JSDoc comments should look like.
 */
export default class SomeClass {
  #message = 'Hello World from class'

  /**
   * Return the string representation of this object.
   *
   * @returns {string} The string representation.
   */
  toString () {
    return this.#message
  }
}
