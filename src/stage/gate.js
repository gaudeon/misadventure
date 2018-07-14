import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

export default class Gate extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.gate.frame);
        this.isOpen = false;
    }

    preUpdate () {

    }
}
