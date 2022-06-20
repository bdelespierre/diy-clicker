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
var _Requirements_game, _Requirements_requirements;
import Game from '../lib/Game.js';
import Assertion from '../lib/Assertion.js';
import Item from './Item.js';
export default class Requirements {
    constructor({ game, requirements }) {
        _Requirements_game.set(this, void 0);
        _Requirements_requirements.set(this, void 0);
        Assertion.instanceOf(game, Game);
        Assertion.array(requirements);
        requirements.forEach(requirement => {
            Assertion.array(requirement);
            Assertion.greaterThanOrEqual(requirement.length, 2);
        });
        __classPrivateFieldSet(this, _Requirements_game, game, "f");
        __classPrivateFieldSet(this, _Requirements_requirements, requirements, "f");
    }
    get fulfilled() {
        for (const [id, property, ...args] of __classPrivateFieldGet(this, _Requirements_requirements, "f")) {
            const obj = __classPrivateFieldGet(this, _Requirements_game, "f").get(id);
            if (!obj) {
                return false;
            }
            if (typeof property === 'number' && obj instanceof Item) {
                if (__classPrivateFieldGet(this, _Requirements_game, "f").warehouse.count(obj) < property) {
                    return false;
                }
                continue;
            }
            const value = obj[property];
            if (!value) {
                return false;
            }
            if (typeof value === 'function' && !value.call(obj, ...args)) {
                return false;
            }
        }
        return true;
    }
}
_Requirements_game = new WeakMap(), _Requirements_requirements = new WeakMap();
