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

  // attempt restoring the last saved game
  game.backups.restore()

  // save game every 5s (if auto-save is enabled)
  state.interval(5000, () => {
    if (game.settings.autoSave) {
      game.backups.backup()
    }
  })
})

// for debugging
window.game = game

const autoPause = false

// pause the game when current tab looses focus
window.addEventListener('blur', event => {
  document.title = 'not focused'

  if (autoPause && game.getState() instanceof RunningState) {
    game.getState().pause()

    // stop the mainloop to avoid the "catching-up" effect
    window.MainLoop.stop()
  }
}, false)

// resume game when current tab gets the focus
window.addEventListener('focus', event => {
  document.title = 'focused'

  if (autoPause && game.getState() instanceof PausedState) {
    game.getState().resume()

    // resume the mainloop
    window.MainLoop.start()
  }
}, false)
