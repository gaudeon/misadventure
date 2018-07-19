import propConfig from '../../config/props.json';

import Gate from '../gate';

import WhiteKey from '../keys/white-key';

export default class WhiteGate extends Gate {
    constructor(scene, x = propConfig.gates.white.startingX, y = propConfig.gates.white.startingY) {
        super(scene, x, y, propConfig.gates.white.frame);

        this.config = propConfig.gates.white;

        this.requiredKey = WhiteKey;

        this.setCurrentRoom(this.config.startingRoom);
    }
}