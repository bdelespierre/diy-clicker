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
var _TechnologyInterface_instances, _TechnologyInterface_warehouse, _TechnologyInterface_dispatcher, _TechnologyInterface_technology, _TechnologyInterface_ui, _TechnologyInterface_id;
import Assertion from '../../lib/Assertion.js';
import Dispatcher from '../../lib/Dispatcher.js';
import Technology from '../Technology.js';
import Warehouse from '../Warehouse.js';
import { el } from '../../lib/Html.js';
import { card, btn, items, switcher } from './InterfaceComponents.js';
export default class TechnologyInterface {
    constructor({ container, warehouse, dispatcher, technology }) {
        _TechnologyInterface_instances.add(this);
        _TechnologyInterface_warehouse.set(this, void 0);
        _TechnologyInterface_dispatcher.set(this, void 0);
        _TechnologyInterface_technology.set(this, void 0);
        _TechnologyInterface_ui.set(this, {});
        Assertion.instanceOf(warehouse, Warehouse);
        Assertion.instanceOf(dispatcher, Dispatcher);
        Assertion.instanceOf(technology, Technology);
        __classPrivateFieldSet(this, _TechnologyInterface_warehouse, warehouse, "f");
        __classPrivateFieldSet(this, _TechnologyInterface_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _TechnologyInterface_technology, technology, "f");
        container.appendChild(this.build());
        __classPrivateFieldGet(this, _TechnologyInterface_dispatcher, "f").on('unlocked', obj => {
            if (obj === __classPrivateFieldGet(this, _TechnologyInterface_technology, "f")) {
                __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").card.style.display = 'block';
            }
        });
    }
    build() {
        __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").card = card({
            title: __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").identity.label,
            style: 'display: none'
        }, [
            el('div', { class: 'd-flex' }, [
                el('div', { class: 'pe-2 flex-grow-1' }, [
                    el('span', 'Level '),
                    __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").level = el('span', '0'),
                    __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").progress = el('progress', { value: 0, max: 1, class: 'd-block w-100' })
                ]),
                el('div', { class: 'btn-group' }, [
                    __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['upgrade-button'] = btn({
                        type: 'success',
                        icon: 'plus-lg',
                        label: 'Upgrade',
                        on: { click: this.onUpgradeClick.bind(this) }
                    }),
                    __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['parameters-button'] = btn({
                        icon: 'gear',
                        label: 'Parameters',
                        on: { click: this.onParametersClick.bind(this) }
                    })
                ])
            ]),
            __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").parameters = el('div', { class: 'd-none list-group list-group-flush' }, [
                items(__classPrivateFieldGet(this, _TechnologyInterface_technology, "f").upgradeCosts, {
                    label: 'Upgrade Costs',
                    addCounter: (el, id) => { __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")[`upgrade-costs-${id}`] = el; },
                    addMeter: (el, id) => { __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")[`meter-upgrade-costs-${id}`] = el; }
                }),
                el('div', { class: 'px-0 list-group-item' }, [
                    switcher({
                        id: __classPrivateFieldGet(this, _TechnologyInterface_instances, "m", _TechnologyInterface_id).call(this, 'auto-upgrade-checkbox'),
                        label: 'Auto upgrade',
                        on: { change: this.onAutoUpgradeChange.bind(this) },
                        addCheckbox: checkbox => { __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['auto-upgrade-checkbox'] = checkbox; }
                    })
                ])
            ])
        ]);
        return __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").card;
    }
    onUpgradeClick() {
        __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").startUpgrading();
    }
    onAutoUpgradeChange() {
        __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").autoUpgrade = __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['auto-upgrade-checkbox'].checked;
    }
    onParametersClick() {
        __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").parameters.classList.toggle('d-none');
    }
    draw(interp) {
        __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").level.innerHTML = __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").level;
        __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").progress.value = __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").upgradingProgress;
        for (const obj of __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").upgradeCosts) {
            __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")[`upgrade-costs-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2);
            __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")[`meter-upgrade-costs-${obj.item.identity.id}`].value = Math.min(1, __classPrivateFieldGet(this, _TechnologyInterface_warehouse, "f").count(obj.item) / obj.qt);
        }
        el(__classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['upgrade-button'], {
            disabled: __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['auto-upgrade-checkbox'].checked || !__classPrivateFieldGet(this, _TechnologyInterface_technology, "f").canUpgrade
        });
        __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['auto-upgrade-checkbox'].checked = __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").autoUpgrade;
    }
    rebuild() {
        if (__classPrivateFieldGet(this, _TechnologyInterface_technology, "f").unlocked) {
            __classPrivateFieldGet(this, _TechnologyInterface_ui, "f").card.style.display = 'block';
        }
        __classPrivateFieldGet(this, _TechnologyInterface_ui, "f")['auto-upgrade-checkbox'].checked = __classPrivateFieldGet(this, _TechnologyInterface_technology, "f").autoUpgrade;
    }
}
_TechnologyInterface_warehouse = new WeakMap(), _TechnologyInterface_dispatcher = new WeakMap(), _TechnologyInterface_technology = new WeakMap(), _TechnologyInterface_ui = new WeakMap(), _TechnologyInterface_instances = new WeakSet(), _TechnologyInterface_id = function _TechnologyInterface_id(id) {
    return `${__classPrivateFieldGet(this, _TechnologyInterface_technology, "f").identity.id}_${id}`;
};
