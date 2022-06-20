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
var _ItemBag_map;
import Assertion from '../lib/Assertion.js';
import Item from './Item.js';
export default class ItemBag {
    constructor(items) {
        _ItemBag_map.set(this, void 0);
        __classPrivateFieldSet(this, _ItemBag_map, new Map(items), "f");
    }
    set(item, qt) {
        Assertion.instanceOf(item, Item);
        Assertion.positiveNumber(qt);
        __classPrivateFieldGet(this, _ItemBag_map, "f").set(item, qt);
        return this;
    }
    has(item) {
        return __classPrivateFieldGet(this, _ItemBag_map, "f").has(item);
    }
    get(item) {
        return __classPrivateFieldGet(this, _ItemBag_map, "f").get(item) || 0;
    }
    entries() {
        return __classPrivateFieldGet(this, _ItemBag_map, "f").entries();
    }
    every(fn) {
        for (const [item, qt] of this.entries()) {
            if (!fn(item, qt)) {
                return false;
            }
        }
        return true;
    }
    map(fn) {
        const result = [];
        for (const [item, qt] of this.entries()) {
            result.push(fn(item, qt));
        }
        return result;
    }
}
_ItemBag_map = new WeakMap();
