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
var _Technology_identity, _Technology_effects;
import Assertion from '../lib/Assertion.js';
import Effects from './Effects.js';
import HasRequirementsMixin from './HasRequirementsMixin.js';
import Identity from './Identity.js';
import UpgradeableMixin from './UpgradeableMixin.js';
export default class Technology extends HasRequirementsMixin(UpgradeableMixin(Object)) {
    constructor({ identity, warehouse, dispatcher, requirements, upgrade, parameters, effects }) {
        super();
        _Technology_identity.set(this, void 0);
        _Technology_effects.set(this, void 0);
        this.upgradeableConstructor({
            warehouse,
            upgrade,
            parameters,
            level: 0
        });
        this.hasRequirementsConstructor({
            dispatcher,
            requirements
        });
        Assertion.instanceOf(identity, Identity);
        Assertion.instanceOf(effects, Effects);
        __classPrivateFieldSet(this, _Technology_identity, identity, "f");
        __classPrivateFieldSet(this, _Technology_effects, effects, "f");
    }
    get identity() {
        return __classPrivateFieldGet(this, _Technology_identity, "f");
    }
    finishUpgrading() {
        if (super.finishUpgrading()) {
            __classPrivateFieldGet(this, _Technology_effects, "f").apply();
        }
    }
    update(delta) {
        this.unlock();
        this.updateUpgradeable(delta);
    }
    backup() {
        return {
            requirements: this.backupHasRequirementsMixin(),
            upgrade: this.backupUpgradeableMixin()
        };
    }
    restore(data) {
        Assertion.object(data);
        Assertion.object(data.requirements);
        Assertion.object(data.upgrade);
        this.restoreHasRequirementsMixin(data.requirements);
        this.restoreUpgradeableMixin(data.upgrade);
    }
    reset(prestige) {
        this.resetUpgrading(prestige);
        this.resetHasRequirements(prestige);
    }
}
_Technology_identity = new WeakMap(), _Technology_effects = new WeakMap();
