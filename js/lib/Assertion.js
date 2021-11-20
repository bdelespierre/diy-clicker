export class AssertionError {
  constructor (obj, message) {
    this.obj = obj
    this.message = message
  }

  toString () {
    return this.message
  }
}

export default class Assertion {
  static #shouldTrace = true

  static any (obj, assertions, message) {
    const trace = this.#shouldTrace

    // disable tracing to avoid caught errors to be traced
    this.#shouldTrace = false

    // call all assertions and catch errors
    const errors = assertions.map(assertion => {
      try {
        return assertion.call(this, obj)
      } catch (error) {
        return error
      }
    }).filter(error => error !== undefined)

    // revert tracing to its previous value
    this.#shouldTrace = trace

    // if all validators have failed
    if (errors.length === assertions.length) {
      this.throwError(obj, message || errors.map(err => err.message).join(' and '))
    }
  }

  static array (obj, message) {
    if (!(obj instanceof Array)) {
      this.throwError(obj, message || 'not an array')
    }
  }

  static boolean (obj, message) {
    if (typeof obj !== 'boolean') {
      this.throwError(obj, message || 'not a boolean')
    }
  }

  static element (obj, message) {
    if (!(obj instanceof Element)) {
      this.throwError(obj, message || 'not an element')
    }
  }

  static equals (obj, value, strict = false, message) {
    if (strict ? (obj !== value) : (obj !== value)) {
      this.throwError(obj, message || `Not equals to ${value}`)
    }
  }

  static function (obj, message) {
    if (typeof obj !== 'function') {
      this.throwError(obj, message || 'not a function')
    }
  }

  static greaterThan (obj, value, strict = false, message) {
    this.number(obj)

    if (strict ? (obj <= value) : (obj < value)) {
      this.throwError(obj, message || `value is not greater than ${value}`)
    }
  }

  static greaterThanOrEqual (obj, value, message) {
    this.greaterThan(obj, value, false, message || `value is not greater than or equal to ${value}`)
  }

  static hasOwnProperties (obj, props, message) {
    this.instanceOf(obj, Object)

    for (const prop of props) {
      if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
        this.throwError(obj, message || `object doesn't have property ${prop}`)
      }
    }
  }

  static throwError (obj, reason) {
    if (this.#shouldTrace) {
      console.trace()
    }

    throw new AssertionError(obj, reason)
  }

  static instanceOf (obj, type, message) {
    if (!(obj instanceof type)) {
      this.throwError(obj, message || `not an instance of ${type}`)
    }
  }

  static nonEmptyString (obj, message) {
    this.string(obj, message)

    if (!obj || obj.length === 0) {
      this.throwError(obj, message || 'empty string')
    }
  }

  static number (obj, message) {
    if (typeof obj !== 'number') {
      this.throwError(obj, message || 'not a number')
    }

    if (isNaN(obj)) {
      this.throwError(obj, message || 'not a number (NaN)')
    }
  }

  static object (obj, message) {
    this.instanceOf(obj, Object, message)
  }

  static positiveNumber (obj, strict = false, message) {
    this.greaterThan(obj, 0, strict, message || 'not a positive number')
  }

  static string (obj, message) {
    if (typeof obj !== 'string' && !(obj instanceof String)) {
      this.throwError(obj, message || 'not a string')
    }
  }

  static undefined (obj, message) {
    if (typeof obj !== 'undefined') {
      this.throwError(obj, message || 'not undefined')
    }
  }
}
