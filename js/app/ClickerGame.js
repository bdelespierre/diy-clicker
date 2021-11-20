import Assertion from '../lib/Assertion.js'
import BackupManager from './BackupManager.js'
import Effects from './Effects.js'
import Game from '../lib/Game.js'
import Generator from './Generator.js'
import Identity from './Identity.js'
import Item from './Item.js'
import ItemBag from './ItemBag.js'
import Layout from './ui/Layout.js'
import Prestige from './Prestige.js'
import Requirements from './Requirements.js'
import Technology from './Technology.js'
import Warehouse from './Warehouse.js'

export default class ClickerGame extends Game {
    // dependencies
    #container;

    // attributes
    #defs = {}
    #objects = {};
    #inventory = {};
    #generators = [];
    #technologies = [];
    #warehouse;
    #layout;
    #backupManager;
    #prestige;
    #settings = { autoSave: true };

    constructor ({
      container
    }) {
      super()

      Assertion.instanceOf(container, Element)

      this.#container = container
      this.#backupManager = new BackupManager(this)
    }

    get settings () {
      return this.#settings
    }

    set settings (obj) {
      this.#settings = obj
    }

    get backups () {
      return this.#backupManager
    }

    get prestige () {
      return this.#prestige
    }

    get inventory () {
      return this.#inventory
    }

    get warehouse () {
      return this.#warehouse
    }

    get generators () {
      return this.#generators
    }

    get technologies () {
      return this.#technologies
    }

    get layout () {
      return this.#layout
    }

    get (id) {
      return this.#objects[id]
    }

    // ----------------------------------------------------------------------------------------------------------------
    // loading assets

    async load (paths) {
      Assertion.instanceOf(paths, Object)
      Assertion.nonEmptyString(paths.items)
      Assertion.nonEmptyString(paths.generators)
      Assertion.nonEmptyString(paths.technologies)
      Assertion.nonEmptyString(paths.prestige)

      const [items, generators, technologies, prestige] = await Promise.all([
        this.#load(paths.items),
        this.#load(paths.generators),
        this.#load(paths.technologies),
        this.#load(paths.prestige)
      ])

      this.#defs.items = items
      this.#defs.generators = generators
      this.#defs.technologies = technologies
      this.#defs.prestige = prestige

      return this
    }

    #load (src) {
      return fetch(src).then(response => {
        if (!response.ok) {
          throw new Error(`Unable to fetch ${src}`)
        }

        return response.json()
      })
    }

    // ----------------------------------------------------------------------------------------------------------------
    // staging

    stage () {
      this.#stageWarehouse()
      this.#stageItems(this.#defs.items)
      this.#stageGenerator(this.#defs.generators)
      this.#stageTechnologies(this.#defs.technologies)
      this.#stagePrestige(this.#defs.prestige)
      this.#stageUi(this.#container)

      return this
    }

    #stageWarehouse () {
      this.#warehouse = new Warehouse(
        this.getDispatcher()
      )
    }

    #stageItems (items) {
      for (const i in items) {
        const item = new Item({
          identity: new Identity(items[i])
        })

        this.#objects[item.identity.id] = item
        this.#inventory[item.identity.id] = item
      }
    }

    #stageGenerator (generators) {
      for (const i in generators) {
        const generator = new Generator({
          identity: new Identity(generators[i]),
          warehouse: this.#warehouse,
          dispatcher: this.getDispatcher(),
          requirements: new Requirements({
            game: this,
            requirements: generators[i].requirements
          }),
          input: this.#objToInputBag(generators[i].input),
          output: this.#objToInputBag(generators[i].output),
          upgrade: this.#objToInputBag(generators[i].upgrade),
          parameters: generators[i].parameters
        })

        this.#objects[generator.identity.id] = generator
        this.#generators.push(generator)
      }
    }

    #stageTechnologies (technologies) {
      for (const i in technologies) {
        const technology = new Technology({
          identity: new Identity(technologies[i]),
          warehouse: this.#warehouse,
          dispatcher: this.getDispatcher(),
          requirements: new Requirements({
            game: this,
            requirements: technologies[i].requirements
          }),
          upgrade: this.#objToInputBag(technologies[i].upgrade),
          parameters: technologies[i].parameters,
          effects: new Effects({
            game: this,
            effects: technologies[i].effects
          })
        })

        this.#objects[technology.identity.id] = technology
        this.#technologies.push(technology)
      }
    }

    #stagePrestige (prestige) {
      this.#prestige = new Prestige({
        game: this,
        requirements: new Requirements({
          game: this,
          requirements: prestige.prestige.requirements
        })
      })
    }

    #objToInputBag (obj) {
      const bag = new ItemBag()

      for (const [itemId, qt] of Object.entries(obj)) {
        bag.set(this.#inventory[itemId], qt)
      }

      return bag
    }

    #stageUi (container) {
      this.#layout = new Layout({
        game: this,
        warehouse: this.#warehouse,
        dispatcher: this.getDispatcher(),
        container
      })

      for (const i in this.#generators) {
        this.#layout.addGenerator(this.#generators[i])
      }

      for (const i in this.#technologies) {
        this.#layout.addTechnology(this.#technologies[i])
      }
    }
}
