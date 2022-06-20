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
var _Prestige_game, _Prestige_level;
import Assertion from '../lib/Assertion.js';
import ClickerGame from './ClickerGame.js';
import HasRequirementsMixin from './HasRequirementsMixin.js';
export default class Prestige extends HasRequirementsMixin(Object) {
    constructor({ game, requirements }) {
        super();
        _Prestige_game.set(this, void 0);
        _Prestige_level.set(this, 0);
        this.hasRequirementsConstructor({
            dispatcher: game.getDispatcher(),
            requirements
        });
        Assertion.instanceOf(game, ClickerGame);
        __classPrivateFieldSet(this, _Prestige_game, game, "f");
    }
    get level() {
        return __classPrivateFieldGet(this, _Prestige_level, "f");
    }
    set level(level) {
        Assertion.positiveNumber(level);
        __classPrivateFieldSet(this, _Prestige_level, level, "f");
    }
    get generatorMultiplierFactor() {
        return 2;
    }
    prestige() {
        var _a;
        if (!this.unlocked) {
            return this;
        }
        __classPrivateFieldSet(this, _Prestige_level, (_a = __classPrivateFieldGet(this, _Prestige_level, "f"), _a++, _a), "f");
        this.reset(this);
        __classPrivateFieldGet(this, _Prestige_game, "f").warehouse.reset(this);
        for (const generator of __classPrivateFieldGet(this, _Prestige_game, "f").generators) {
            generator.reset(this);
        }
        for (const technology of __classPrivateFieldGet(this, _Prestige_game, "f").technologies) {
            technology.reset(this);
        }
        return this;
    }
    update(delta) {
        this.unlock();
    }
    backup() {
        return {
            level: __classPrivateFieldGet(this, _Prestige_level, "f")
        };
    }
    restore(data) {
        Assertion.object(data);
        Assertion.positiveNumber(data.level);
        __classPrivateFieldSet(this, _Prestige_level, data.level, "f");
    }
    reset(prestige) {
        this.lock();
    }
}
_Prestige_game = new WeakMap(), _Prestige_level = new WeakMap();
