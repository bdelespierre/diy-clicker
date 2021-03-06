import Assertion from '../lib/Assertion.js'
import Effects from './Effects.js'
import HasRequirementsMixin from './HasRequirementsMixin.js'
import Identity from './Identity.js'
import UpgradeableMixin from './UpgradeableMixin.js'

export default class Technology extends HasRequirementsMixin(UpgradeableMixin(Object)) {
  // dependencies
  #identity;
  #effects;

  constructor ({
    identity,
    warehouse,
    dispatcher,
    requirements,
    upgrade,
    parameters,
    effects
  }) {
    super()

    this.upgradeableConstructor({
      warehouse,
      upgrade,
      parameters,
      level: 0
    })

    this.hasRequirementsConstructor({
      dispatcher,
      requirements
    })

    Assertion.instanceOf(identity, Identity)
    Assertion.instanceOf(effects, Effects)

    this.#identity = identity
    this.#effects = effects
  }

  get identity () {
    return this.#identity
  }

  finishUpgrading () {
    if (super.finishUpgrading()) {
      this.#effects.apply()
    }
  }

  update (delta) {
    this.unlock()
    this.updateUpgradeable(delta)
  }

  // ----------------------------------------------------------------------------------------------------------------
  // backup & restore

  backup () {
    return {
      requirements: this.backupHasRequirementsMixin(),
      upgrade: this.backupUpgradeableMixin()
    }
  }

  restore (data) {
    Assertion.object(data)
    Assertion.object(data.requirements)
    Assertion.object(data.upgrade)

    this.restoreHasRequirementsMixin(data.requirements)
    this.restoreUpgradeableMixin(data.upgrade)
  }

  // ----------------------------------------------------------------------------------------------------------------
  // prestige

  reset (prestige) {
    this.resetUpgrading(prestige)
    this.resetHasRequirements(prestige)
  }
}
