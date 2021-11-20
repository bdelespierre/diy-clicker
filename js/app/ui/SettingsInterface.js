import Assertion from '../../lib/Assertion.js'
import ClickerGame from '../ClickerGame.js'
import { card } from './InterfaceComponents.js'
import { el, on } from '../../lib/Html.js'

export default class SettingsInterface {
  #game;
  #ui = {};

  constructor ({
    container,
    game
  }) {
    Assertion.instanceOf(game, ClickerGame)

    this.#game = game

    this.build(container)
  }

  // ----------------------------------------------------------------------------------------------------------------
  // ui definition

  build (container) {
    Assertion.element(container)

    this.#ui.settings = card({
      title: 'Settings'
    }, [

      // auto save
      el('div', { class: 'd-flex mb-2' }, [
        el('label', 'Auto Save', {
          for: 'settings-auto-save-switcher',
          class: 'pe-2 flex-grow-1'
        }),

        el('div', { class: 'form-check form-switch' }, [
          el('input', {
            type: 'checkbox',
            id: 'settings-auto-save-switcher',
            class: 'form-check-input',
            checked: this.#game.settings.autoSave
          }, input => {
            this.#ui.autoSaveSwitch = input
            on(input, 'change', this.onAutoSaveSwitchChange.bind(this))
          })
        ])
      ]),

      // last save
      el('div', { class: 'd-flex mb-2' }, [
        el('label', 'Last save', { class: 'pe-2 flex-grow-1' }),
        el('span', 'n/a', span => {
          this.#ui.lastSaveSpan = span
        })
      ]),

      // save now
      el('div', { class: 'd-flex mb-2' }, [
        el('label', 'Save now', { class: 'pe-2 flex-grow-1' }),
        el('button', { type: 'button', class: 'btn btn-primary' }, btn => {
          on(btn, 'click', this.onSaveBtnClick.bind(this))
        }, [
          el('i', { class: 'bi bi-save me-2' }),
          el('span', 'Save')
        ])
      ], div => {
        this.#ui.saveNowDiv = div
      })
    ])

    this.#ui.dangerZone = card({
      title: 'Danger Zone'
    }, [
      // delete backup
      el('div', { class: 'd-flex mb-2' }, [
        el('label', 'Delete saved game', { class: 'pe-2 flex-grow-1' }),
        el('button', { type: 'button', class: 'btn btn-danger' }, btn => {
          on(btn, 'click', this.onDeleteBtnClick.bind(this))
        }, [
          el('i', { class: 'bi bi-trash me-2' }),
          el('span', 'Delete')
        ])
      ])
    ])

    container.appendChild(this.#ui.settings)
    container.appendChild(this.#ui.dangerZone)
  }

  // ----------------------------------------------------------------------------------------------------------------
  // event callbacks

  onAutoSaveSwitchChange () {
    this.#game.settings.autoSave = this.#ui.autoSaveSwitch.checked
  }

  onSaveBtnClick () {
    this.#game.backups.backup()
  }

  onDeleteBtnClick () {
    this.#game.backups.deleteBackup()
  }

  // ----------------------------------------------------------------------------------------------------------------
  // mainloop hooks

  draw (interp) {
    this.#ui.lastSaveSpan.innerHTML = this.#game.backups.lastSaveDateTime || 'n/a'

    this.#game.settings.autoSave
      ? this.#ui.saveNowDiv.classList.add('d-none')
      : this.#ui.saveNowDiv.classList.remove('d-none')
  }

  // ----------------------------------------------------------------------------------------------------------------
  // backup & restore

  rebuild () {
    this.#ui.autoSaveSwitch.checked = this.#game.settings.autoSave
  }
}
