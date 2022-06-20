import Config from './Config.js'
import Dispatcher from './Dispatcher.js'
import Keyboard from './Keyboard.js'
import State from './State.js'
import MainLoop from 'mainloop.js'

export default class Game {
  constructor (
    private loop: MainLoop,
    public state?: State,
    readonly config: Config = new Config,
    readonly dispatcher: Dispatcher = new Dispatcher,
    readonly keyboard: Keyboard = new Keyboard,
  ) {
    if (this.state == undefined) {
      this.state = new State(this)
    }
  }

  run () {
    // setup the mainloop
    this.loop
      .setBegin(this.begin.bind(this))
      .setUpdate(this.update.bind(this))
      .setDraw(this.draw.bind(this))
      .setEnd(this.end.bind(this))
      .start()

    return this
  }

  // ------------------------------------------------------------------------
  // Mainloop callbacks

  begin (timestamp, delta) {
    this.state.begin(timestamp, delta)
  }

  update (delta) {
    this.state.update(delta)
  }

  draw (interp) {
    this.state.draw(interp)
  }

  end (fps, panic) {
    this.state.end(fps, panic)
  }
}
