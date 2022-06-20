var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ClickerGame_instances, _ClickerGame_container, _ClickerGame_defs, _ClickerGame_objects, _ClickerGame_inventory, _ClickerGame_generators, _ClickerGame_technologies, _ClickerGame_warehouse, _ClickerGame_layout, _ClickerGame_backupManager, _ClickerGame_prestige, _ClickerGame_settings, _ClickerGame_load, _ClickerGame_stageWarehouse, _ClickerGame_stageItems, _ClickerGame_stageGenerator, _ClickerGame_stageTechnologies, _ClickerGame_stagePrestige, _ClickerGame_objToInputBag, _ClickerGame_stageUi;
import Assertion from '../lib/Assertion.js';
import BackupManager from './BackupManager.js';
import Effects from './Effects.js';
import Game from '../lib/Game.js';
import Generator from './Generator.js';
import Identity from './Identity.js';
import Item from './Item.js';
import ItemBag from './ItemBag.js';
import Layout from './ui/Layout.js';
import Prestige from './Prestige.js';
import Requirements from './Requirements.js';
import Technology from './Technology.js';
import Warehouse from './Warehouse.js';
export default class ClickerGame extends Game {
    constructor(loop, container) {
        super({ loop });
        _ClickerGame_instances.add(this);
        _ClickerGame_container.set(this, void 0);
        _ClickerGame_defs.set(this, {});
        _ClickerGame_objects.set(this, {});
        _ClickerGame_inventory.set(this, {});
        _ClickerGame_generators.set(this, []);
        _ClickerGame_technologies.set(this, []);
        _ClickerGame_warehouse.set(this, void 0);
        _ClickerGame_layout.set(this, void 0);
        _ClickerGame_backupManager.set(this, void 0);
        _ClickerGame_prestige.set(this, void 0);
        _ClickerGame_settings.set(this, { autoSave: true });
        Assertion.instanceOf(container, Element);
        __classPrivateFieldSet(this, _ClickerGame_container, container, "f");
        __classPrivateFieldSet(this, _ClickerGame_backupManager, new BackupManager(this), "f");
    }
    get settings() {
        return __classPrivateFieldGet(this, _ClickerGame_settings, "f");
    }
    set settings(obj) {
        __classPrivateFieldSet(this, _ClickerGame_settings, obj, "f");
    }
    get backups() {
        return __classPrivateFieldGet(this, _ClickerGame_backupManager, "f");
    }
    get prestige() {
        return __classPrivateFieldGet(this, _ClickerGame_prestige, "f");
    }
    get inventory() {
        return __classPrivateFieldGet(this, _ClickerGame_inventory, "f");
    }
    get warehouse() {
        return __classPrivateFieldGet(this, _ClickerGame_warehouse, "f");
    }
    get generators() {
        return __classPrivateFieldGet(this, _ClickerGame_generators, "f");
    }
    get technologies() {
        return __classPrivateFieldGet(this, _ClickerGame_technologies, "f");
    }
    get layout() {
        return __classPrivateFieldGet(this, _ClickerGame_layout, "f");
    }
    get(id) {
        return __classPrivateFieldGet(this, _ClickerGame_objects, "f")[id];
    }
    load(paths) {
        return __awaiter(this, void 0, void 0, function* () {
            Assertion.instanceOf(paths, Object);
            Assertion.nonEmptyString(paths.items);
            Assertion.nonEmptyString(paths.generators);
            Assertion.nonEmptyString(paths.technologies);
            Assertion.nonEmptyString(paths.prestige);
            const [items, generators, technologies, prestige] = yield Promise.all([
                __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_load).call(this, paths.items),
                __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_load).call(this, paths.generators),
                __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_load).call(this, paths.technologies),
                __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_load).call(this, paths.prestige)
            ]);
            __classPrivateFieldGet(this, _ClickerGame_defs, "f").items = items;
            __classPrivateFieldGet(this, _ClickerGame_defs, "f").generators = generators;
            __classPrivateFieldGet(this, _ClickerGame_defs, "f").technologies = technologies;
            __classPrivateFieldGet(this, _ClickerGame_defs, "f").prestige = prestige;
            return this;
        });
    }
    stage() {
        __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_stageWarehouse).call(this);
        __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_stageItems).call(this, __classPrivateFieldGet(this, _ClickerGame_defs, "f").items);
        __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_stageGenerator).call(this, __classPrivateFieldGet(this, _ClickerGame_defs, "f").generators);
        __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_stageTechnologies).call(this, __classPrivateFieldGet(this, _ClickerGame_defs, "f").technologies);
        __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_stagePrestige).call(this, __classPrivateFieldGet(this, _ClickerGame_defs, "f").prestige);
        __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_stageUi).call(this, __classPrivateFieldGet(this, _ClickerGame_container, "f"));
        return this;
    }
}
_ClickerGame_container = new WeakMap(), _ClickerGame_defs = new WeakMap(), _ClickerGame_objects = new WeakMap(), _ClickerGame_inventory = new WeakMap(), _ClickerGame_generators = new WeakMap(), _ClickerGame_technologies = new WeakMap(), _ClickerGame_warehouse = new WeakMap(), _ClickerGame_layout = new WeakMap(), _ClickerGame_backupManager = new WeakMap(), _ClickerGame_prestige = new WeakMap(), _ClickerGame_settings = new WeakMap(), _ClickerGame_instances = new WeakSet(), _ClickerGame_load = function _ClickerGame_load(src) {
    return fetch(src).then(response => {
        if (!response.ok) {
            throw new Error(`Unable to fetch ${src}`);
        }
        return response.json();
    });
}, _ClickerGame_stageWarehouse = function _ClickerGame_stageWarehouse() {
    __classPrivateFieldSet(this, _ClickerGame_warehouse, new Warehouse(this.getDispatcher()), "f");
}, _ClickerGame_stageItems = function _ClickerGame_stageItems(items) {
    for (const i in items) {
        const item = new Item({
            identity: new Identity(items[i])
        });
        __classPrivateFieldGet(this, _ClickerGame_objects, "f")[item.identity.id] = item;
        __classPrivateFieldGet(this, _ClickerGame_inventory, "f")[item.identity.id] = item;
    }
}, _ClickerGame_stageGenerator = function _ClickerGame_stageGenerator(generators) {
    for (const i in generators) {
        const generator = new Generator({
            identity: new Identity(generators[i]),
            warehouse: __classPrivateFieldGet(this, _ClickerGame_warehouse, "f"),
            dispatcher: this.getDispatcher(),
            requirements: new Requirements({
                game: this,
                requirements: generators[i].requirements
            }),
            input: __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_objToInputBag).call(this, generators[i].input),
            output: __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_objToInputBag).call(this, generators[i].output),
            upgrade: __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_objToInputBag).call(this, generators[i].upgrade),
            parameters: generators[i].parameters
        });
        __classPrivateFieldGet(this, _ClickerGame_objects, "f")[generator.identity.id] = generator;
        __classPrivateFieldGet(this, _ClickerGame_generators, "f").push(generator);
    }
}, _ClickerGame_stageTechnologies = function _ClickerGame_stageTechnologies(technologies) {
    for (const i in technologies) {
        const technology = new Technology({
            identity: new Identity(technologies[i]),
            warehouse: __classPrivateFieldGet(this, _ClickerGame_warehouse, "f"),
            dispatcher: this.getDispatcher(),
            requirements: new Requirements({
                game: this,
                requirements: technologies[i].requirements
            }),
            upgrade: __classPrivateFieldGet(this, _ClickerGame_instances, "m", _ClickerGame_objToInputBag).call(this, technologies[i].upgrade),
            parameters: technologies[i].parameters,
            effects: new Effects({
                game: this,
                effects: technologies[i].effects
            })
        });
        __classPrivateFieldGet(this, _ClickerGame_objects, "f")[technology.identity.id] = technology;
        __classPrivateFieldGet(this, _ClickerGame_technologies, "f").push(technology);
    }
}, _ClickerGame_stagePrestige = function _ClickerGame_stagePrestige(prestige) {
    __classPrivateFieldSet(this, _ClickerGame_prestige, new Prestige({
        game: this,
        requirements: new Requirements({
            game: this,
            requirements: prestige.prestige.requirements
        })
    }), "f");
}, _ClickerGame_objToInputBag = function _ClickerGame_objToInputBag(obj) {
    const bag = new ItemBag();
    for (const [itemId, qt] of Object.entries(obj)) {
        bag.set(__classPrivateFieldGet(this, _ClickerGame_inventory, "f")[itemId], qt);
    }
    return bag;
}, _ClickerGame_stageUi = function _ClickerGame_stageUi(container) {
    __classPrivateFieldSet(this, _ClickerGame_layout, new Layout({
        game: this,
        warehouse: __classPrivateFieldGet(this, _ClickerGame_warehouse, "f"),
        dispatcher: this.getDispatcher(),
        container
    }), "f");
    for (const i in __classPrivateFieldGet(this, _ClickerGame_generators, "f")) {
        __classPrivateFieldGet(this, _ClickerGame_layout, "f").addGenerator(__classPrivateFieldGet(this, _ClickerGame_generators, "f")[i]);
    }
    for (const i in __classPrivateFieldGet(this, _ClickerGame_technologies, "f")) {
        __classPrivateFieldGet(this, _ClickerGame_layout, "f").addTechnology(__classPrivateFieldGet(this, _ClickerGame_technologies, "f")[i]);
    }
};
