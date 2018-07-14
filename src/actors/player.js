import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.player.frame);
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate () {

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

    onEdge (dir) {
        if (dir === 'north')
            this.setY(this.scene.cameras.main.height - this.body.height/2 - 1);
        else if (dir === 'south')
            this.setY(1 + this.body.height/2);
        else if (dir === 'east')
            this.setX(1 + this.body.width/2);
        else if (dir === 'west')
            this.setX(this.scene.cameras.main.width - this.body.width/2 - 1);

        // call exit room after - to allow for the exitRoom to move to some other location
        this.exitRoom(dir);
    }

    exitRoom (dir) {
        console.log("Need to exit room at "+dir);
    }
}
