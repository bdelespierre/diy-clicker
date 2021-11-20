import Assertion from '../../lib/Assertion.js'
import Dispatcher from '../../lib/Dispatcher.js'
import Generator from '../Generator.js'
import Warehouse from '../Warehouse.js'
import { card, btn, items, switcher } from './InterfaceComponents.js'
import { el, on } from '../../lib/Html.js'

export default class GeneratorInterface {
  // dependencies
  #warehouse;
  #dispatcher;
  #generator;

  // attributes
  #ui = {};

  constructor ({
    container,
    warehouse,
    dispatcher,
    generator
  }) {
    Assertion.instanceOf(warehouse, Warehouse)
    Assertion.instanceOf(dispatcher, Dispatcher)
    Assertion.instanceOf(generator, Generator)

    this.#warehouse = warehouse
    this.#dispatcher = dispatcher
    this.#generator = generator

    container.appendChild(this.build())

    this.#dispatcher.on('unlocked', obj => {
      if (obj === this.#generator) {
        this.#ui.card.style.display = 'block'
      }
    })
  }

  // ----------------------------------------------------------------------------------------------------------------
  // ui definition

  #id (id) {
    return `${this.#generator.identity.id}_${id}`
  }

  build () {
    this.#ui.card = card({
      title: this.#generator.identity.label,
      style: 'display: none'
    }, [
      el('div', { class: 'd-flex' }, [
        el('div', { class: 'pe-2 flex-grow-1' }, [
          el('span', 'Level '),
          this.#ui.level = el('span', '1'),
          this.#ui.progress = el('progress', { value: 0, max: 1, class: 'd-block w-100' })
        ]),

        el('div', { class: 'btn-group' }, [
          this.#ui['produce-button'] = btn({
            type: 'primary',
            icon: 'play-fill',
            label: 'Produce',
            on: { click: this.onProduceClick.bind(this) }
          }),

          this.#ui['upgrade-button'] = btn({
            icon: 'plus-lg',
            label: 'Upgrade',
            on: { click: this.onUpgradeClick.bind(this) }
          }),

          this.#ui['parameters-button'] = btn({
            icon: 'gear',
            label: 'Parameters',
            on: { click: this.onParametersClick.bind(this) }
          })
        ])
      ]),

      this.#ui.parameters = el('div', { class: 'd-none list-group list-group-flush' }, [
        items(this.#generator.consumption, {
          label: 'Consumption',
          addCounter: (el, id) => { this.#ui[`consumption-${id}`] = el },
          addMeter: (el, id) => { this.#ui[`meter-consumption-${id}`] = el }
        }),

        items(this.#generator.production, {
          label: 'Production',
          meter: false,
          addCounter: (el, id) => { this.#ui[`production-${id}`] = el },
          addMeter: (el, id) => { this.#ui[`meter-production-${id}`] = el }
        }),

        items(this.#generator.upgradeCosts, {
          label: 'Upgrade Costs',
          addCounter: (el, id) => { this.#ui[`upgrade-costs-${id}`] = el },
          addMeter: (el, id) => { this.#ui[`meter-upgrade-costs-${id}`] = el }
        }),

        el('div', { class: 'px-0 list-group-item' }, [
          el('div', { class: 'd-flex' }, [
            el('div', { class: 'flex-grow-1' }, 'Speed'),

            this.#ui['speed-span'] = el('div', { class: 'text-right' }, '100%')
          ]),

          el('input', {
            type: 'range',
            class: 'd-block w-100 mb-2',
            min: 0,
            max: 1,
            step: 0.01
          }, input => {
            on(input, 'change', this.onSpeedChange.bind(this))
            this.#ui['speed-input'] = input
          }),

          switcher({
            id: this.#id('auto-produce-checkbox'),
            label: 'Auto produce',
            on: { change: this.onAutoProduceChange.bind(this) },
            addCheckbox: checkbox => { this.#ui['auto-produce-checkbox'] = checkbox }
          }),

          switcher({
            id: this.#id('auto-upgrade-checkbox'),
            label: 'Auto upgrade',
            on: { change: this.onAutoUpgradeChange.bind(this) },
            addCheckbox: checkbox => { this.#ui['auto-upgrade-checkbox'] = checkbox }
          })
        ])
      ])
    ])

    return this.#ui.card
  }

  // ----------------------------------------------------------------------------------------------------------------
  // event callbacks

  onProduceClick () {
    this.#generator.startProducing()
  }

  onUpgradeClick () {
    this.#generator.startUpgrading()
  }

  onParametersClick () {
    this.#ui.parameters.classList.toggle('d-none')
  }

  onAutoProduceChange () {
    this.#generator.autoProduce = this.#ui['auto-produce-checkbox'].checked
  }

  onAutoUpgradeChange () {
    this.#generator.autoUpgrade = this.#ui['auto-upgrade-checkbox'].checked
  }

  onSpeedChange () {
    this.#generator.speed = parseFloat(this.#ui['speed-input'].value)
  }

  // ----------------------------------------------------------------------------------------------------------------
  // mainloop hooks

  draw (interp) {
    this.#ui.level.innerHTML = this.#generator.level
    this.#ui.progress.value = this.#generator.productionProgress

    // update consumption table
    for (const obj of this.#generator.consumption) {
      this.#ui[`consumption-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2)

      this.#ui[`meter-consumption-${obj.item.identity.id}`].value = Math.min(
        1, this.#warehouse.count(obj.item) / obj.qt
      )
    }

    // update production table
    for (const obj of this.#generator.production) {
      this.#ui[`production-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2)
    }

    // update upgrade cost table
    for (const obj of this.#generator.upgradeCosts) {
      this.#ui[`upgrade-costs-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2)

      this.#ui[`meter-upgrade-costs-${obj.item.identity.id}`].value = Math.min(
        1, this.#warehouse.count(obj.item) / obj.qt
      )
    }

    // update buttons
    this.#ui['produce-button'].disabled = this.#generator.autoProduce ||
      this.producing ||
      !this.#generator.canProduce

    this.#ui['upgrade-button'].disabled = this.#generator.autoUpgrade ||
      this.upgrading ||
      !this.#generator.canUpgrade

    // update switches
    this.#ui['auto-produce-checkbox'].checked = this.#generator.autoProduce
    this.#ui['auto-upgrade-checkbox'].checked = this.#generator.autoUpgrade

    // update speed
    el(this.#ui['speed-span'], Math.round(this.#generator.speed * 100) + '%')
  }

  // ----------------------------------------------------------------------------------------------------------------
  // backup & restore

  rebuild () {
    if (this.#generator.unlocked) {
      this.#ui.card.style.display = 'block'
    }

    this.#ui['auto-produce-checkbox'].checked = this.#generator.autoProduce
    this.#ui['auto-upgrade-checkbox'].checked = this.#generator.autoUpgrade
    this.#ui['speed-input'].value = this.#generator.speed
  }
}
