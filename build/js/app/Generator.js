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
var _Generator_identity, _Generator_speed;
import Assertion from '../lib/Assertion.js';
import HasRequirementsMixin from './HasRequirementsMixin.js';
import Identity from './Identity.js';
import ProducingMixin from './ProducingMixin.js';
import UpgradeableMixin from './UpgradeableMixin.js';
export default class Generator extends HasRequirementsMixin(UpgradeableMixin(ProducingMixin(Object))) {
    constructor({ identity, warehouse, dispatcher, requirements, input, output, upgrade, parameters }) {
        super();
        _Generator_identity.set(this, void 0);
        _Generator_speed.set(this, 1);
        this.producingConstructor({
            warehouse,
            input,
            output,
            parameters
        });
        this.upgradeableConstructor({
            warehouse,
            upgrade,
            parameters
        });
        this.hasRequirementsConstructor({
            dispatcher,
            requirements
        });
        Assertion.instanceOf(identity, Identity);
        __classPrivateFieldSet(this, _Generator_identity, identity, "f");
    }
    get identity() {
        return __classPrivateFieldGet(this, _Generator_identity, "f");
    }
    get speed() {
        return __classPrivateFieldGet(this, _Generator_speed, "f");
    }
    set speed(value) {
        Assertion.positiveNumber(value);
        __classPrivateFieldSet(this, _Generator_speed, value, "f");
    }
    update(delta) {
        this.unlock();
        this.updateProducing(delta);
        this.updateUpgradeable(delta);
    }
    backup() {
        return {
            speed: __classPrivateFieldGet(this, _Generator_speed, "f"),
            requirements: this.backupHasRequirementsMixin(),
            production: this.backupProducingMixin(),
            upgrade: this.backupUpgradeableMixin()
        };
    }
    restore(data) {
        Assertion.object(data);
        Assertion.positiveNumber(data.speed);
        Assertion.object(data.requirements);
        Assertion.object(data.production);
        Assertion.object(data.upgrade);
        __classPrivateFieldSet(this, _Generator_speed, data.speed, "f");
        this.restoreHasRequirementsMixin(data.requirements);
        this.restoreProducingMixin(data.production);
        this.restoreUpgradeableMixin(data.upgrade);
    }
    reset(prestige) {
        this.resetProducing(prestige);
        this.resetUpgrading(prestige);
        this.resetHasRequirements(prestige);
    }
}
_Generator_identity = new WeakMap(), _Generator_speed = new WeakMap();
