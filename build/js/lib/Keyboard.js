var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Keyboard_keys;
export default class Keyboard {
    constructor() {
        _Keyboard_keys.set(this, {
            ArrowUp: false,
            ArrowRight: false,
            ArrowDown: false,
            ArrowLeft: false,
            Enter: false,
            Backspace: false,
            Space: false,
            Escape: false,
            ControlLeft: false,
            ControlRight: false,
            AltLeft: false,
            AltRight: false,
            ShiftLeft: false,
            ShiftRight: false,
            Backquote: false,
            Digit1: false,
            Digit2: false,
            Digit3: false,
            Digit4: false,
            Digit5: false,
            Digit6: false,
            Digit7: false,
            Digit8: false,
            Digit9: false,
            Digit0: false,
            Minus: false,
            Equal: false,
            KeyA: false,
            KeyI: false,
            KeyQ: false,
            KeyY: false,
            KeyB: false,
            KeyJ: false,
            KeyR: false,
            KeyZ: false,
            KeyC: false,
            KeyK: false,
            KeyS: false,
            KeyD: false,
            KeyL: false,
            KeyT: false,
            KeyE: false,
            KeyM: false,
            KeyU: false,
            KeyF: false,
            KeyN: false,
            KeyV: false,
            KeyG: false,
            KeyO: false,
            KeyW: false,
            KeyH: false,
            KeyP: false,
            KeyX: false
        });
    }
    isDown(key) {
        if (__classPrivateFieldGet(this, _Keyboard_keys, "f")[key] === undefined) {
            throw new Error(`no such key: ${key}`);
        }
        return __classPrivateFieldGet(this, _Keyboard_keys, "f")[key] === true;
    }
    isUp(key) {
        if (__classPrivateFieldGet(this, _Keyboard_keys, "f")[key] === undefined) {
            throw new Error(`no such key: ${key}`);
        }
        return __classPrivateFieldGet(this, _Keyboard_keys, "f")[key] === false;
    }
    bindListeners(el) {
        el.addEventListener('keydown', this.onKeyDown.bind(this));
        el.addEventListener('keyup', this.onKeyUp.bind(this));
        return this;
    }
    onKeyDown(event) {
        if (__classPrivateFieldGet(this, _Keyboard_keys, "f")[event.code] === undefined) {
            return;
        }
        event.preventDefault();
        __classPrivateFieldGet(this, _Keyboard_keys, "f")[event.code] = true;
    }
    onKeyUp(event) {
        if (__classPrivateFieldGet(this, _Keyboard_keys, "f")[event.code] === undefined) {
            return;
        }
        event.preventDefault();
        __classPrivateFieldGet(this, _Keyboard_keys, "f")[event.code] = false;
    }
}
_Keyboard_keys = new WeakMap();
