import ClickerGame from './app/ClickerGame.js';
import RunningState from './app/states/RunningState.js';
import PausedState from './app/states/PausedState.js';
import MainLoop from 'mainloop.js';
window.addEventListener('error', () => MainLoop.stop());
const game = new ClickerGame(MainLoop, document.getElementById('game'));
game.load({
    items: '/items.json',
    generators: '/generators.json',
    technologies: '/technologies.json',
    prestige: '/prestige.json'
}).then(game => {
    const state = new RunningState(game);
    game.stage();
    game.state = state;
    game.run();
    game.backups.restore();
    state.interval(5000, () => {
        if (game.settings.autoSave) {
            game.backups.backup();
        }
    });
});
const autoPause = false;
window.addEventListener('blur', event => {
    document.title = 'not focused';
    if (autoPause && game.state instanceof RunningState) {
        game.state.pause();
        MainLoop.stop();
    }
}, false);
window.addEventListener('focus', event => {
    document.title = 'focused';
    if (autoPause && game.state instanceof PausedState) {
        game.state.resume();
        MainLoop.start();
    }
}, false);
