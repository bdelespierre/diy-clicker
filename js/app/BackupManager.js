import Assertion from '../lib/Assertion.js'
import ClickerGame from './ClickerGame.js'

export default class BackupManager {
  #game;
  #lastSave = {};

  constructor (game) {
    Assertion.instanceOf(game, ClickerGame)

    this.#game = game
  }

  get lastSaveDateTime () {
    return this.#lastSave?.createdAt
  }

  backup () {
    const data = {
      createdAt: (new Date()).toISOString(),
      settings: this.#game.settings,
      generators: {},
      technologies: {},
      warehouse: {}
    }

    for (const generator of this.#game.generators) {
      data.generators[generator.identity.id] = generator.backup()
    }

    for (const technology of this.#game.technologies) {
      data.technologies[technology.identity.id] = technology.backup()
    }

    for (const [item, qt] of this.#game.warehouse.entries()) {
      data.warehouse[item.identity.id] = qt
    }

    this.#lastSave = data

    window.localStorage.setItem(
      'clicker-game-backup', JSON.stringify(data)
    )

    return this
  }

  restore () {
    // if a previous backup exists, restore game
    let data = window.localStorage.getItem('clicker-game-backup')

    if (!data) {
      return
    }

    data = JSON.parse(data)

    Assertion.object(data, 'invalid save: unable to parse save data')
    Assertion.object(data.settings, 'invalid save: no settings found')
    Assertion.object(data.generators, 'invalid save: no generators found')
    Assertion.object(data.technologies, 'invalid save: no technologies found')
    Assertion.object(data.warehouse, 'invalid save: no warehouse found')

    this.#lastSave = data
    this.#game.settings = data.settings

    for (const id in data.generators) {
      this.#game.get(id).restore(data.generators[id])
    }

    for (const id in data.technologies) {
      this.#game.get(id).restore(data.technologies[id])
    }

    for (const id in data.warehouse) {
      this.#game.warehouse.set(this.#game.get(id), data.warehouse[id])
    }

    // rebuild layout
    this.#game.layout.rebuild()
  }

  deleteBackup () {
    window.localStorage.removeItem('clicker-game-backup')
    this.#lastSave = {}
  }
}
