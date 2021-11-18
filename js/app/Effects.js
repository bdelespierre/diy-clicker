import Assertion from '../lib/Assertion.js'
import Game from '../lib/Game.js'

export default class Effects {
    #game;
    #effects;

    constructor ({
      game,
      effects
    }) {
      Assertion.instanceOf(game, Game)
      Assertion.array(effects)

      effects.forEach(effect => {
        Assertion.array(effect)
        Assertion.greaterThanOrEqual(effect.length, 2)
      })

      this.#game = game
      this.#effects = effects
    }

    apply () {
      for (const [id, method, ...args] of this.#effects) {
        this.#game.get(id)[method](...args)
      }
    }
}
