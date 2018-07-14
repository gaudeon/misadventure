import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

import GoldKey from '../props/keys/gold-key';
import WhiteKey from '../props/keys/white-key';
import BlackKey from '../props/keys/black-key';

export default class Gate extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.gate.frame);

        scene.physics.add.existing(this);
        this.setImmovable(true);

        this.isOpen = false;

        this.requiredKeys = {
            6: BlackKey,
            13: GoldKey,
            23: WhiteKey
        };
    }

    requiredKey(roomId) {
        return this.requiredKeys[roomId];
    }

    openGate(roomId, key) {
        if (this.requiredKey(roomId) && key instanceof this.requiredKey(roomId)) {
            console.log('opened');
        }
    }

    preUpdate () {

    }
}
