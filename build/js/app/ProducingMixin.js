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
import Assertion from '../lib/Assertion.js';
import Warehouse from './Warehouse.js';
import ItemBag from './ItemBag.js';
export default (superclass) => { var _warehouse, _input, _output, _producing, _autoProduce, _multiplier, _productionTime, _elapsedTime, _a; return _a = class extends superclass {
        constructor() {
            super(...arguments);
            _warehouse.set(this, void 0);
            _input.set(this, void 0);
            _output.set(this, void 0);
            _producing.set(this, false);
            _autoProduce.set(this, false);
            _multiplier.set(this, void 0);
            _productionTime.set(this, void 0);
            _elapsedTime.set(this, 0);
        }
        producingConstructor({ warehouse, input, output, parameters }) {
            Assertion.instanceOf(warehouse, Warehouse);
            Assertion.instanceOf(input, ItemBag);
            Assertion.instanceOf(output, ItemBag);
            __classPrivateFieldSet(this, _warehouse, warehouse, "f");
            __classPrivateFieldSet(this, _input, input, "f");
            __classPrivateFieldSet(this, _output, output, "f");
            Assertion.instanceOf(parameters, Object);
            Assertion.any(parameters.multiplier, [Assertion.undefined, Assertion.positiveNumber]);
            Assertion.positiveNumber(parameters.productionTime);
            Assertion.any(parameters.autoProduce, [Assertion.undefined, Assertion.boolean]);
            __classPrivateFieldSet(this, _multiplier, parameters.multiplier || 1, "f");
            __classPrivateFieldSet(this, _productionTime, parameters.productionTime, "f");
            __classPrivateFieldSet(this, _autoProduce, parameters.autoProduce || false, "f");
        }
        get producing() {
            return __classPrivateFieldGet(this, _producing, "f");
        }
        get autoProduce() {
            return __classPrivateFieldGet(this, _autoProduce, "f");
        }
        set autoProduce(flag) {
            Assertion.boolean(flag);
            __classPrivateFieldSet(this, _autoProduce, flag, "f");
        }
        get multiplier() {
            return __classPrivateFieldGet(this, _multiplier, "f");
        }
        get productionTime() {
            return __classPrivateFieldGet(this, _productionTime, "f");
        }
        get elapsedTime() {
            return __classPrivateFieldGet(this, _elapsedTime, "f");
        }
        get consumption() {
            return __classPrivateFieldGet(this, _input, "f").map((item, qt) => ({ item, qt: qt * (this.level || 1) }));
        }
        get production() {
            return __classPrivateFieldGet(this, _output, "f").map((item, qt) => ({ item, qt: qt * this.productionFactor }));
        }
        get productionFactor() {
            return (this.level || 1) * __classPrivateFieldGet(this, _multiplier, "f");
        }
        get productionProgress() {
            return __classPrivateFieldGet(this, _elapsedTime, "f") / __classPrivateFieldGet(this, _productionTime, "f");
        }
        get canProduce() {
            return __classPrivateFieldGet(this, _input, "f").every((item, qt) => __classPrivateFieldGet(this, _warehouse, "f").count(item) > qt * (this.level || 1));
        }
        incProductionMultiplier(amount = 1) {
            Assertion.positiveNumber(amount);
            __classPrivateFieldSet(this, _multiplier, __classPrivateFieldGet(this, _multiplier, "f") + amount, "f");
            return this;
        }
        startProducing() {
            if (this.locked || __classPrivateFieldGet(this, _producing, "f") || !this.canProduce) {
                return this;
            }
            for (const [item, qt] of __classPrivateFieldGet(this, _input, "f").entries()) {
                __classPrivateFieldGet(this, _warehouse, "f").remove(item, qt * (this.level || 1));
            }
            __classPrivateFieldSet(this, _elapsedTime, 0, "f");
            __classPrivateFieldSet(this, _producing, true, "f");
            if (!__classPrivateFieldGet(this, _productionTime, "f")) {
                return this.finishProducing();
            }
            return this;
        }
        finishProducing() {
            if (!__classPrivateFieldGet(this, _producing, "f")) {
                return false;
            }
            for (const [item, qt] of __classPrivateFieldGet(this, _output, "f").entries()) {
                __classPrivateFieldGet(this, _warehouse, "f").add(item, qt * this.productionFactor);
            }
            __classPrivateFieldSet(this, _elapsedTime, 0, "f");
            __classPrivateFieldSet(this, _producing, false, "f");
            return this;
        }
        updateProducing(delta) {
            if (!__classPrivateFieldGet(this, _producing, "f") && __classPrivateFieldGet(this, _autoProduce, "f")) {
                return this.startProducing();
            }
            if (__classPrivateFieldGet(this, _producing, "f")) {
                __classPrivateFieldSet(this, _elapsedTime, __classPrivateFieldGet(this, _elapsedTime, "f") + delta * (this.speed || 1), "f");
            }
            if (__classPrivateFieldGet(this, _elapsedTime, "f") >= __classPrivateFieldGet(this, _productionTime, "f")) {
                this.finishProducing();
            }
        }
        backupProducingMixin() {
            return {
                producing: this.producing,
                autoProduce: this.autoProduce,
                multiplier: this.multiplier,
                productionTime: this.productionTime,
                elapsedTime: this.elapsedTime
            };
        }
        restoreProducingMixin(data) {
            Assertion.object(data);
            Assertion.boolean(data.producing);
            Assertion.boolean(data.autoProduce);
            Assertion.positiveNumber(data.multiplier, true);
            Assertion.positiveNumber(data.productionTime, true);
            Assertion.positiveNumber(data.elapsedTime);
            __classPrivateFieldSet(this, _producing, data.producing, "f");
            __classPrivateFieldSet(this, _autoProduce, data.autoProduce, "f");
            __classPrivateFieldSet(this, _multiplier, data.multiplier, "f");
            __classPrivateFieldSet(this, _productionTime, data.productionTime, "f");
            __classPrivateFieldSet(this, _elapsedTime, data.elapsedTime, "f");
        }
        resetProducing(prestige) {
            __classPrivateFieldSet(this, _producing, false, "f");
            __classPrivateFieldSet(this, _autoProduce, false, "f");
            __classPrivateFieldSet(this, _multiplier, __classPrivateFieldGet(this, _multiplier, "f") * prestige.generatorMultiplierFactor, "f");
            __classPrivateFieldSet(this, _elapsedTime, 0, "f");
        }
    },
    _warehouse = new WeakMap(),
    _input = new WeakMap(),
    _output = new WeakMap(),
    _producing = new WeakMap(),
    _autoProduce = new WeakMap(),
    _multiplier = new WeakMap(),
    _productionTime = new WeakMap(),
    _elapsedTime = new WeakMap(),
    _a; };
