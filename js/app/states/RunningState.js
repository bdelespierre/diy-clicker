import State from '/js/lib/State.js';
import PausedState from '/js/app/states/PausedState.js';

export default class RunningState extends State {
    constructor(game) {
        super(game);
    }

    update(delta) {
        super.update(delta);

        this.game.generators.forEach(generator => {
            generator.update(delta);
        });

        this.game.technologies.forEach(technology => {
            technology.update(delta);
        })
    }

    draw(interp) {
        this.game.layout.draw(interp);
    }

    pause() {
        this.game.setState(
            new PausedState(this.game, this)
        );
    }
}
