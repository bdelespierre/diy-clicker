import ItemBag from '/js/app/ItemBag.js';
import Assertion from '/js/lib/Assertion.js';
import { el,on } from '/js/lib/Html.js';

export function num(num) {
    return Math.floor(num).toLocaleString();
}

export function card(attr, ...args) {
    Assertion.instanceOf(attr, Object);
    Assertion.any(attr.title, [Assertion.undefined, Assertion.string]);

    return el('div', Object.assign({ class: "card mt-3 shadow" }, attr), [
        el('div', { class: "card-body p-2" }, [
            attr.title ? el('h5', { class: "card-title" }, attr.title) : undefined,

            ...args
        ]),
    ]);
}

export function btn(attr) {
    Assertion.hasOwnProperties(attr, ['label']);
    Assertion.any(attr.type, [Assertion.undefined, Assertion.nonEmptyString]);
    Assertion.any(attr.on, [Assertion.undefined, Assertion.object]);

    return el(
        'button',
        { class: `btn btn-${attr.type || 'outline-secondary'}` },
        btn => {
            for (const event in (attr.on || {})) {
                on(btn, event, attr.on[event]);
            }
        }, [
            el('span', { class: "d-none spinner-grow spinner-grow-sm" }),
            attr.icon ? el('i', { class: `bi bi-${attr.icon}` }) : undefined,
            el('span', attr.label, { class: "d-none d-sm-block"}),
        ],
    );
}

export function items(items, attr) {
    Assertion.instanceOf(items, Array);
    Assertion.hasOwnProperties(attr, ['label']);
    Assertion.any(attr.meter, [Assertion.undefined, Assertion.boolean]);
    Assertion.any(attr.addCounter, [Assertion.undefined, Assertion.function]);
    Assertion.any(attr.addMeter, [Assertion.undefined, Assertion.function]);

    if (! items.length) {
        return undefined;
    }

    return el('details', { class: "px-0 list-group-item" }, [
        el('summary', attr.label),

        items.map(obj => el('div', [
            el('div', { class: "d-flex" }, [
                el('div', { class: "flex-grow-1" }, obj.item.identity.label),

                el('div', { class: "text-right" }, obj.qt.toExponential(2), counter => {
                    if (attr.addCounter) {
                        attr.addCounter(counter, obj.item.identity.id);
                    }
                }),
            ]),

            (attr.meter !== undefined ? attr.meter : true) ? el('meter', {
                min: 0,  max: 1, low: 0.33, high: 0.66,  optimum: 1,
                class: "d-block w-100"
            }, meter => {
                if (attr.addMeter) {
                    attr.addMeter(meter, obj.item.identity.id);
                }
            }) : undefined,
        ])),
    ]);
}

export function switcher(attr) {
    Assertion.object(attr);
    Assertion.string(attr.id);
    Assertion.string(attr.label);
    Assertion.any(attr.on, [Assertion.undefined, Assertion.object]);
    Assertion.any(attr.addCheckbox, [Assertion.undefined, Assertion.function]);

    return el('div', { class: "form-check form-switch" }, [
        el('input', { type: "checkbox", id: attr.id, class: "form-check-input" }, checkbox => {
            for (const event in (attr.on || {})) {
                on(checkbox, event, attr.on[event]);
            }

            if (attr.addCheckbox) {
                attr.addCheckbox(checkbox);
            }
        }),

        el('label', attr.label, {
            class: "form-check-label",
            for: attr.id
        }),
    ]);
}
