import Assertion from '../lib/Assertion.js'
import HasRequirementsMixin from './HasRequirementsMixin.js'
import Identity from './Identity.js'
import ProducingMixin from './ProducingMixin.js'
import UpgradeableMixin from './UpgradeableMixin.js'

export default class Generator extends HasRequirementsMixin(UpgradeableMixin(ProducingMixin(Object))) {
    // dependencies
    #identity;

    // attributes
    #speed = 1;

    constructor ({
      identity,
      warehouse,
      dispatcher,
      requirements,
      input,
      output,
      upgrade,
      parameters
    }) {
      super()

      this.producingConstructor({
        warehouse,
        input,
        output,
        parameters
      })

      this.upgradeableConstructor({
        warehouse,
        upgrade,
        parameters
      })

      this.hasRequirementsConstructor({
        dispatcher,
        requirements
      })

      Assertion.instanceOf(identity, Identity)

      this.#identity = identity
    }

    get identity () {
      return this.#identity
    }

    get speed () {
      return this.#speed
    }

    set speed (value) {
      Assertion.positiveNumber(value)

      this.#speed = value
    }

    // ----------------------------------------------------------------------------------------------------------------
    // mainloop hooks

    update (delta) {
      this.unlock()
      this.updateProducing(delta)
      this.updateUpgradeable(delta)
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    backup () {
      return {
        speed: this.#speed,
        requirements: this.backupHasRequirementsMixin(),
        production: this.backupProducingMixin(),
        upgrade: this.backupUpgradeableMixin()
      }
    }

    restore (data) {
      Assertion.object(data)
      Assertion.positiveNumber(data.speed)
      Assertion.object(data.requirements)
      Assertion.object(data.production)
      Assertion.object(data.upgrade)

      this.#speed = data.speed
      this.restoreHasRequirementsMixin(data.requirements)
      this.restoreProducingMixin(data.production)
      this.restoreUpgradeableMixin(data.upgrade)
    }
}
