import gameConfig from '../config/game.json';

import CarryMe from '../mixins/carry-me';

export default class Key extends CarryMe(Phaser.Physics.Arcade.Image) {
    constructor (scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}