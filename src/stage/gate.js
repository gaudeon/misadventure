import spriteConfig from '../config/sprites.json';

export default class Gate extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, spriteConfig.gate.frame);
    }

    preUpdate () {

    }
}
