import Assertion from '../lib/Assertion.js'
import Warehouse from './Warehouse.js'
import ItemBag from './ItemBag.js'

export default (superclass) => class extends superclass {
  // dependencies
  #warehouse;
  #upgrade;

  // attributes
  #initialLevel;
  #level;
  #upgrading = false;
  #autoUpgrade;
  #costBase;
  #growthRate;
  #upgradeTime;
  #elapsedTime = 0;

  upgradeableConstructor ({
    warehouse,
    upgrade,
    level = 1,
    parameters
  }) {
    Assertion.instanceOf(warehouse, Warehouse)
    Assertion.instanceOf(upgrade, ItemBag)
    Assertion.positiveNumber(level, false)

    this.#warehouse = warehouse
    this.#upgrade = upgrade
    this.#initialLevel = level
    this.#level = level

    Assertion.instanceOf(parameters, Object)
    Assertion.positiveNumber(parameters.costBase)
    Assertion.positiveNumber(parameters.growthRate)
    Assertion.any(parameters.upgradeTime, [Assertion.undefined, Assertion.positiveNumber])
    Assertion.any(parameters.autoUpgrade, [Assertion.undefined, Assertion.boolean])

    this.#costBase = parameters.costBase
    this.#growthRate = parameters.growthRate
    this.#upgradeTime = parameters.upgradeTime || 0
    this.#autoUpgrade = parameters.autoUpgrade || false
  }

  get level () {
    return this.#level
  }

  get upgrading () {
    return this.#upgrading
  }

  get autoUpgrade () {
    return this.#autoUpgrade
  }

  set autoUpgrade (flag) {
    Assertion.boolean(flag)

    this.#autoUpgrade = flag
  }

  get costBase () {
    return this.#costBase
  }

  get growthRate () {
    return this.#growthRate
  }

  get upgradeTime () {
    return this.#upgradeTime
  }

  get elapsedTime () {
    return this.#elapsedTime
  }

  // ----------------------------------------------------------------------------------------------------------------
  // upgrading

  get upgradeCostFactor () {
    return this.#costBase * Math.pow(this.#growthRate, this.#level)
  }

  get upgradeCosts () {
    return this.#upgrade.map((item, qt) => ({ item, qt: qt * this.upgradeCostFactor }))
  }

  get upgradingProgress () {
    return this.#elapsedTime / this.#upgradeTime
  }

  get canUpgrade () {
    return this.#upgrade.every((item, qt) => this.#warehouse.count(item) > (this.upgradeCostFactor * qt))
  }

  levelGte (level) {
    return this.#level >= level
  }

  startUpgrading () {
    if (this.locked || this.#upgrading || !this.canUpgrade) {
      return this
    }

    // consume material items
    for (const [item, qt] of this.#upgrade.entries()) {
      this.#warehouse.remove(item, this.upgradeCostFactor * qt)
    }

    this.#elapsedTime = 0
    this.#upgrading = true

    return this
  }

  finishUpgrading () {
    if (!this.#upgrading) {
      return false
    }

    this.#level++
    this.#upgrading = false
    this.#elapsedTime = 0

    if (this.#autoUpgrade) {
      return this.startUpgrading()
    }

    return this
  }

  updateUpgradeable (delta) {
    if (this.#upgrading) {
      this.#elapsedTime += delta
    }

    if (this.#elapsedTime >= this.#upgradeTime) {
      this.finishUpgrading()
    }

    if (this.#autoUpgrade) {
      this.startUpgrading()
    }
  }

  // ----------------------------------------------------------------------------------------------------------------
  // backup & restore

  backupUpgradeableMixin () {
    return {
      level: this.#level,
      upgrading: this.#upgrading,
      autoUpgrade: this.#autoUpgrade,
      costBase: this.#costBase,
      growthRate: this.#growthRate,
      upgradeTime: this.#upgradeTime,
      elapsedTime: this.#elapsedTime
    }
  }

  restoreUpgradeableMixin (data) {
    Assertion.object(data)
    Assertion.positiveNumber(data.level)
    Assertion.boolean(data.upgrading)
    Assertion.boolean(data.autoUpgrade)
    Assertion.positiveNumber(data.costBase, true)
    Assertion.positiveNumber(data.growthRate, true)
    Assertion.positiveNumber(data.upgradeTime)
    Assertion.positiveNumber(data.elapsedTime)

    this.#level = data.level
    this.#upgrading = data.upgrading
    this.#autoUpgrade = data.autoUpgrade
    this.#costBase = data.costBase
    this.#growthRate = data.growthRate
    this.#upgradeTime = data.upgradeTime
    this.#elapsedTime = data.elapsedTime
  }

  // ----------------------------------------------------------------------------------------------------------------
  // prestige

  resetUpgrading (prestige) {
    this.#level = this.#initialLevel
    this.#upgrading = false
    this.#autoUpgrade = false
    this.#elapsedTime = 0
  }
}
