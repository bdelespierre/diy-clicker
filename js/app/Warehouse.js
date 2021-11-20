import Assertion from '../lib/Assertion.js'
import Dispatcher from '../lib/Dispatcher.js'
import Item from './Item.js'

export default class Warehouse extends Map {
    #dispatcher;

    constructor (dispatcher) {
      super()

      Assertion.instanceOf(dispatcher, Dispatcher)

      this.#dispatcher = dispatcher
    }

    count (item) {
      Assertion.instanceOf(item, Item)

      return this.get(item) || 0
    }

    add (item, qt) {
      Assertion.instanceOf(item, Item)
      Assertion.positiveNumber(qt)

      if (!this.has(item)) {
        this.set(item, qt)
        this.#dispatcher.emit('new-item', { item, qt, warehouse: this })
        return
      }

      const previousAmount = this.count(item)
      const newAmount = previousAmount + qt

      this.set(item, newAmount)
      this.#dispatcher.emit('item-update', { item, previousAmount, newAmount, warehouse: this })

      return this
    }

    remove (item, qt) {
      Assertion.instanceOf(item, Item)
      Assertion.positiveNumber(qt)

      const previousAmount = this.count(item)
      const newAmount = previousAmount - qt

      Assertion.positiveNumber(newAmount, 'Not enough items')

      this.set(item, newAmount)
      this.#dispatcher.emit('item-update', { item, previousAmount, newAmount, warehouse: this })

      return this
    }

    reset () {
      for (const [item] of this.entries()) {
        this.set(item, 0)
      }
    }
}
