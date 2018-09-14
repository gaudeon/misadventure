import propConfig from '../../config/props.json';

import Gate from '../gate';

import BlackKey from '../keys/black-key';

export default class BlackGate extends Gate {
    constructor(scene, x = propConfig.gates.black.startingX, y = propConfig.gates.black.startingY) {
        super(scene, x, y, propConfig.gates.black.frame);

        this.config = propConfig.gates.black;

        this.setDepth(propConfig.gates.black.startingDepth);

        this.requiredKey = BlackKey;

        this.setCurrentRoom(this.config.startingRoom);
    }
}