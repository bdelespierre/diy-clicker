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
var _Countdown_delay, _Countdown_originalDelay, _Countdown_callback, _Countdown_reps;
import Assertion from './Assertion.js';
export default class Countdown {
    constructor(delay, fn, reps) {
        _Countdown_delay.set(this, void 0);
        _Countdown_originalDelay.set(this, void 0);
        _Countdown_callback.set(this, void 0);
        _Countdown_reps.set(this, void 0);
        Assertion.positiveNumber(delay);
        Assertion.function(fn);
        Assertion.any(reps, [Assertion.undefined, Assertion.positiveNumber]);
        __classPrivateFieldSet(this, _Countdown_delay, delay, "f");
        __classPrivateFieldSet(this, _Countdown_originalDelay, delay, "f");
        __classPrivateFieldSet(this, _Countdown_callback, fn, "f");
        __classPrivateFieldSet(this, _Countdown_reps, reps || 1, "f");
    }
    update(delta) {
        var _a;
        if (__classPrivateFieldGet(this, _Countdown_delay, "f") <= delta && __classPrivateFieldGet(this, _Countdown_reps, "f") > 0) {
            __classPrivateFieldSet(this, _Countdown_reps, (_a = __classPrivateFieldGet(this, _Countdown_reps, "f"), _a--, _a), "f");
            delta -= __classPrivateFieldGet(this, _Countdown_delay, "f");
            __classPrivateFieldSet(this, _Countdown_delay, __classPrivateFieldGet(this, _Countdown_originalDelay, "f"), "f");
            __classPrivateFieldGet(this, _Countdown_callback, "f").call();
            return this.update(delta);
        }
        __classPrivateFieldSet(this, _Countdown_delay, Math.max(0, __classPrivateFieldGet(this, _Countdown_delay, "f") - delta), "f");
    }
    get progress() {
        return 1 - __classPrivateFieldGet(this, _Countdown_delay, "f") / __classPrivateFieldGet(this, _Countdown_originalDelay, "f");
    }
    get isOver() {
        return __classPrivateFieldGet(this, _Countdown_delay, "f") <= 0 && __classPrivateFieldGet(this, _Countdown_reps, "f") <= 0;
    }
}
_Countdown_delay = new WeakMap(), _Countdown_originalDelay = new WeakMap(), _Countdown_callback = new WeakMap(), _Countdown_reps = new WeakMap();
