import propConfig from '../../../config/props.json';

import Key from '../key';

export default class BlackKey extends Key {
    constructor(scene, x = propConfig.keys.black.startingX, y = propConfig.keys.black.startingY) {
        super(scene, x, y, propConfig.keys.black.frame);

        this.config = propConfig.keys.black;

        this.setDepth(propConfig.keys.black.startingDepth);

        this.setCurrentRoom(this.config.startingRoom);
    }
}