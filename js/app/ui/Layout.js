import Assertion from '/js/lib/Assertion.js';
import Dispatcher from '/js/lib/Dispatcher.js';
import Warehouse from '/js/app/Warehouse.js';
import WarehouseInterface from '/js/app/ui/WarehouseInterface.js';
import GeneratorInterface from '/js/app/ui/GeneratorInterface.js';
import TechnologyInterface from '/js/app/ui/TechnologyInterface.js';
import { el } from '/js/lib/Html.js';
import PausedModal from '/js/app/ui/PausedModal.js';

export default class Layout {
    // dependencies
    #warehouse;
    #dispatcher;

    // attributes
    #ui = {};
    #interfaces = [];
    #modals = {};

    constructor({
        container,
        game,
        warehouse,
        dispatcher,
    }) {
        Assertion.instanceOf(container, Element);
        Assertion.instanceOf(warehouse, Warehouse);
        Assertion.instanceOf(dispatcher, Dispatcher);

        this.#warehouse = warehouse;
        this.#dispatcher = dispatcher;

        this.build().forEach(el => {
            container.appendChild(el);
        })

        this.#interfaces.push(new WarehouseInterface({
            container: this.#ui['warehouse-tab'],
            game: game,
            warehouse: this.#warehouse,
            dispatcher: this.#dispatcher,
        }));

        this.#modals['paused-modal'] = new PausedModal(container);
    }

    get modals() {
        return this.#modals;
    }

    addGenerator(generator) {
        this.#interfaces.push(new GeneratorInterface({
            warehouse: this.#warehouse,
            dispatcher: this.#dispatcher,
            container: this.#ui['production-tab'],
            generator,
        }));
    }

    addTechnology(technology) {
        this.#interfaces.push(new TechnologyInterface({
            warehouse: this.#warehouse,
            dispatcher: this.#dispatcher,
            container: this.#ui['technologies-tab'],
            technology,
        }));
    }

    // ----------------------------------------------------------------------------------------------------------------
    // ui definition

    build() {
        return [
            this.buildMenu(),

            el('div', { class: "tab-content" }, [
                el('div', {
                    id: "production-tab",
                    role: "tabpanel",
                    class: "tab-pane show active"
                }, div => {
                    this.#ui['production-tab'] = div
                }),

                el('div', {
                    id: "technologies-tab",
                    role: "tabpanel",
                    class: "tab-pane"
                }, div => {
                    this.#ui['technologies-tab'] = div
                }),

                el('div', {
                    id: "warehouse-tab",
                    role: "tabpanel",
                    class: "tab-pane"
                }, div => {
                    this.#ui['warehouse-tab'] = div
                }),

                el('div', {
                    id: "settings-tab",
                    role: "tabpanel",
                    class: "tab-pane"
                }, div => {
                    this.#ui['settings-tab'] = div
                }),
            ]),
        ];
    }

    buildMenu() {
        return el('div', { class: "fixed-bottom bg-white" }, [
            el('div', { class: "nav-scroller shadow-lg"}, [
                el('nav', { class: "nav nav-underline" }, [
                    el('div', {
                        class: "nav-link d-flex flex-column active",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#production-tab",
                    }, [
                        el('i', { class: "bi bi-joystick" }),
                        el('span', "Prod"),
                    ]),

                    el('div', {
                        class: "nav-link d-flex flex-column",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#technologies-tab",
                    }, [
                        el('i', { class: "bi bi-radioactive" }),
                        el('span', "Tech"),
                    ]),

                    el('div', {
                        class: "nav-link d-flex flex-column",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#warehouse-tab",
                    }, [
                        el('i', { class: "bi bi-boxes" }),
                        el('span', "Items"),
                    ]),

                    el('div', {
                        class: "nav-link d-flex flex-column",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#setting-tab",
                    }, [
                        el('i', { class: "bi bi-gear" }),
                        el('span', "Settings"),
                    ]),
                ]),
            ]),
        ]);
    }

    // ----------------------------------------------------------------------------------------------------------------
    // mainloop hooks

    draw(interp) {
        this.#interfaces.forEach(
            ui => ui.draw(interp)
        );
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    rebuild() {
        for (const ui of this.#interfaces) {
            ui.rebuild();
        }
    }
}
