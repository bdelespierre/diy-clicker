import Assertion from '../lib/Assertion.js'
import Dispatcher from '../lib/Dispatcher.js'
import Requirements from './Requirements.js'

export default (superclass) => class extends superclass {
  // dependencies
  #dispatcher;
  #requirements;

  // attributes
  #initialLocked;
  #locked;

  hasRequirementsConstructor ({
    dispatcher,
    requirements,
    locked = true
  }) {
    Assertion.instanceOf(dispatcher, Dispatcher)
    Assertion.instanceOf(requirements, Requirements)
    Assertion.boolean(locked)

    this.#dispatcher = dispatcher
    this.#requirements = requirements
    this.#initialLocked = locked
    this.#locked = locked
  }

  get locked () {
    return this.#locked
  }

  get unlocked () {
    return !this.#locked
  }

  get requirements () {
    return this.#requirements
  }

  lock () {
    this.#locked = true

    return this
  }

  unlock () {
    if (this.#locked && this.#requirements.fulfilled) {
      this.#locked = false
      this.#dispatcher.emit('unlocked', this)
    }

    return this
  }

  // ----------------------------------------------------------------------------------------------------------------
  // backup & restore

  backupHasRequirementsMixin () {
    return {
      locked: this.#locked
    }
  }

  restoreHasRequirementsMixin (data) {
    Assertion.object(data)
    Assertion.boolean(data.locked)

    this.#locked = data.locked
  }

  // ----------------------------------------------------------------------------------------------------------------
  // prestige

  resetHasRequirements (prestige) {
    this.#locked = this.#initialLocked
  }
}
