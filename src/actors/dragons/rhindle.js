import actorConfig from '../../config/actors.json';

import Dragon from '../dragon';

export default class Rhindle extends Dragon {
    constructor(scene, x = actorConfig.rhindle.startingX, y = actorConfig.rhindle.startingY) {
        super(scene, x, y, actorConfig.rhindle.frame);

        this.config = actorConfig.rhindle;

        this.setCurrentRoom(this.config.startingRoom);
    }
}