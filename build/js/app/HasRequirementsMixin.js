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
import Dispatcher from '../lib/Dispatcher.js';
import Requirements from './Requirements.js';
export default (superclass) => { var _dispatcher, _requirements, _initialLocked, _locked, _a; return _a = class extends superclass {
        constructor() {
            super(...arguments);
            _dispatcher.set(this, void 0);
            _requirements.set(this, void 0);
            _initialLocked.set(this, void 0);
            _locked.set(this, void 0);
        }
        hasRequirementsConstructor({ dispatcher, requirements, locked = true }) {
            Assertion.instanceOf(dispatcher, Dispatcher);
            Assertion.instanceOf(requirements, Requirements);
            Assertion.boolean(locked);
            __classPrivateFieldSet(this, _dispatcher, dispatcher, "f");
            __classPrivateFieldSet(this, _requirements, requirements, "f");
            __classPrivateFieldSet(this, _initialLocked, locked, "f");
            __classPrivateFieldSet(this, _locked, locked, "f");
        }
        get locked() {
            return __classPrivateFieldGet(this, _locked, "f");
        }
        get unlocked() {
            return !__classPrivateFieldGet(this, _locked, "f");
        }
        get requirements() {
            return __classPrivateFieldGet(this, _requirements, "f");
        }
        lock() {
            __classPrivateFieldSet(this, _locked, true, "f");
            return this;
        }
        unlock() {
            if (__classPrivateFieldGet(this, _locked, "f") && __classPrivateFieldGet(this, _requirements, "f").fulfilled) {
                __classPrivateFieldSet(this, _locked, false, "f");
                __classPrivateFieldGet(this, _dispatcher, "f").emit('unlocked', this);
            }
            return this;
        }
        backupHasRequirementsMixin() {
            return {
                locked: __classPrivateFieldGet(this, _locked, "f")
            };
        }
        restoreHasRequirementsMixin(data) {
            Assertion.object(data);
            Assertion.boolean(data.locked);
            __classPrivateFieldSet(this, _locked, data.locked, "f");
        }
        resetHasRequirements(prestige) {
            __classPrivateFieldSet(this, _locked, __classPrivateFieldGet(this, _initialLocked, "f"), "f");
        }
    },
    _dispatcher = new WeakMap(),
    _requirements = new WeakMap(),
    _initialLocked = new WeakMap(),
    _locked = new WeakMap(),
    _a; };
