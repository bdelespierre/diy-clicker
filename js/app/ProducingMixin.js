import Assertion from '../lib/Assertion.js'
import Warehouse from './Warehouse.js'
import ItemBag from './ItemBag.js'

export default (superclass) => class extends superclass {
    // dependencies
    #warehouse;
    #input;
    #output;

    // attributes
    #producing = false;
    #autoProduce = false;
    #multiplier;
    #productionTime;
    #elapsedTime = 0;

    producingConstructor ({
      warehouse,
      input,
      output,
      parameters
    }) {
      Assertion.instanceOf(warehouse, Warehouse)
      Assertion.instanceOf(input, ItemBag)
      Assertion.instanceOf(output, ItemBag)

      this.#warehouse = warehouse
      this.#input = input
      this.#output = output

      Assertion.instanceOf(parameters, Object)
      Assertion.any(parameters.multiplier, [Assertion.undefined, Assertion.positiveNumber])
      Assertion.positiveNumber(parameters.productionTime)
      Assertion.any(parameters.autoProduce, [Assertion.undefined, Assertion.boolean])

      this.#multiplier = parameters.multiplier || 1
      this.#productionTime = parameters.productionTime
      this.#autoProduce = parameters.autoProduce || false
    }

    // ----------------------------------------------------------------------------------------------------------------
    // attributes

    get producing () {
      return this.#producing
    }

    get autoProduce () {
      return this.#autoProduce
    }

    set autoProduce (flag) {
      Assertion.boolean(flag)

      this.#autoProduce = flag
    }

    get multiplier () {
      return this.#multiplier
    }

    get productionTime () {
      return this.#productionTime
    }

    get elapsedTime () {
      return this.#elapsedTime
    }

    // ----------------------------------------------------------------------------------------------------------------
    // producing

    get consumption () {
      return this.#input.map((item, qt) => ({ item, qt: qt * (this.level || 1) }))
    }

    get production () {
      return this.#output.map((item, qt) => ({ item, qt: qt * this.productionFactor }))
    }

    get productionFactor () {
      return (this.level || 1) * this.#multiplier
    }

    get productionProgress () {
      return this.#elapsedTime / this.#productionTime
    }

    get canProduce () {
      return this.#input.every((item, qt) => this.#warehouse.count(item) > qt * (this.level || 1))
    }

    incProductionMultiplier (amount = 1) {
      Assertion.positiveNumber(amount)

      this.#multiplier += amount

      return this
    }

    startProducing () {
      if (this.locked || this.#producing || !this.canProduce) {
        return this
      }

      // consume material items
      for (const [item, qt] of this.#input.entries()) {
        this.#warehouse.remove(item, qt * (this.level || 1))
      }

      this.#elapsedTime = 0
      this.#producing = true

      if (!this.#productionTime) {
        return this.finishProducing()
      }

      return this
    }

    finishProducing () {
      if (!this.#producing) {
        return false
      }

      // place produced items in warehouse
      for (const [item, qt] of this.#output.entries()) {
        this.#warehouse.add(item, qt * this.productionFactor)
      }

      this.#elapsedTime = 0
      this.#producing = false

      return this
    }

    updateProducing (delta) {
      if (!this.#producing && this.#autoProduce) {
        return this.startProducing()
      }

      if (this.#producing) {
        this.#elapsedTime += delta * (this.speed || 1)
      }

      if (this.#elapsedTime >= this.#productionTime) {
        this.finishProducing()
      }
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    backupProducingMixin () {
      return {
        producing: this.producing,
        autoProduce: this.autoProduce,
        multiplier: this.multiplier,
        productionTime: this.productionTime,
        elapsedTime: this.elapsedTime
      }
    }

    restoreProducingMixin (data) {
      Assertion.object(data)
      Assertion.boolean(data.producing)
      Assertion.boolean(data.autoProduce)
      Assertion.positiveNumber(data.multiplier, true)
      Assertion.positiveNumber(data.productionTime, true)
      Assertion.positiveNumber(data.elapsedTime)

      this.#producing = data.producing
      this.#autoProduce = data.autoProduce
      this.#multiplier = data.multiplier
      this.#productionTime = data.productionTime
      this.#elapsedTime = data.elapsedTime
    }
}
