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
var _WarehouseInterface_game, _WarehouseInterface_warehouse, _WarehouseInterface_dispatcher, _WarehouseInterface_ui, _WarehouseInterface_table, _WarehouseInterface_counters;
import Assertion from '../../lib/Assertion.js';
import Dispatcher from '../../lib/Dispatcher.js';
import Warehouse from '../Warehouse.js';
import { el } from '../../lib/Html.js';
import { card, num } from './InterfaceComponents.js';
import ClickerGame from '../ClickerGame.js';
export default class WarehouseInterface {
    constructor({ container, game, warehouse, dispatcher }) {
        _WarehouseInterface_game.set(this, void 0);
        _WarehouseInterface_warehouse.set(this, void 0);
        _WarehouseInterface_dispatcher.set(this, void 0);
        _WarehouseInterface_ui.set(this, {});
        _WarehouseInterface_table.set(this, void 0);
        _WarehouseInterface_counters.set(this, void 0);
        Assertion.instanceOf(game, ClickerGame);
        Assertion.instanceOf(warehouse, Warehouse);
        Assertion.instanceOf(dispatcher, Dispatcher);
        __classPrivateFieldSet(this, _WarehouseInterface_game, game, "f");
        __classPrivateFieldSet(this, _WarehouseInterface_warehouse, warehouse, "f");
        __classPrivateFieldSet(this, _WarehouseInterface_dispatcher, dispatcher, "f");
        __classPrivateFieldGet(this, _WarehouseInterface_dispatcher, "f").on('new-item', event => {
            this.onNewItem(event.item);
        });
        this.build(container);
    }
    build(container) {
        Assertion.element(container);
        for (const [, item] of Object.entries(__classPrivateFieldGet(this, _WarehouseInterface_game, "f").inventory)) {
            container.appendChild(this.buildItem(item));
        }
    }
    buildItem(item) {
        __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`card-${item.identity.id}`] = card({ style: 'display: none' }, [
            el('table', { class: 'w-100' }, [
                el('tr', [
                    el('td', el('b', item.identity.label)),
                    __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-count-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0)
                ]),
                el('tr', [
                    el('td', 'Production/s'),
                    __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-production-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0)
                ]),
                el('tr', [
                    el('td', 'Consumption/s'),
                    __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-consumption-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0)
                ]),
                el('tr', { class: 'border-top' }, [
                    el('td', 'Total/s'),
                    __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-delta-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0)
                ])
            ])
        ]);
        return __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`card-${item.identity.id}`];
    }
    onNewItem(item) {
        __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`card-${item.identity.id}`].style.display = 'block';
    }
    draw(interp) {
        const production = new Map();
        const consumption = new Map();
        for (const generator of __classPrivateFieldGet(this, _WarehouseInterface_game, "f").generators) {
            if (!generator.producing && !generator.autoProduce) {
                continue;
            }
            for (const obj of generator.production) {
                production.set(obj.item, (production.get(obj.item) || 0) + obj.qt * (1000 / generator.productionTime / generator.speed));
            }
            for (const obj of generator.consumption) {
                consumption.set(obj.item, (consumption.get(obj.item) || 0) + obj.qt * (1000 / generator.productionTime / generator.speed));
            }
        }
        for (const [item, qt] of __classPrivateFieldGet(this, _WarehouseInterface_warehouse, "f").entries()) {
            const prod = production.get(item) || 0;
            const cons = consumption.get(item) || 0;
            const delt = prod - cons;
            __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-count-${item.identity.id}`].innerHTML = num(qt);
            __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-production-${item.identity.id}`].innerHTML = num(prod);
            __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-consumption-${item.identity.id}`].innerHTML = num(cons);
            __classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-delta-${item.identity.id}`].innerHTML = (delt > 0 ? '+' : '') + num(delt);
            (el => {
                if (delt > 0) {
                    el.classList.add('text-success');
                    el.classList.remove('text-danger');
                }
                else {
                    el.classList.remove('text-success');
                    el.classList.add('text-danger');
                }
            })(__classPrivateFieldGet(this, _WarehouseInterface_ui, "f")[`item-delta-${item.identity.id}`]);
        }
    }
    rebuild() {
        for (const [item] of __classPrivateFieldGet(this, _WarehouseInterface_warehouse, "f").entries()) {
            this.onNewItem(item);
        }
    }
}
_WarehouseInterface_game = new WeakMap(), _WarehouseInterface_warehouse = new WeakMap(), _WarehouseInterface_dispatcher = new WeakMap(), _WarehouseInterface_ui = new WeakMap(), _WarehouseInterface_table = new WeakMap(), _WarehouseInterface_counters = new WeakMap();
