import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

import CarryMe from '../mixins/carry-me';

export default class Sword extends CarryMe(Phaser.Physics.Arcade.Image) {
    constructor (scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.sword.frame);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}