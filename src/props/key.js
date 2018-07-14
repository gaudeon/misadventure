import gameConfig from '../config/game.json';

export default class Key extends Phaser.Physics.Arcade.Image {
    constructor (scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);
    }

    preUpdate () {

    }
}