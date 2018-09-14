import propConfig from '../../config/props.json';

import Key from '../key';

export default class WhiteKey extends Key {
    constructor(scene, x = propConfig.keys.white.startingX, y = propConfig.keys.white.startingY) {
        super(scene, x, y, propConfig.keys.white.frame);

        this.config = propConfig.keys.white;

        this.setDepth(propConfig.keys.white.startingDepth);

        this.setCurrentRoom(this.config.startingRoom);
    }
}