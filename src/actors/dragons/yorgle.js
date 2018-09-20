import actorConfig from '../../config/actors.json';

import Dragon from '../dragon';

export default class Yorgle extends Dragon {
    constructor(scene, x = actorConfig.yorgle.startingX, y = actorConfig.yorgle.startingY) {
        super(scene, x, y, actorConfig.yorgle.frame);

        this.config = actorConfig.yorgle;

        this.setCurrentRoom(this.config.startingRoom);
    }
}