import ClickerGame from './app/ClickerGame.js'
import RunningState from './app/states/RunningState.js'
import PausedState from './app/states/PausedState.js'
import MainLoop from 'mainloop.js'

// useful for debugging
window.addEventListener('error', () => MainLoop.stop())

const game = new ClickerGame(
  MainLoop,
  document.getElementById('game')
);

game.load({
  items: '/items.json',
  generators: '/generators.json',
  technologies: '/technologies.json',
  prestige: '/prestige.json'
}).then(game => {
  const state = new RunningState(game)

  game.stage()
  game.state = state
  game.run()

  // attempt restoring the last saved game
  game.backups.restore()

  // save game every 5s (if auto-save is enabled)
  state.interval(5000, () => {
    if (game.settings.autoSave) {
      game.backups.backup()
    }
  })
})

const autoPause = false

// pause the game when current tab looses focus
window.addEventListener('blur', event => {
  document.title = 'not focused'

  if (autoPause && game.state instanceof RunningState) {
    game.state.pause()

    // stop the mainloop to avoid the "catching-up" effect
    MainLoop.stop()
  }
}, false)

// resume game when current tab gets the focus
window.addEventListener('focus', event => {
  document.title = 'focused'

  if (autoPause && game.state instanceof PausedState) {
    game.state.resume()

    // resume the mainloop
    MainLoop.start()
  }
}, false)
