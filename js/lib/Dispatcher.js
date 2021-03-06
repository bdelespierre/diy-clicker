export default class Dispatcher {
  #events = {};

  emit (event, details) {
    if (this.#events[event] === undefined) {
      return this
    }

    this.#events[event].forEach(listener => {
      listener.call(this, details)
    })

    return this
  }

  on (event, callback) {
    if (!(callback instanceof Function)) {
      throw new Error('not a Function instance')
    }

    if (this.#events[event] === undefined) {
      this.#events[event] = []
    }

    this.#events[event].push(callback)
    return this
  }

  off (event, callback) {
    if (this.#events[event] === undefined) {
      return this
    }

    const offset = this.#events[event].indexOf(callback)

    if (offset !== -1) {
      this.#events[event].splice(offset, 1)
    }

    return this
  }

  once (event, callback) {
    this.on(event, function (details) {
      callback.call(this, details)
      this.off(event, callback)
    })

    return this
  }
}
