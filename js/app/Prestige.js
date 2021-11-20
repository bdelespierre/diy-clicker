import Assertion from '../lib/Assertion.js'
import ClickerGame from './ClickerGame.js'
import HasRequirementsMixin from './HasRequirementsMixin.js'

export default class Prestige extends HasRequirementsMixin(Object) {
  // requirements
  #game;

  // attributes
  #level = 0;

  constructor ({
    game,
    requirements
  }) {
    super()

    this.hasRequirementsConstructor({
      dispatcher: game.getDispatcher(),
      requirements
    })

    Assertion.instanceOf(game, ClickerGame)

    this.#game = game
  }

  get level () {
    return this.#level
  }

  set level (level) {
    Assertion.positiveNumber(level)

    this.#level = level
  }

  get generatorMultiplierFactor () {
    /** @todo make this variable */
    return 2
  }

  prestige () {
    if (!this.unlocked) {
      return this
    }

    this.#level++
    this.reset(this)
    this.#game.warehouse.reset(this)

    for (const generator of this.#game.generators) {
      generator.reset(this)
    }

    for (const technology of this.#game.technologies) {
      technology.reset(this)
    }

    return this
  }

  // ----------------------------------------------------------------------------------------------------------------
  // mainloop hooks

  update (delta) {
    this.unlock()
  }

  // ----------------------------------------------------------------------------------------------------------------
  // backup & restore

  backup () {
    return {
      level: this.#level
    }
  }

  restore (data) {
    Assertion.object(data)
    Assertion.positiveNumber(data.level)

    this.#level = data.level
  }

  // ----------------------------------------------------------------------------------------------------------------
  // prestige

  reset (prestige) {
    this.lock()
  }
}
