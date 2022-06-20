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
var _PausedState_previous, _PausedState_ui;
import Assertion from '../../lib/Assertion.js';
import State from '../../lib/State.js';
export default class PausedState extends State {
    constructor(game, previous) {
        super(game);
        _PausedState_previous.set(this, void 0);
        _PausedState_ui.set(this, {});
        Assertion.instanceOf(previous, State);
        __classPrivateFieldSet(this, _PausedState_previous, previous, "f");
        this.game.layout.modals['paused-modal'].show();
    }
    resume() {
        this.game.layout.modals['paused-modal'].hide();
        this.game.setState(__classPrivateFieldGet(this, _PausedState_previous, "f"));
    }
}
_PausedState_previous = new WeakMap(), _PausedState_ui = new WeakMap();
