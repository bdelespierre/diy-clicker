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
var _State_game, _State_countdowns;
import Assertion from './Assertion.js';
import Countdown from './Countdown.js';
import Game from './Game.js';
export default class State {
    constructor(game) {
        _State_game.set(this, void 0);
        _State_countdowns.set(this, []);
        Assertion.instanceOf(game, Game);
        __classPrivateFieldSet(this, _State_game, game, "f");
    }
    get game() {
        return __classPrivateFieldGet(this, _State_game, "f");
    }
    begin(timestamp, delta) {
    }
    update(delta) {
        this.updateCountdowns(delta);
    }
    draw(interp) {
    }
    end(fps, panic) {
    }
    updateCountdowns(delta) {
        __classPrivateFieldGet(this, _State_countdowns, "f").forEach(countdown => countdown.update(delta));
        __classPrivateFieldSet(this, _State_countdowns, __classPrivateFieldGet(this, _State_countdowns, "f").filter(countdown => !countdown.isOver), "f");
    }
    after(delay, fn, reps) {
        const countdown = new Countdown(delay, fn, reps);
        __classPrivateFieldGet(this, _State_countdowns, "f").push(countdown);
        return countdown;
    }
    interval(delay, fn) {
        return this.after(delay, fn, Infinity);
    }
}
_State_game = new WeakMap(), _State_countdowns = new WeakMap();
