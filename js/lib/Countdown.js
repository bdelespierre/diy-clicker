import Assertion from '/js/lib/Assertion.js';

export default class Countdown {
    #delay;
    #originalDelay;
    #callback;
    #reps;

    constructor(delay, fn, reps) {
        Assertion.positiveNumber(delay);
        Assertion.function(fn);
        Assertion.any(reps, [Assertion.undefined, Assertion.positiveNumber]);

        this.#delay = delay;
        this.#originalDelay = delay;
        this.#callback = fn;
        this.#reps = reps || 1;
    }

    update(delta) {
        if (this.#delay <= delta && this.#reps > 0) {
            this.#reps--;
            delta -= this.#delay;
            this.#delay = this.#originalDelay;
            this.#callback.call();
            return this.update(delta);
        }

        this.#delay = Math.max(0, this.#delay - delta);
    }

    get progress() {
        return 1 - this.#delay / this.#originalDelay;
    }

    get isOver() {
        return this.#delay <= 0 && this.#reps <= 0;
    }
}
