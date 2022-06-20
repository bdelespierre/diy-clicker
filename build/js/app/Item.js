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
var _Item_identity;
import Assertion from '../lib/Assertion.js';
import Identity from './Identity.js';
export default class Item {
    constructor({ identity }) {
        _Item_identity.set(this, void 0);
        Assertion.instanceOf(identity, Identity);
        __classPrivateFieldSet(this, _Item_identity, identity, "f");
    }
    get identity() {
        return __classPrivateFieldGet(this, _Item_identity, "f");
    }
}
_Item_identity = new WeakMap();
