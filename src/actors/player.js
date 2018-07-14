import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.player.frame);
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate () {
        console.log("Got player update");

        var cursor = this.scene.cursor;

        var v  = gameConfig.playerVelocity;

        var vx = cursor.left.isDown  ? -v
               : cursor.right.isDown ? v
               : 0;
        this.setVelocityX(vx);

        var vy = cursor.up.isDown  ? -v
               : cursor.down.isDown ? v
               : 0;
        this.setVelocityY(vy);

    }
}
