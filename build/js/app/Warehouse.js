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
var _Warehouse_dispatcher;
import Assertion from '../lib/Assertion.js';
import Dispatcher from '../lib/Dispatcher.js';
import Item from './Item.js';
export default class Warehouse extends Map {
    constructor(dispatcher) {
        super();
        _Warehouse_dispatcher.set(this, void 0);
        Assertion.instanceOf(dispatcher, Dispatcher);
        __classPrivateFieldSet(this, _Warehouse_dispatcher, dispatcher, "f");
    }
    count(item) {
        Assertion.instanceOf(item, Item);
        return this.get(item) || 0;
    }
    add(item, qt) {
        Assertion.instanceOf(item, Item);
        Assertion.positiveNumber(qt);
        if (!this.has(item)) {
            this.set(item, qt);
            __classPrivateFieldGet(this, _Warehouse_dispatcher, "f").emit('new-item', { item, qt, warehouse: this });
            return;
        }
        const previousAmount = this.count(item);
        const newAmount = previousAmount + qt;
        this.set(item, newAmount);
        __classPrivateFieldGet(this, _Warehouse_dispatcher, "f").emit('item-update', { item, previousAmount, newAmount, warehouse: this });
        return this;
    }
    remove(item, qt) {
        Assertion.instanceOf(item, Item);
        Assertion.positiveNumber(qt);
        const previousAmount = this.count(item);
        const newAmount = previousAmount - qt;
        Assertion.positiveNumber(newAmount, 'Not enough items');
        this.set(item, newAmount);
        __classPrivateFieldGet(this, _Warehouse_dispatcher, "f").emit('item-update', { item, previousAmount, newAmount, warehouse: this });
        return this;
    }
    reset() {
        for (const [item] of this.entries()) {
            this.set(item, 0);
        }
    }
}
_Warehouse_dispatcher = new WeakMap();
