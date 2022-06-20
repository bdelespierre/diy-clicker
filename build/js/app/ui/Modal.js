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
var _Modal_parameters, _Modal_el, _Modal_bs;
import Assertion from '../../lib/Assertion.js';
import { el } from '../../lib/Html.js';
export default class Modal {
    constructor(container, parameters = {}) {
        _Modal_parameters.set(this, void 0);
        _Modal_el.set(this, void 0);
        _Modal_bs.set(this, void 0);
        if (this.constructor === Modal) {
            throw new TypeError("Abstract class 'Modal' cannot be instanciated directly");
        }
        Assertion.object(parameters);
        Assertion.any(parameters.showHeader, [Assertion.undefined, Assertion.boolean]);
        Assertion.any(parameters.showFooter, [Assertion.undefined, Assertion.boolean]);
        Assertion.any(parameters.modalClass, [Assertion.undefined, Assertion.string]);
        Assertion.any(parameters.dialogClass, [Assertion.undefined, Assertion.string]);
        Assertion.any(parameters.contentClass, [Assertion.undefined, Assertion.string]);
        Assertion.any(parameters.title, [Assertion.undefined, Assertion.string]);
        Assertion.any(parameters.message, [Assertion.undefined, Assertion.string]);
        Assertion.object(window.bootstrap, 'Bootstrap JS library is missing, did you forget to add it?');
        __classPrivateFieldSet(this, _Modal_parameters, parameters, "f");
        __classPrivateFieldSet(this, _Modal_el, this.build(), "f");
        Assertion.element(__classPrivateFieldGet(this, _Modal_el, "f"));
        container.appendChild(__classPrivateFieldGet(this, _Modal_el, "f"));
        __classPrivateFieldSet(this, _Modal_bs, new window.bootstrap.Modal(__classPrivateFieldGet(this, _Modal_el, "f")), "f");
    }
    get modalClass() {
        return __classPrivateFieldGet(this, _Modal_parameters, "f").modalClass || 'modal';
    }
    get dialogClass() {
        return __classPrivateFieldGet(this, _Modal_parameters, "f").dialogClass || 'modal-dialog';
    }
    get contentClass() {
        return __classPrivateFieldGet(this, _Modal_parameters, "f").contentClass || 'modal-content';
    }
    get title() {
        return __classPrivateFieldGet(this, _Modal_parameters, "f").title || 'No title';
    }
    get header() {
        return [
            el('h5', { class: 'modal-title' }, this.title),
            el('button', {
                type: 'button',
                class: 'btn-close',
                'data-bs-dismiss': 'modal'
            })
        ];
    }
    get body() {
        return el('p', __classPrivateFieldGet(this, _Modal_parameters, "f").message || 'No body');
    }
    get footer() {
        return [
            el('button', 'Close', {
                class: 'btn btn-secondary',
                'data-bs-dismiss': 'modal'
            })
        ];
    }
    build() {
        return el('div', { class: this.modalClass }, [
            el('div', { class: this.dialogClass }, [
                el('div', { class: this.contentClass }, [
                    __classPrivateFieldGet(this, _Modal_parameters, "f").showHeader
                        ? el('div', { class: 'modal-header' }, this.header)
                        : undefined,
                    el('div', { class: 'modal-body' }, this.body),
                    __classPrivateFieldGet(this, _Modal_parameters, "f").showFooter
                        ? el('div', { class: 'modal-footer' }, this.footer)
                        : undefined
                ])
            ])
        ]);
    }
    show() {
        __classPrivateFieldGet(this, _Modal_bs, "f").show();
    }
    hide() {
        __classPrivateFieldGet(this, _Modal_bs, "f").hide();
    }
}
_Modal_parameters = new WeakMap(), _Modal_el = new WeakMap(), _Modal_bs = new WeakMap();
