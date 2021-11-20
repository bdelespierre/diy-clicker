import Assertion from '../../lib/Assertion.js'
import Prestige from '../Prestige.js'
import { card } from './InterfaceComponents.js'
import { el, on } from '../../lib/Html.js'

export default class PrestigeInterface {
  #ui = {};
  #prestige;

  constructor ({
    container,
    prestige
  }) {
    Assertion.element(container)
    Assertion.instanceOf(prestige, Prestige)

    this.#prestige = prestige

    this.build(container)
  }

  build (container) {
    this.#ui.card = card({}, [
      el('div', { class: 'text-center' }, [
        el('p', { class: 'mt-5' }, 'Prestige lets you start over with an increased production multiplier.'),

        el('button', { class: 'btn btn-primary btn-lg my-5' }, [
          el('i', { class: 'bi bi-gem me-2' }),
          el('span', 'Prestige '),
          el('span', this.#prestige.level + 1, span => { this.#ui.prestigeLevelSpan = span })
        ], btn => {
          this.#ui.prestigeButton = btn
          on(btn, 'click', this.onPrestigeBtnClick.bind(this))
        })
      ])
    ])

    container.appendChild(this.#ui.card)
  }

  onPrestigeBtnClick () {
    if (this.#prestige.unlocked) {
      this.#prestige.prestige()
    }
  }

  draw (interp) {
    this.#ui.prestigeButton.disabled = this.#prestige.locked
    this.#ui.prestigeLevelSpan.innerHTML = this.#prestige.level + 1
  }

  rebuild () {
    // pass
  }
}
