import Assertion from '/js/lib/Assertion.js';
import Dispatcher from '/js/lib/Dispatcher.js';
import Warehouse from '/js/app/Warehouse.js';
import { el,on } from '/js/lib/Html.js';
import { card,num } from '/js/app/ui/InterfaceComponents.js';
import ClickerGame from '/js/app/ClickerGame.js';

export default class WarehouseInterface {
    #game;
    #warehouse;
    #dispatcher;
    #ui = {};

    #table;
    #counters;

    constructor({
        container,
        game,
        warehouse,
        dispatcher,
    }) {
        Assertion.instanceOf(game, ClickerGame);
        Assertion.instanceOf(warehouse, Warehouse);
        Assertion.instanceOf(dispatcher, Dispatcher);

        this.#game = game;
        this.#warehouse = warehouse;
        this.#dispatcher = dispatcher;

        this.#dispatcher.on('new-item', event => {
            this.onNewItem(event.item);
        });

        this.build(container);
    }

    // ----------------------------------------------------------------------------------------------------------------
    // ui definition

    build(container) {
        Assertion.instanceOf(container, Element);

        for (const [id, item] of Object.entries(this.#game.inventory)) {
            container.appendChild(
                this.buildItem(item)
            );
        }
    }

    buildItem(item) {
        return this.#ui[`card-${item.identity.id}`] = card({ style: 'display: none' }, [
            el('table', { class: 'w-100'}, [
                el('tr', [
                    el('td', el('b', item.identity.label)),
                    this.#ui[`item-count-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0),
                ]),

                el('tr', [
                    el('td', "Production/s"),
                    this.#ui[`item-production-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0),
                ]),

                el('tr', [
                    el('td', "Consumption/s"),
                    this.#ui[`item-consumption-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0),
                ]),

                el('tr', { class: 'border-top' }, [
                    el('td', "Total/s"),
                    this.#ui[`item-delta-${item.identity.id}`] = el('td', { class: 'text-end font-monospace' }, 0),
                ]),
            ]),
        ]);
    }

    // ----------------------------------------------------------------------------------------------------------------
    // event callbacks

    onNewItem(item) {
        this.#ui[`card-${item.identity.id}`].style.display = "block";
    }

    // ----------------------------------------------------------------------------------------------------------------
    // mainloop hooks

    draw(interp) {
        const production = new Map();
        const consumption = new Map();

        for (const generator of this.#game.generators) {
            if (! generator.producing && ! generator.autoProduce) {
                continue;
            }

            for (const obj of generator.production) {
                production.set(
                    obj.item,
                    (production.get(obj.item) || 0) + obj.qt * (1000 / generator.productionTime / generator.speed)
                );
            }

            for (const obj of generator.consumption) {
                consumption.set(
                    obj.item,
                    (consumption.get(obj.item) || 0) + obj.qt * (1000 / generator.productionTime / generator.speed)
                );
            }
        }

        for (const [item, qt] of this.#warehouse.entries()) {
            const prod = production.get(item) || 0;
            const cons = consumption.get(item) || 0;
            const delt = prod - cons;

            this.#ui[`item-count-${item.identity.id}`].innerHTML = num(qt);
            this.#ui[`item-production-${item.identity.id}`].innerHTML = num(prod);
            this.#ui[`item-consumption-${item.identity.id}`].innerHTML = num(cons);

            this.#ui[`item-delta-${item.identity.id}`].innerHTML = (delt > 0 ? '+' : '') + num(delt);

            (el => {
                if (delt > 0) {
                    el.classList.add('text-success')
                    el.classList.remove('text-danger')
                } else {
                    el.classList.remove('text-success')
                    el.classList.add('text-danger')
                }
            })(this.#ui[`item-delta-${item.identity.id}`]);
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    rebuild() {
        for (const [item, qt] of this.#warehouse.entries()) {
            this.onNewItem(item);
        }
    }
}
