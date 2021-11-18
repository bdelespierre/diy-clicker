import Assertion from '../../lib/Assertion.js'
import Dispatcher from '../../lib/Dispatcher.js'
import Technology from '../Technology.js'
import Warehouse from '../Warehouse.js'
import { el } from '../../lib/Html.js'
import { card, btn, items, switcher } from './InterfaceComponents.js'

export default class TechnologyInterface {
    // dependencies
    #warehouse;
    #dispatcher;
    #technology;

    // attributes
    #ui = {};

    constructor ({
      container,
      warehouse,
      dispatcher,
      technology
    }) {
      Assertion.instanceOf(warehouse, Warehouse)
      Assertion.instanceOf(dispatcher, Dispatcher)
      Assertion.instanceOf(technology, Technology)

      this.#warehouse = warehouse
      this.#dispatcher = dispatcher
      this.#technology = technology

      container.appendChild(this.build())

      this.#dispatcher.on('unlocked', obj => {
        if (obj === this.#technology) {
          this.#ui.card.style.display = 'block'
        }
      })
    }

    // ----------------------------------------------------------------------------------------------------------------
    // ui definition

    #id (id) {
      return `${this.#technology.identity.id}_${id}`
    }

    build () {
      this.#ui.card = card({
        title: this.#technology.identity.label,
        style: 'display: none'
      }, [
        el('div', { class: 'd-flex' }, [
          el('div', { class: 'pe-2 flex-grow-1' }, [
            el('span', 'Level '),
            this.#ui.level = el('span', '0'),
            this.#ui.progress = el('progress', { value: 0, max: 1, class: 'd-block w-100' })
          ]),

          el('div', { class: 'btn-group' }, [
            this.#ui['upgrade-button'] = btn({
              type: 'success',
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
          items(this.#technology.upgradeCosts, {
            label: 'Upgrade Costs',
            addCounter: (el, id) => { this.#ui[`upgrade-costs-${id}`] = el },
            addMeter: (el, id) => { this.#ui[`meter-upgrade-costs-${id}`] = el }
          }),

          el('div', { class: 'px-0 list-group-item' }, [
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

    onUpgradeClick () {
      this.#technology.startUpgrading()
    }

    onAutoUpgradeChange () {
      this.#technology.autoUpgrade = this.#ui['auto-upgrade-checkbox'].checked
    }

    onParametersClick () {
      this.#ui.parameters.classList.toggle('d-none')
    }

    // ----------------------------------------------------------------------------------------------------------------
    // mainloop hooks

    draw (interp) {
      this.#ui.level.innerHTML = this.#technology.level
      this.#ui.progress.value = this.#technology.upgradingProgress

      // update upgrade cost table
      for (const obj of this.#technology.upgradeCosts) {
        this.#ui[`upgrade-costs-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2)

        this.#ui[`meter-upgrade-costs-${obj.item.identity.id}`].value = Math.min(
          1, this.#warehouse.count(obj.item) / obj.qt
        )
      }

      el(this.#ui['upgrade-button'], {
        disabled: this.#ui['auto-upgrade-checkbox'].checked || !this.#technology.canUpgrade
      })
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    rebuild () {
      if (this.#technology.unlocked) {
        this.#ui.card.style.display = 'block'
      }

      this.#ui['auto-upgrade-checkbox'].checked = this.#technology.autoUpgrade
    }
}
