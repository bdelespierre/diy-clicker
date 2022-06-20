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
var _Layout_warehouse, _Layout_dispatcher, _Layout_ui, _Layout_interfaces, _Layout_modals;
import Assertion from '../../lib/Assertion.js';
import Dispatcher from '../../lib/Dispatcher.js';
import GeneratorInterface from './GeneratorInterface.js';
import PausedModal from './PausedModal.js';
import PrestigeInterface from './PrestigeInterface.js';
import SettingsInterface from './SettingsInterface.js';
import TechnologyInterface from './TechnologyInterface.js';
import Warehouse from '../Warehouse.js';
import WarehouseInterface from './WarehouseInterface.js';
import { el } from '../../lib/Html.js';
export default class Layout {
    constructor({ container, game, warehouse, dispatcher }) {
        _Layout_warehouse.set(this, void 0);
        _Layout_dispatcher.set(this, void 0);
        _Layout_ui.set(this, {});
        _Layout_interfaces.set(this, []);
        _Layout_modals.set(this, {});
        Assertion.instanceOf(container, Element);
        Assertion.instanceOf(warehouse, Warehouse);
        Assertion.instanceOf(dispatcher, Dispatcher);
        __classPrivateFieldSet(this, _Layout_warehouse, warehouse, "f");
        __classPrivateFieldSet(this, _Layout_dispatcher, dispatcher, "f");
        this.build().forEach(el => {
            container.appendChild(el);
        });
        __classPrivateFieldGet(this, _Layout_interfaces, "f").push(new PrestigeInterface({
            container: __classPrivateFieldGet(this, _Layout_ui, "f")['prestige-tab'],
            prestige: game.prestige
        }));
        __classPrivateFieldGet(this, _Layout_interfaces, "f").push(new WarehouseInterface({
            container: __classPrivateFieldGet(this, _Layout_ui, "f")['warehouse-tab'],
            game: game,
            warehouse: __classPrivateFieldGet(this, _Layout_warehouse, "f"),
            dispatcher: __classPrivateFieldGet(this, _Layout_dispatcher, "f")
        }));
        __classPrivateFieldGet(this, _Layout_interfaces, "f").push(new SettingsInterface({
            container: __classPrivateFieldGet(this, _Layout_ui, "f")['settings-tab'],
            game: game
        }));
        __classPrivateFieldGet(this, _Layout_modals, "f")['paused-modal'] = new PausedModal(container);
    }
    get modals() {
        return __classPrivateFieldGet(this, _Layout_modals, "f");
    }
    addGenerator(generator) {
        __classPrivateFieldGet(this, _Layout_interfaces, "f").push(new GeneratorInterface({
            warehouse: __classPrivateFieldGet(this, _Layout_warehouse, "f"),
            dispatcher: __classPrivateFieldGet(this, _Layout_dispatcher, "f"),
            container: __classPrivateFieldGet(this, _Layout_ui, "f")['production-tab'],
            generator
        }));
    }
    addTechnology(technology) {
        __classPrivateFieldGet(this, _Layout_interfaces, "f").push(new TechnologyInterface({
            warehouse: __classPrivateFieldGet(this, _Layout_warehouse, "f"),
            dispatcher: __classPrivateFieldGet(this, _Layout_dispatcher, "f"),
            container: __classPrivateFieldGet(this, _Layout_ui, "f")['technologies-tab'],
            technology
        }));
    }
    build() {
        return [
            this.buildMenu(),
            el('div', { class: 'tab-content' }, [
                el('div', {
                    id: 'production-tab',
                    role: 'tabpanel',
                    class: 'tab-pane show active'
                }, div => {
                    __classPrivateFieldGet(this, _Layout_ui, "f")['production-tab'] = div;
                }),
                el('div', {
                    id: 'technologies-tab',
                    role: 'tabpanel',
                    class: 'tab-pane'
                }, div => {
                    __classPrivateFieldGet(this, _Layout_ui, "f")['technologies-tab'] = div;
                }),
                el('div', {
                    id: 'prestige-tab',
                    role: 'tabpanel',
                    class: 'tab-pane'
                }, div => {
                    __classPrivateFieldGet(this, _Layout_ui, "f")['prestige-tab'] = div;
                }),
                el('div', {
                    id: 'warehouse-tab',
                    role: 'tabpanel',
                    class: 'tab-pane'
                }, div => {
                    __classPrivateFieldGet(this, _Layout_ui, "f")['warehouse-tab'] = div;
                }),
                el('div', {
                    id: 'settings-tab',
                    role: 'tabpanel',
                    class: 'tab-pane'
                }, div => {
                    __classPrivateFieldGet(this, _Layout_ui, "f")['settings-tab'] = div;
                })
            ])
        ];
    }
    buildMenu() {
        return el('div', { class: 'fixed-bottom bg-white' }, [
            el('div', { class: 'nav-scroller shadow-lg' }, [
                el('nav', { class: 'nav nav-underline' }, [
                    el('div', {
                        class: 'nav-link d-flex flex-column active',
                        'data-bs-toggle': 'tab',
                        'data-bs-target': '#production-tab'
                    }, [
                        el('i', { class: 'bi bi-joystick' }),
                        el('span', 'Prod')
                    ]),
                    el('div', {
                        class: 'nav-link d-flex flex-column',
                        'data-bs-toggle': 'tab',
                        'data-bs-target': '#technologies-tab'
                    }, [
                        el('i', { class: 'bi bi-radioactive' }),
                        el('span', 'Tech')
                    ]),
                    el('div', {
                        class: 'nav-link d-flex flex-column',
                        'data-bs-toggle': 'tab',
                        'data-bs-target': '#prestige-tab'
                    }, [
                        el('i', { class: 'bi bi-gem' }),
                        el('span', 'Prestige')
                    ]),
                    el('div', {
                        class: 'nav-link d-flex flex-column',
                        'data-bs-toggle': 'tab',
                        'data-bs-target': '#warehouse-tab'
                    }, [
                        el('i', { class: 'bi bi-boxes' }),
                        el('span', 'Items')
                    ]),
                    el('div', {
                        class: 'nav-link d-flex flex-column',
                        'data-bs-toggle': 'tab',
                        'data-bs-target': '#settings-tab'
                    }, [
                        el('i', { class: 'bi bi-gear' }),
                        el('span', 'Settings')
                    ])
                ])
            ])
        ]);
    }
    draw(interp) {
        __classPrivateFieldGet(this, _Layout_interfaces, "f").forEach(ui => ui.draw(interp));
    }
    rebuild() {
        for (const ui of __classPrivateFieldGet(this, _Layout_interfaces, "f")) {
            ui.rebuild();
        }
    }
}
_Layout_warehouse = new WeakMap(), _Layout_dispatcher = new WeakMap(), _Layout_ui = new WeakMap(), _Layout_interfaces = new WeakMap(), _Layout_modals = new WeakMap();
