import Config from './Config.js';
import Dispatcher from './Dispatcher.js';
import Keyboard from './Keyboard.js';
import State from './State.js';
export default class Game {
    constructor(loop, state, config = new Config, dispatcher = new Dispatcher, keyboard = new Keyboard) {
        this.loop = loop;
        this.state = state;
        this.config = config;
        this.dispatcher = dispatcher;
        this.keyboard = keyboard;
        if (this.state == undefined) {
            this.state = new State(this);
        }
    }
    run() {
        this.loop
            .setBegin(this.begin.bind(this))
            .setUpdate(this.update.bind(this))
            .setDraw(this.draw.bind(this))
            .setEnd(this.end.bind(this))
            .start();
        return this;
    }
    begin(timestamp, delta) {
        this.state.begin(timestamp, delta);
    }
    update(delta) {
        this.state.update(delta);
    }
    draw(interp) {
        this.state.draw(interp);
    }
    end(fps, panic) {
        this.state.end(fps, panic);
    }
}
