import propConfig from '../../../config/props.json';

import Gate from '../gate';

import GoldKey from '../keys/gold-key';

export default class GoldGate extends Gate {
    constructor(scene, x = propConfig.gates.gold.startingX, y = propConfig.gates.gold.startingY) {
        super(scene, x, y, propConfig.gates.gold.frame);

        this.config = propConfig.gates.gold;

        this.setDepth(propConfig.gates.gold.startingDepth);

        this.requiredKey = GoldKey;

        this.setCurrentRoom(this.config.startingRoom);
    }
}