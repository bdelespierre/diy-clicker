import Assertion from '/js/lib/Assertion.js';
import Config from '/js/lib/Config.js';
import Dispatcher from '/js/lib/Dispatcher.js';
import Effects from '/js/app/Effects.js';
import Game from '/js/lib/Game.js';
import Generator from '/js/app/Generator.js';
import GeneratorInterface from '/js/app/ui/GeneratorInterface.js';
import Identity from '/js/app/Identity.js';
import Item from '/js/app/Item.js';
import ItemBag from '/js/app/ItemBag.js';
import Keyboard from '/js/lib/Keyboard.js';
import Layout from '/js/app/ui/Layout.js';
import Requirements from '/js/app/Requirements.js';
import Technology from '/js/app/Technology.js';
import TechnologyInterface from '/js/app/ui/TechnologyInterface.js';
import Warehouse from '/js/app/Warehouse.js';
import WarehouseInterface from '/js/app/ui/WarehouseInterface.js';

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

    constructor({
        container
    }) {
        super();

        Assertion.instanceOf(container, Element);

        this.#container = container;
    }

    get inventory() {
        return this.#inventory;
    }

    get warehouse() {
        return this.#warehouse;
    }

    get generators() {
        return this.#generators;
    }

    get technologies() {
        return this.#technologies;
    }

    get layout() {
        return this.#layout;
    }

    get(id) {
        return this.#objects[id];
    }

    // ----------------------------------------------------------------------------------------------------------------
    // loading assets

    async load(paths) {
        Assertion.instanceOf(paths, Object)
        Assertion.nonEmptyString(paths.items);
        Assertion.nonEmptyString(paths.generators);
        Assertion.nonEmptyString(paths.technologies);

        const [items, generators, technologies] = await Promise.all([
            this.#load(paths.items),
            this.#load(paths.generators),
            this.#load(paths.technologies),
        ]);

        this.#defs['items'] = items;
        this.#defs['generators'] = generators;
        this.#defs['technologies'] = technologies;

        return this;
    }

    #load(src) {
        return fetch(src).then(response => {
            if (! response.ok) {
                throw `Unable to fetch ${src}`;
            }

            return response.json();
        });
    }

    // ----------------------------------------------------------------------------------------------------------------
    // staging

    stage() {
        this.#stageWarehouse();
        this.#stageItems(this.#defs['items']);
        this.#stageGenerator(this.#defs['generators']);
        this.#stageTechnologies(this.#defs['technologies']);
        this.#stageUi(this.#container);

        return this;
    }

    #stageWarehouse() {
        this.#warehouse = new Warehouse(
            this.getDispatcher()
        );
    }

    #stageItems(items) {
        for (const i in items) {
            const item = new Item({
                identity: new Identity(items[i])
            });

            this.#objects[item.identity.id] = item;
            this.#inventory[item.identity.id] = item;
        }
    }

    #stageGenerator(generators) {
        for (const i in generators) {
            const generator = new Generator({
                identity: new Identity(generators[i]),
                warehouse: this.#warehouse,
                dispatcher: this.getDispatcher(),
                requirements: new Requirements({
                    game: this,
                    requirements: generators[i].requirements,
                }),
                input: this.#objToInputBag(generators[i].input),
                output: this.#objToInputBag(generators[i].output),
                upgrade: this.#objToInputBag(generators[i].upgrade),
                parameters: generators[i].parameters,
            });

            this.#objects[generator.identity.id] = generator;
            this.#generators.push(generator);
        }
    }

    #stageTechnologies(technologies) {
        for (const i in technologies) {
            const technology = new Technology({
                identity: new Identity(technologies[i]),
                warehouse: this.#warehouse,
                dispatcher: this.getDispatcher(),
                requirements: new Requirements({
                    game: this,
                    requirements: technologies[i].requirements,
                }),
                upgrade: this.#objToInputBag(technologies[i].upgrade),
                parameters: technologies[i].parameters,
                effects: new Effects({
                    game: this,
                    effects: technologies[i].effects,
                }),
            });

            this.#objects[technology.identity.id] = technology;
            this.#technologies.push(technology);
        }
    }

    #objToInputBag(obj) {
        const bag = new ItemBag();

        for (const [itemId, qt] of Object.entries(obj)) {
            bag.set(this.#inventory[itemId], qt);
        }

        return bag;
    }

    #stageUi(container) {
        this.#layout = new Layout({
            game: this,
            warehouse: this.#warehouse,
            dispatcher: this.getDispatcher(),
            container,
        });

        for (const i in this.#generators) {
            this.#layout.addGenerator(this.#generators[i]);
        }

        for (const i in this.#technologies) {
            this.#layout.addTechnology(this.#technologies[i]);
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    backup() {
        const data = {
            'createdAt': (new Date).toISOString(),
            'generators': {},
            'technologies': {},
            'warehouse': {},
        };

        for (const generator of this.#generators) {
            data['generators'][generator.identity.id] = generator.backup();
        }

        for (const technology of this.#technologies) {
            data['technologies'][technology.identity.id] = technology.backup();
        }

        for (const [item, qt] of this.#warehouse.entries()) {
            data['warehouse'][item.identity.id] = qt;
        }

        return data;
    }

    restore(data) {
        Assertion.object(data);
        Assertion.object(data.generators);
        Assertion.object(data.technologies);
        Assertion.object(data.warehouse);

        for (const id in data.generators) {
            this.#objects[id].restore(data.generators[id]);
        }

        for (const id in data.technologies) {
            this.#objects[id].restore(data.technologies[id]);
        }

        for (const id in data.warehouse) {
            this.#warehouse.set(this.#objects[id], data.warehouse[id]);
        }

        // rebuild layout
        this.#layout.rebuild();
    }
}
