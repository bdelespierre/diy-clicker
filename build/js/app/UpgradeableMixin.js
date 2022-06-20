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
export default (superclass) => { var _warehouse, _upgrade, _initialLevel, _level, _upgrading, _autoUpgrade, _costBase, _growthRate, _upgradeTime, _elapsedTime, _a; return _a = class extends superclass {
        constructor() {
            super(...arguments);
            _warehouse.set(this, void 0);
            _upgrade.set(this, void 0);
            _initialLevel.set(this, void 0);
            _level.set(this, void 0);
            _upgrading.set(this, false);
            _autoUpgrade.set(this, void 0);
            _costBase.set(this, void 0);
            _growthRate.set(this, void 0);
            _upgradeTime.set(this, void 0);
            _elapsedTime.set(this, 0);
        }
        upgradeableConstructor({ warehouse, upgrade, level = 1, parameters }) {
            Assertion.instanceOf(warehouse, Warehouse);
            Assertion.instanceOf(upgrade, ItemBag);
            Assertion.positiveNumber(level, false);
            __classPrivateFieldSet(this, _warehouse, warehouse, "f");
            __classPrivateFieldSet(this, _upgrade, upgrade, "f");
            __classPrivateFieldSet(this, _initialLevel, level, "f");
            __classPrivateFieldSet(this, _level, level, "f");
            Assertion.instanceOf(parameters, Object);
            Assertion.positiveNumber(parameters.costBase);
            Assertion.positiveNumber(parameters.growthRate);
            Assertion.any(parameters.upgradeTime, [Assertion.undefined, Assertion.positiveNumber]);
            Assertion.any(parameters.autoUpgrade, [Assertion.undefined, Assertion.boolean]);
            __classPrivateFieldSet(this, _costBase, parameters.costBase, "f");
            __classPrivateFieldSet(this, _growthRate, parameters.growthRate, "f");
            __classPrivateFieldSet(this, _upgradeTime, parameters.upgradeTime || 0, "f");
            __classPrivateFieldSet(this, _autoUpgrade, parameters.autoUpgrade || false, "f");
        }
        get level() {
            return __classPrivateFieldGet(this, _level, "f");
        }
        get upgrading() {
            return __classPrivateFieldGet(this, _upgrading, "f");
        }
        get autoUpgrade() {
            return __classPrivateFieldGet(this, _autoUpgrade, "f");
        }
        set autoUpgrade(flag) {
            Assertion.boolean(flag);
            __classPrivateFieldSet(this, _autoUpgrade, flag, "f");
        }
        get costBase() {
            return __classPrivateFieldGet(this, _costBase, "f");
        }
        get growthRate() {
            return __classPrivateFieldGet(this, _growthRate, "f");
        }
        get upgradeTime() {
            return __classPrivateFieldGet(this, _upgradeTime, "f");
        }
        get elapsedTime() {
            return __classPrivateFieldGet(this, _elapsedTime, "f");
        }
        get upgradeCostFactor() {
            return __classPrivateFieldGet(this, _costBase, "f") * Math.pow(__classPrivateFieldGet(this, _growthRate, "f"), __classPrivateFieldGet(this, _level, "f"));
        }
        get upgradeCosts() {
            return __classPrivateFieldGet(this, _upgrade, "f").map((item, qt) => ({ item, qt: qt * this.upgradeCostFactor }));
        }
        get upgradingProgress() {
            return __classPrivateFieldGet(this, _elapsedTime, "f") / __classPrivateFieldGet(this, _upgradeTime, "f");
        }
        get canUpgrade() {
            return __classPrivateFieldGet(this, _upgrade, "f").every((item, qt) => __classPrivateFieldGet(this, _warehouse, "f").count(item) > (this.upgradeCostFactor * qt));
        }
        levelGte(level) {
            return __classPrivateFieldGet(this, _level, "f") >= level;
        }
        startUpgrading() {
            if (this.locked || __classPrivateFieldGet(this, _upgrading, "f") || !this.canUpgrade) {
                return this;
            }
            for (const [item, qt] of __classPrivateFieldGet(this, _upgrade, "f").entries()) {
                __classPrivateFieldGet(this, _warehouse, "f").remove(item, this.upgradeCostFactor * qt);
            }
            __classPrivateFieldSet(this, _elapsedTime, 0, "f");
            __classPrivateFieldSet(this, _upgrading, true, "f");
            return this;
        }
        finishUpgrading() {
            var _a;
            if (!__classPrivateFieldGet(this, _upgrading, "f")) {
                return false;
            }
            __classPrivateFieldSet(this, _level, (_a = __classPrivateFieldGet(this, _level, "f"), _a++, _a), "f");
            __classPrivateFieldSet(this, _upgrading, false, "f");
            __classPrivateFieldSet(this, _elapsedTime, 0, "f");
            if (__classPrivateFieldGet(this, _autoUpgrade, "f")) {
                return this.startUpgrading();
            }
            return this;
        }
        updateUpgradeable(delta) {
            if (__classPrivateFieldGet(this, _upgrading, "f")) {
                __classPrivateFieldSet(this, _elapsedTime, __classPrivateFieldGet(this, _elapsedTime, "f") + delta, "f");
            }
            if (__classPrivateFieldGet(this, _elapsedTime, "f") >= __classPrivateFieldGet(this, _upgradeTime, "f")) {
                this.finishUpgrading();
            }
            if (__classPrivateFieldGet(this, _autoUpgrade, "f")) {
                this.startUpgrading();
            }
        }
        backupUpgradeableMixin() {
            return {
                level: __classPrivateFieldGet(this, _level, "f"),
                upgrading: __classPrivateFieldGet(this, _upgrading, "f"),
                autoUpgrade: __classPrivateFieldGet(this, _autoUpgrade, "f"),
                costBase: __classPrivateFieldGet(this, _costBase, "f"),
                growthRate: __classPrivateFieldGet(this, _growthRate, "f"),
                upgradeTime: __classPrivateFieldGet(this, _upgradeTime, "f"),
                elapsedTime: __classPrivateFieldGet(this, _elapsedTime, "f")
            };
        }
        restoreUpgradeableMixin(data) {
            Assertion.object(data);
            Assertion.positiveNumber(data.level);
            Assertion.boolean(data.upgrading);
            Assertion.boolean(data.autoUpgrade);
            Assertion.positiveNumber(data.costBase, true);
            Assertion.positiveNumber(data.growthRate, true);
            Assertion.positiveNumber(data.upgradeTime);
            Assertion.positiveNumber(data.elapsedTime);
            __classPrivateFieldSet(this, _level, data.level, "f");
            __classPrivateFieldSet(this, _upgrading, data.upgrading, "f");
            __classPrivateFieldSet(this, _autoUpgrade, data.autoUpgrade, "f");
            __classPrivateFieldSet(this, _costBase, data.costBase, "f");
            __classPrivateFieldSet(this, _growthRate, data.growthRate, "f");
            __classPrivateFieldSet(this, _upgradeTime, data.upgradeTime, "f");
            __classPrivateFieldSet(this, _elapsedTime, data.elapsedTime, "f");
        }
        resetUpgrading(prestige) {
            __classPrivateFieldSet(this, _level, __classPrivateFieldGet(this, _initialLevel, "f"), "f");
            __classPrivateFieldSet(this, _upgrading, false, "f");
            __classPrivateFieldSet(this, _autoUpgrade, false, "f");
            __classPrivateFieldSet(this, _elapsedTime, 0, "f");
        }
    },
    _warehouse = new WeakMap(),
    _upgrade = new WeakMap(),
    _initialLevel = new WeakMap(),
    _level = new WeakMap(),
    _upgrading = new WeakMap(),
    _autoUpgrade = new WeakMap(),
    _costBase = new WeakMap(),
    _growthRate = new WeakMap(),
    _upgradeTime = new WeakMap(),
    _elapsedTime = new WeakMap(),
    _a; };
