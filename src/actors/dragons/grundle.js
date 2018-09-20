import actorConfig from '../../config/actors.json';

import Dragon from '../dragon';

export default class Grundle extends Dragon {
    constructor(scene, x = actorConfig.grundle.startingX, y = actorConfig.grundle.startingY) {
        super(scene, x, y, actorConfig.grundle.frame);

        this.config = actorConfig.grundle;

        this.setCurrentRoom(this.config.startingRoom);
    }
}