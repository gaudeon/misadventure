import propConfig from '../../config/props.json';

import Key from '../key';

export default class GoldKey extends Key {
    constructor(scene, x = propConfig.keys.gold.startingX, y = propConfig.keys.gold.startingY) {
        super(scene, x, y, propConfig.keys.gold.frame);

        this.config = propConfig.keys.gold;

        this.setDepth(propConfig.keys.gold.startingDepth);

        this.setCurrentRoom(this.config.startingRoom);
    }
}