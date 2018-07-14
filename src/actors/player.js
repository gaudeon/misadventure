import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

import HoldObject from '../mixins/inventory/hold-object';

export default class Player extends HoldObject(Phaser.Physics.Arcade.Sprite) {
    constructor (scene, x, y) {
        super(scene, x, y, gameConfig.spriteAtlas.key, spriteConfig.player.frame);

        this.controls = {
            cursor: scene.cursor,
            dropItem: scene.dropItem
        };

        this.myVelocity = gameConfig.playerVelocity; 
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {

        let { cursor, dropItem } = this.controls;

        let v  = this.myVelocity;

        let vx = cursor.left.isDown  ? -v
               : cursor.right.isDown ? v
               : 0;
        this.setVelocityX(vx);

        let vy = cursor.up.isDown  ? -v
               : cursor.down.isDown ? v
               : 0;
        this.setVelocityY(vy);

        if (dropItem.isDown && this.heldObject()) this.dropObject();

        if (super.preUpdate) super.preUpdate(time, delta);
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
