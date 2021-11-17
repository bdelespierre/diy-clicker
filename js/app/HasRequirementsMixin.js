import Assertion from '/js/lib/Assertion.js';
import Dispatcher from '/js/lib/Dispatcher.js';
import Requirements from '/js/app/Requirements.js';

export default (superclass) => class extends superclass {
    // dependencies
    #dispatcher;
    #requirements;

    // attributes
    #locked;

    hasRequirementsConstructor({
        dispatcher,
        requirements,
        locked = true,
    }) {
        Assertion.instanceOf(dispatcher, Dispatcher);
        Assertion.instanceOf(requirements, Requirements);
        Assertion.boolean(locked);

        this.#dispatcher = dispatcher;
        this.#requirements = requirements;
        this.#locked = locked;
    }

    get locked() {
        return this.#locked;
    }

    get unlocked() {
        return ! this.#locked;
    }

    unlock() {
        if (this.#locked && this.#requirements.fulfilled) {
            this.#locked = false;
            this.#dispatcher.emit('unlocked', this);
        }

        return this;
    }

    // ----------------------------------------------------------------------------------------------------------------
    // backup & restore

    backupHasRequirementsMixin() {
        return {
            locked: this.#locked,
        };
    }

    restoreHasRequirementsMixin(data) {
        Assertion.object(data);
        Assertion.boolean(data.locked);

        this.#locked = data.locked;
    }
}
