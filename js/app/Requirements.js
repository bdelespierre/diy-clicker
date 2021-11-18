import Game from '../lib/Game.js'
import Assertion from '../lib/Assertion.js'
import Item from './Item.js'

export default class Requirements {
    #game;
    #requirements;

    constructor ({
      game,
      requirements
    }) {
      Assertion.instanceOf(game, Game)
      Assertion.array(requirements)

      requirements.forEach(requirement => {
        Assertion.array(requirement)
        Assertion.greaterThanOrEqual(requirement.length, 2)
      })

      this.#game = game
      this.#requirements = requirements
    }

    get fulfilled () {
      for (const [id, property, ...args] of this.#requirements) {
        const obj = this.#game.get(id)

        if (!obj) {
          return false
        }

        // handle item requirement definition: ['item-id', 10]
        if (typeof property === 'number' && obj instanceof Item) {
          if (this.#game.warehouse.count(obj) < property) {
            return false
          }

          continue
        }

        const value = obj[property]

        if (!value) {
          return false
        }

        if (typeof value === 'function' && !value.call(obj, ...args)) {
          return false
        }
      }

      return true
    }
}
