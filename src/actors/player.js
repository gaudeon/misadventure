import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.player.frame);
    }
}