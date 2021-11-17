import Assertion from '/js/lib/Assertion.js';
import Countdown from '/js/lib/Countdown.js';
import Game from '/js/lib/Game.js';

export default class State {
    #game;
    #countdowns = [];

    constructor(game) {
        Assertion.instanceOf(game, Game);

        this.#game = game;
    }

    get game() {
        return this.#game;
    }

    // ------------------------------------------------------------------------
    // Mainloop callbacks

    begin(timestamp, delta) {
        // noop
    }

    update(delta) {
        this.updateCountdowns(delta);
    }

    draw(interp) {
        // noop
    }

    end(fps, panic) {
        // noop
    }

    // ------------------------------------------------------------------------
    // Countdowns

    updateCountdowns(delta) {
        this.#countdowns.forEach(countdown => countdown.update(delta));
        this.#countdowns = this.#countdowns.filter(countdown => ! countdown.isOver);
    }

    after(delay, fn, reps) {
        let countdown = new Countdown(delay, fn, reps);

        this.#countdowns.push(countdown);

        return countdown;
    }

    interval(delay, fn) {
        return this.after(delay, fn, Infinity);
    }
}
