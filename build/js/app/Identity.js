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
var _Identity_id, _Identity_label, _Identity_description;
import Assertion from '../lib/Assertion.js';
export default class Identity {
    constructor({ id, label, description }) {
        _Identity_id.set(this, void 0);
        _Identity_label.set(this, void 0);
        _Identity_description.set(this, void 0);
        Assertion.nonEmptyString(id);
        Assertion.nonEmptyString(label);
        Assertion.any(description, [Assertion.undefined, Assertion.nonEmptyString]);
        __classPrivateFieldSet(this, _Identity_id, id, "f");
        __classPrivateFieldSet(this, _Identity_label, label, "f");
        __classPrivateFieldSet(this, _Identity_description, description, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Identity_id, "f");
    }
    get label() {
        return __classPrivateFieldGet(this, _Identity_label, "f");
    }
    get description() {
        return __classPrivateFieldGet(this, _Identity_description, "f");
    }
}
_Identity_id = new WeakMap(), _Identity_label = new WeakMap(), _Identity_description = new WeakMap();
