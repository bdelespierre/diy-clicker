import Assertion from '../../lib/Assertion.js'
import { el } from '../../lib/Html.js'

export default class Modal {
    #parameters;
    #el;
    #bs;

    constructor (container, parameters = {}) {
      if (this.constructor === Modal) {
        throw new TypeError("Abstract class 'Modal' cannot be instanciated directly")
      }

      Assertion.object(parameters)
      Assertion.any(parameters.showHeader, [Assertion.undefined, Assertion.boolean])
      Assertion.any(parameters.showFooter, [Assertion.undefined, Assertion.boolean])
      Assertion.any(parameters.modalClass, [Assertion.undefined, Assertion.string])
      Assertion.any(parameters.dialogClass, [Assertion.undefined, Assertion.string])
      Assertion.any(parameters.contentClass, [Assertion.undefined, Assertion.string])
      Assertion.any(parameters.title, [Assertion.undefined, Assertion.string])
      Assertion.any(parameters.message, [Assertion.undefined, Assertion.string])
      Assertion.object(window.bootstrap, 'Bootstrap JS library is missing, did you forget to add it?')

      this.#parameters = parameters
      this.#el = this.build()

      Assertion.element(this.#el)
      container.appendChild(this.#el)

      this.#bs = new window.bootstrap.Modal(this.#el)
    }

    get modalClass () {
      return this.#parameters.modalClass || 'modal'
    }

    get dialogClass () {
      return this.#parameters.dialogClass || 'modal-dialog'
    }

    get contentClass () {
      return this.#parameters.contentClass || 'modal-content'
    }

    get title () {
      return this.#parameters.title || 'No title'
    }

    get header () {
      return [
        el('h5', { class: 'modal-title' }, this.title),
        el('button', {
          type: 'button',
          class: 'btn-close',
          'data-bs-dismiss': 'modal'
        })
      ]
    }

    get body () {
      return el('p', this.#parameters.message || 'No body')
    }

    get footer () {
      return [
        el('button', 'Close', {
          class: 'btn btn-secondary',
          'data-bs-dismiss': 'modal'
        })
      ]
    }

    build () {
      return el('div', { class: this.modalClass }, [
        el('div', { class: this.dialogClass }, [
          el('div', { class: this.contentClass }, [
            this.#parameters.showHeader
              ? el('div', { class: 'modal-header' }, this.header)
              : undefined,

            el('div', { class: 'modal-body' }, this.body),

            this.#parameters.showFooter
              ? el('div', { class: 'modal-footer' }, this.footer)
              : undefined
          ])
        ])
      ])
    }

    show () {
      this.#bs.show()
    }

    hide () {
      this.#bs.hide()
    }
}
