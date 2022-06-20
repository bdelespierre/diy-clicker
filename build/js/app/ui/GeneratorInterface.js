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
var _GeneratorInterface_instances, _GeneratorInterface_warehouse, _GeneratorInterface_dispatcher, _GeneratorInterface_generator, _GeneratorInterface_ui, _GeneratorInterface_id;
import Assertion from '../../lib/Assertion.js';
import Dispatcher from '../../lib/Dispatcher.js';
import Generator from '../Generator.js';
import Warehouse from '../Warehouse.js';
import { card, btn, items, switcher } from './InterfaceComponents.js';
import { el, on } from '../../lib/Html.js';
export default class GeneratorInterface {
    constructor({ container, warehouse, dispatcher, generator }) {
        _GeneratorInterface_instances.add(this);
        _GeneratorInterface_warehouse.set(this, void 0);
        _GeneratorInterface_dispatcher.set(this, void 0);
        _GeneratorInterface_generator.set(this, void 0);
        _GeneratorInterface_ui.set(this, {});
        Assertion.instanceOf(warehouse, Warehouse);
        Assertion.instanceOf(dispatcher, Dispatcher);
        Assertion.instanceOf(generator, Generator);
        __classPrivateFieldSet(this, _GeneratorInterface_warehouse, warehouse, "f");
        __classPrivateFieldSet(this, _GeneratorInterface_dispatcher, dispatcher, "f");
        __classPrivateFieldSet(this, _GeneratorInterface_generator, generator, "f");
        container.appendChild(this.build());
        __classPrivateFieldGet(this, _GeneratorInterface_dispatcher, "f").on('unlocked', obj => {
            if (obj === __classPrivateFieldGet(this, _GeneratorInterface_generator, "f")) {
                __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").card.style.display = 'block';
            }
        });
    }
    build() {
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").card = card({
            title: __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").identity.label,
            style: 'display: none'
        }, [
            el('div', { class: 'd-flex' }, [
                el('div', { class: 'pe-2 flex-grow-1' }, [
                    el('span', 'Level '),
                    __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").level = el('span', '1'),
                    __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").progress = el('progress', { value: 0, max: 1, class: 'd-block w-100' })
                ]),
                el('div', { class: 'btn-group' }, [
                    __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['produce-button'] = btn({
                        type: 'primary',
                        icon: 'play-fill',
                        label: 'Produce',
                        on: { click: this.onProduceClick.bind(this) }
                    }),
                    __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['upgrade-button'] = btn({
                        icon: 'plus-lg',
                        label: 'Upgrade',
                        on: { click: this.onUpgradeClick.bind(this) }
                    }),
                    __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['parameters-button'] = btn({
                        icon: 'gear',
                        label: 'Parameters',
                        on: { click: this.onParametersClick.bind(this) }
                    })
                ])
            ]),
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").parameters = el('div', { class: 'd-none list-group list-group-flush' }, [
                items(__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").consumption, {
                    label: 'Consumption',
                    class: 'bg-transparent',
                    addCounter: (el, id) => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`consumption-${id}`] = el; },
                    addMeter: (el, id) => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`meter-consumption-${id}`] = el; }
                }),
                items(__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").production, {
                    label: 'Production',
                    class: 'bg-transparent',
                    meter: false,
                    addCounter: (el, id) => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`production-${id}`] = el; },
                    addMeter: (el, id) => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`meter-production-${id}`] = el; }
                }),
                items(__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").upgradeCosts, {
                    label: 'Upgrade Costs',
                    class: 'bg-transparent',
                    addCounter: (el, id) => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`upgrade-costs-${id}`] = el; },
                    addMeter: (el, id) => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`meter-upgrade-costs-${id}`] = el; }
                }),
                el('div', { class: 'px-0 list-group-item bg-transparent' }, [
                    el('div', { class: 'd-flex' }, [
                        el('div', { class: 'flex-grow-1' }, 'Speed'),
                        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['speed-span'] = el('div', { class: 'text-right' }, '100%')
                    ]),
                    el('input', {
                        type: 'range',
                        class: 'd-block w-100 mb-2',
                        min: 0,
                        max: 1,
                        step: 0.01
                    }, input => {
                        on(input, 'change', this.onSpeedChange.bind(this));
                        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['speed-input'] = input;
                    }),
                    switcher({
                        id: __classPrivateFieldGet(this, _GeneratorInterface_instances, "m", _GeneratorInterface_id).call(this, 'auto-produce-checkbox'),
                        label: 'Auto produce',
                        on: { change: this.onAutoProduceChange.bind(this) },
                        addCheckbox: checkbox => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-produce-checkbox'] = checkbox; }
                    }),
                    switcher({
                        id: __classPrivateFieldGet(this, _GeneratorInterface_instances, "m", _GeneratorInterface_id).call(this, 'auto-upgrade-checkbox'),
                        label: 'Auto upgrade',
                        on: { change: this.onAutoUpgradeChange.bind(this) },
                        addCheckbox: checkbox => { __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-upgrade-checkbox'] = checkbox; }
                    })
                ])
            ])
        ]);
        return __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").card;
    }
    onProduceClick() {
        __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").startProducing();
    }
    onUpgradeClick() {
        __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").startUpgrading();
    }
    onParametersClick() {
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").parameters.classList.toggle('d-none');
    }
    onAutoProduceChange() {
        __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoProduce = __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-produce-checkbox'].checked;
    }
    onAutoUpgradeChange() {
        __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoUpgrade = __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-upgrade-checkbox'].checked;
    }
    onSpeedChange() {
        __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").speed = parseFloat(__classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['speed-input'].value);
    }
    draw(interp) {
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").level.innerHTML = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").level;
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").progress.value = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").productionProgress;
        for (const obj of __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").consumption) {
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`consumption-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2);
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`meter-consumption-${obj.item.identity.id}`].value = Math.min(1, __classPrivateFieldGet(this, _GeneratorInterface_warehouse, "f").count(obj.item) / obj.qt);
        }
        for (const obj of __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").production) {
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`production-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2);
        }
        for (const obj of __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").upgradeCosts) {
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`upgrade-costs-${obj.item.identity.id}`].innerHTML = obj.qt.toExponential(2);
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")[`meter-upgrade-costs-${obj.item.identity.id}`].value = Math.min(1, __classPrivateFieldGet(this, _GeneratorInterface_warehouse, "f").count(obj.item) / obj.qt);
        }
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['produce-button'].disabled = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoProduce ||
            this.producing ||
            !__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").canProduce;
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['upgrade-button'].disabled = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoUpgrade ||
            this.upgrading ||
            !__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").canUpgrade;
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-produce-checkbox'].checked = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoProduce;
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-upgrade-checkbox'].checked = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoUpgrade;
        el(__classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['speed-span'], Math.round(__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").speed * 100) + '%');
    }
    rebuild() {
        if (__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").unlocked) {
            __classPrivateFieldGet(this, _GeneratorInterface_ui, "f").card.style.display = 'block';
        }
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-produce-checkbox'].checked = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoProduce;
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['auto-upgrade-checkbox'].checked = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").autoUpgrade;
        __classPrivateFieldGet(this, _GeneratorInterface_ui, "f")['speed-input'].value = __classPrivateFieldGet(this, _GeneratorInterface_generator, "f").speed;
    }
}
_GeneratorInterface_warehouse = new WeakMap(), _GeneratorInterface_dispatcher = new WeakMap(), _GeneratorInterface_generator = new WeakMap(), _GeneratorInterface_ui = new WeakMap(), _GeneratorInterface_instances = new WeakSet(), _GeneratorInterface_id = function _GeneratorInterface_id(id) {
    return `${__classPrivateFieldGet(this, _GeneratorInterface_generator, "f").identity.id}_${id}`;
};
