var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dispatcher_events;
export default class Dispatcher {
    constructor() {
        _Dispatcher_events.set(this, {});
    }
    emit(event, details) {
        if (__classPrivateFieldGet(this, _Dispatcher_events, "f")[event] === undefined) {
            return this;
        }
        __classPrivateFieldGet(this, _Dispatcher_events, "f")[event].forEach(listener => {
            listener.call(this, details);
        });
        return this;
    }
    on(event, callback) {
        if (!(callback instanceof Function)) {
            throw new Error('not a Function instance');
        }
        if (__classPrivateFieldGet(this, _Dispatcher_events, "f")[event] === undefined) {
            __classPrivateFieldGet(this, _Dispatcher_events, "f")[event] = [];
        }
        __classPrivateFieldGet(this, _Dispatcher_events, "f")[event].push(callback);
        return this;
    }
    off(event, callback) {
        if (__classPrivateFieldGet(this, _Dispatcher_events, "f")[event] === undefined) {
            return this;
        }
        const offset = __classPrivateFieldGet(this, _Dispatcher_events, "f")[event].indexOf(callback);
        if (offset !== -1) {
            __classPrivateFieldGet(this, _Dispatcher_events, "f")[event].splice(offset, 1);
        }
        return this;
    }
    once(event, callback) {
        this.on(event, function (details) {
            callback.call(this, details);
            this.off(event, callback);
        });
        return this;
    }
}
_Dispatcher_events = new WeakMap();
