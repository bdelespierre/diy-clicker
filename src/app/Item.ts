import Assertion from '../lib/Assertion.js'
import Identity from './Identity.js'

export default class Item {
    #identity;

    constructor ({
      identity
    }) {
      Assertion.instanceOf(identity, Identity)

      this.#identity = identity
    }

    get identity () {
      return this.#identity
    }
}
