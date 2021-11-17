import Config from '/js/lib/Config.js';
import Dispatcher from '/js/lib/Dispatcher.js';
import Keyboard from '/js/lib/Keyboard.js';
import State from '/js/lib/State.js';

export default class Game {
    constructor({
        config = new Config(),
        dispatcher = new Dispatcher(),
        keyboard = new Keyboard(),
        state,
    } = {}) {
        this.setConfig(config)
            .setDispatcher(dispatcher)
            .setKeyboard(keyboard)
            .setState(state || new State(this));
    }

    run() {
        // setup the mainloop
        MainLoop.setBegin(this.begin.bind(this))
            .setUpdate(this.update.bind(this))
            .setDraw(this.draw.bind(this))
            .setEnd(this.end.bind(this))
            .start();

        return this;
    }

    // ------------------------------------------------------------------------
    // Mainloop callbacks

    begin(timestamp, delta) {
        this.getState().begin(timestamp, delta);
    }

    update(delta) {
        this.getState().update(delta);
    }

    draw(interp) {
        this.getState().draw(interp);
    }

    end(fps, panic) {
        this.getState().end(fps, panic);
    }

    // ------------------------------------------------------------------------
    // Config

    #config;

    setConfig(config) {
        if (! (config instanceof Config)) {
            throw "not a Config instance";
        }

        this.#config = config;
        return this;
    }

    getConfig() {
        return this.#config;
    }

    // ------------------------------------------------------------------------
    // Dispatcher

    #dispatcher;

    setDispatcher(dispatcher) {
        if (! (dispatcher instanceof Dispatcher)) {
            throw "not a Dispatcher instance";
        }

        this.#dispatcher = dispatcher;
        return this;
    }

    getDispatcher() {
        return this.#dispatcher;
    }

    // ------------------------------------------------------------------------
    // Keyboard

    #keyboard;

    setKeyboard(keyboard) {
        if (! (keyboard instanceof Keyboard)) {
            throw "not an Keyboard instance";
        }

        this.#keyboard = keyboard;
        return this;
    }

    getKeyboard() {
        return this.#keyboard;
    }

    // ------------------------------------------------------------------------
    // State

    #state;

    setState(state) {
        if (! (state instanceof State)) {
            throw "not a State instance";
        }

        this.#state = state;
        return this;
    }

    getState() {
        return this.#state;
    }
}
