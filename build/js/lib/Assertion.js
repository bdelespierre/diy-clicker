var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Assertion_shouldTrace;
export class AssertionError {
    constructor(obj, message) {
        this.obj = obj;
        this.message = message;
    }
    toString() {
        return this.message;
    }
}
export default class Assertion {
    static any(obj, assertions, message) {
        const trace = __classPrivateFieldGet(this, _a, "f", _Assertion_shouldTrace);
        __classPrivateFieldSet(this, _a, false, "f", _Assertion_shouldTrace);
        const errors = assertions.map(assertion => {
            try {
                return assertion.call(this, obj);
            }
            catch (error) {
                return error;
            }
        }).filter(error => error !== undefined);
        __classPrivateFieldSet(this, _a, trace, "f", _Assertion_shouldTrace);
        if (errors.length === assertions.length) {
            this.throwError(obj, message || errors.map(err => err.message).join(' and '));
        }
    }
    static array(obj, message) {
        if (!(obj instanceof Array)) {
            this.throwError(obj, message || 'not an array');
        }
    }
    static boolean(obj, message) {
        if (typeof obj !== 'boolean') {
            this.throwError(obj, message || 'not a boolean');
        }
    }
    static element(obj, message) {
        if (!(obj instanceof Element)) {
            this.throwError(obj, message || 'not an element');
        }
    }
    static equals(obj, value, strict = false, message) {
        if (strict ? (obj !== value) : (obj !== value)) {
            this.throwError(obj, message || `Not equals to ${value}`);
        }
    }
    static function(obj, message) {
        if (typeof obj !== 'function') {
            this.throwError(obj, message || 'not a function');
        }
    }
    static greaterThan(obj, value, strict = false, message) {
        this.number(obj);
        if (strict ? obj <= value : obj < value) {
            this.throwError(obj, message || `value is not greater than ${value}`);
        }
    }
    static greaterThanOrEqual(obj, value, message) {
        this.greaterThan(obj, value, false, message || `value is not greater than or equal to ${value}`);
    }
    static hasOwnProperties(obj, props, message) {
        this.instanceOf(obj, Object);
        for (const prop of props) {
            if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                this.throwError(obj, message || `object doesn't have property ${prop}`);
            }
        }
    }
    static throwError(obj, reason) {
        if (__classPrivateFieldGet(this, _a, "f", _Assertion_shouldTrace)) {
            console.trace();
        }
        throw new AssertionError(obj, reason);
    }
    static instanceOf(obj, type, message) {
        if (!(obj instanceof type)) {
            this.throwError(obj, message || `not an instance of ${type}`);
        }
    }
    static nonEmptyString(obj, message) {
        this.string(obj, message);
        if (!obj || obj.length === 0) {
            this.throwError(obj, message || 'empty string');
        }
    }
    static number(obj, message) {
        if (typeof obj !== 'number') {
            this.throwError(obj, message || 'not a number');
        }
        if (isNaN(obj)) {
            this.throwError(obj, message || 'not a number (NaN)');
        }
    }
    static object(obj, message) {
        this.instanceOf(obj, Object, message);
    }
    static positiveNumber(obj, strict = false, message) {
        this.greaterThan(obj, 0, strict, message || 'not a positive number');
    }
    static string(obj, message) {
        if (typeof obj !== 'string' && !(obj instanceof String)) {
            this.throwError(obj, message || 'not a string');
        }
    }
    static undefined(obj, message) {
        if (typeof obj !== 'undefined') {
            this.throwError(obj, message || 'not undefined');
        }
    }
}
_a = Assertion;
_Assertion_shouldTrace = { value: true };
