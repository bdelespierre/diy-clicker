import Assertion from '/js/lib/Assertion.js';
import Identity from '/js/app/Identity.js';

export default class Item {
    #identity;

    constructor({
        identity
    }) {
        Assertion.instanceOf(identity, Identity);

        this.#identity = identity;
    }

    get identity() {
        return this.#identity;
    }
}
