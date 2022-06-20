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
var _PrestigeInterface_ui, _PrestigeInterface_prestige;
import Assertion from '../../lib/Assertion.js';
import Prestige from '../Prestige.js';
import { card } from './InterfaceComponents.js';
import { el, on } from '../../lib/Html.js';
export default class PrestigeInterface {
    constructor({ container, prestige }) {
        _PrestigeInterface_ui.set(this, {});
        _PrestigeInterface_prestige.set(this, void 0);
        Assertion.element(container);
        Assertion.instanceOf(prestige, Prestige);
        __classPrivateFieldSet(this, _PrestigeInterface_prestige, prestige, "f");
        this.build(container);
    }
    build(container) {
        __classPrivateFieldGet(this, _PrestigeInterface_ui, "f").card = card({}, [
            el('div', { class: 'text-center' }, [
                el('p', { class: 'mt-5' }, 'Prestige lets you start over with an increased production multiplier.'),
                el('button', { class: 'btn btn-primary btn-lg my-5' }, [
                    el('i', { class: 'bi bi-gem me-2' }),
                    el('span', 'Prestige '),
                    el('span', __classPrivateFieldGet(this, _PrestigeInterface_prestige, "f").level + 1, span => { __classPrivateFieldGet(this, _PrestigeInterface_ui, "f").prestigeLevelSpan = span; })
                ], btn => {
                    __classPrivateFieldGet(this, _PrestigeInterface_ui, "f").prestigeButton = btn;
                    on(btn, 'click', this.onPrestigeBtnClick.bind(this));
                })
            ])
        ]);
        container.appendChild(__classPrivateFieldGet(this, _PrestigeInterface_ui, "f").card);
    }
    onPrestigeBtnClick() {
        if (__classPrivateFieldGet(this, _PrestigeInterface_prestige, "f").unlocked) {
            __classPrivateFieldGet(this, _PrestigeInterface_prestige, "f").prestige();
        }
    }
    draw(interp) {
        __classPrivateFieldGet(this, _PrestigeInterface_ui, "f").prestigeButton.disabled = __classPrivateFieldGet(this, _PrestigeInterface_prestige, "f").locked;
        __classPrivateFieldGet(this, _PrestigeInterface_ui, "f").prestigeLevelSpan.innerHTML = __classPrivateFieldGet(this, _PrestigeInterface_prestige, "f").level + 1;
    }
    rebuild() {
    }
}
_PrestigeInterface_ui = new WeakMap(), _PrestigeInterface_prestige = new WeakMap();
