import ClickerGame from './app/ClickerGame.js'
import RunningState from './app/states/RunningState.js'
import PausedState from './app/states/PausedState.js'

// useful for debugging
window.addEventListener('error', event => window.MainLoop.stop())

const game = new ClickerGame({
  container: document.getElementById('game')
})

game.load({
  items: '/items.json',
  generators: '/generators.json',
  technologies: '/technologies.json'
}).then(game => {
  const state = new RunningState(game)

  game.stage().setState(state).run()

  // if a previous backup exists, restore game
  const backup = window.localStorage.getItem('clicker-game-backup')

  if (backup !== undefined) {
    game.restore(JSON.parse(backup))
  }

  // save game every 5s
  state.interval(5000, () => {
    const backup = game.backup()

    window.localStorage.setItem(
      'clicker-game-backup', JSON.stringify(backup)
    )
  })
})

// for debugging
window.game = game

// pause the game when current tab looses focus
window.addEventListener('blur', event => {
  document.title = 'not focused'

  if (game.getState() instanceof RunningState) {
    game.getState().pause()

    // stop the mainloop to avoid the "catching-up" effect
    window.MainLoop.stop()
  }
}, false)

// resume game when current tab gets the focus
window.addEventListener('focus', event => {
  document.title = 'focused'

  if (game.getState() instanceof PausedState) {
    game.getState().resume()

    // resume the mainloop
    window.MainLoop.start()
  }
}, false)
