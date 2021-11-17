import Assertion from '/js/lib/Assertion.js';

export default class Identity {
    #id;
    #label;
    #description;

    constructor({
        id,
        label,
        description,
    }) {
        Assertion.nonEmptyString(id);
        Assertion.nonEmptyString(label);
        Assertion.any(description, [Assertion.undefined, Assertion.nonEmptyString]);

        this.#id = id;
        this.#label = label;
        this.#description = description;
    }

    get id() {
        return this.#id;
    }

    get label() {
        return this.#label;
    }

    get description() {
        return this.#description;
    }
}
