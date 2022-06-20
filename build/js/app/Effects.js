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
var _Effects_game, _Effects_effects;
import Assertion from '../lib/Assertion.js';
import Game from '../lib/Game.js';
export default class Effects {
    constructor({ game, effects }) {
        _Effects_game.set(this, void 0);
        _Effects_effects.set(this, void 0);
        Assertion.instanceOf(game, Game);
        Assertion.array(effects);
        effects.forEach(effect => {
            Assertion.array(effect);
            Assertion.greaterThanOrEqual(effect.length, 2);
        });
        __classPrivateFieldSet(this, _Effects_game, game, "f");
        __classPrivateFieldSet(this, _Effects_effects, effects, "f");
    }
    apply() {
        for (const [id, method, ...args] of __classPrivateFieldGet(this, _Effects_effects, "f")) {
            __classPrivateFieldGet(this, _Effects_game, "f").get(id)[method](...args);
        }
    }
}
_Effects_game = new WeakMap(), _Effects_effects = new WeakMap();
