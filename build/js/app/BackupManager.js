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
var _BackupManager_game, _BackupManager_lastSave;
import Assertion from '../lib/Assertion.js';
import ClickerGame from './ClickerGame.js';
export default class BackupManager {
    constructor(game) {
        _BackupManager_game.set(this, void 0);
        _BackupManager_lastSave.set(this, {});
        Assertion.instanceOf(game, ClickerGame);
        __classPrivateFieldSet(this, _BackupManager_game, game, "f");
    }
    get lastSaveDateTime() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _BackupManager_lastSave, "f")) === null || _a === void 0 ? void 0 : _a.createdAt;
    }
    backup() {
        const data = {
            createdAt: (new Date()).toISOString(),
            settings: __classPrivateFieldGet(this, _BackupManager_game, "f").settings,
            prestige: __classPrivateFieldGet(this, _BackupManager_game, "f").prestige.backup(),
            generators: {},
            technologies: {},
            warehouse: {}
        };
        for (const generator of __classPrivateFieldGet(this, _BackupManager_game, "f").generators) {
            data.generators[generator.identity.id] = generator.backup();
        }
        for (const technology of __classPrivateFieldGet(this, _BackupManager_game, "f").technologies) {
            data.technologies[technology.identity.id] = technology.backup();
        }
        for (const [item, qt] of __classPrivateFieldGet(this, _BackupManager_game, "f").warehouse.entries()) {
            data.warehouse[item.identity.id] = qt;
        }
        __classPrivateFieldSet(this, _BackupManager_lastSave, data, "f");
        window.localStorage.setItem('clicker-game-backup', JSON.stringify(data));
        return this;
    }
    restore() {
        let data = window.localStorage.getItem('clicker-game-backup');
        if (!data) {
            return;
        }
        data = JSON.parse(data);
        Assertion.object(data, 'invalid save: unable to parse save data');
        Assertion.object(data.settings, 'invalid save: no settings found');
        Assertion.object(data.prestige, 'invalid save: no prestige found');
        Assertion.object(data.generators, 'invalid save: no generators found');
        Assertion.object(data.technologies, 'invalid save: no technologies found');
        Assertion.object(data.warehouse, 'invalid save: no warehouse found');
        __classPrivateFieldSet(this, _BackupManager_lastSave, data, "f");
        __classPrivateFieldGet(this, _BackupManager_game, "f").settings = data.settings;
        __classPrivateFieldGet(this, _BackupManager_game, "f").prestige.restore(data.prestige);
        for (const id in data.generators) {
            __classPrivateFieldGet(this, _BackupManager_game, "f").get(id).restore(data.generators[id]);
        }
        for (const id in data.technologies) {
            __classPrivateFieldGet(this, _BackupManager_game, "f").get(id).restore(data.technologies[id]);
        }
        for (const id in data.warehouse) {
            __classPrivateFieldGet(this, _BackupManager_game, "f").warehouse.set(__classPrivateFieldGet(this, _BackupManager_game, "f").get(id), data.warehouse[id]);
        }
        __classPrivateFieldGet(this, _BackupManager_game, "f").layout.rebuild();
    }
    deleteBackup() {
        window.localStorage.removeItem('clicker-game-backup');
        __classPrivateFieldSet(this, _BackupManager_lastSave, {}, "f");
    }
}
_BackupManager_game = new WeakMap(), _BackupManager_lastSave = new WeakMap();
