import Assertion from '/js/lib/Assertion.js';
import State from '/js/lib/State.js';
import { el } from '/js/lib/Html.js';

export default class PausedState extends State {
    #previous;
    #ui = {};

    constructor(game, previous) {
        super(game);

        Assertion.instanceOf(previous, State);

        this.#previous = previous;
        this.game.layout.modals['paused-modal'].show();
    }

    resume() {
        this.game.layout.modals['paused-modal'].hide();
        this.game.setState(this.#previous);
    }
}
