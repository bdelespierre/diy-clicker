import Assertion from '../lib/Assertion.js'
import Item from './Item.js'

export default class ItemBag {
    #map;

    constructor (items) {
      this.#map = new Map(items)
    }

    set (item, qt) {
      Assertion.instanceOf(item, Item)
      Assertion.positiveNumber(qt)

      this.#map.set(item, qt)
      return this
    }

    has (item) {
      return this.#map.has(item)
    }

    get (item) {
      return this.#map.get(item) || 0
    }

    entries () {
      return this.#map.entries()
    }

    every (fn) {
      for (const [item, qt] of this.entries()) {
        if (!fn(item, qt)) {
          return false
        }
      }

      return true
    }

    map (fn) {
      const result = []

      for (const [item, qt] of this.entries()) {
        result.push(fn(item, qt))
      }

      return result
    }
}
