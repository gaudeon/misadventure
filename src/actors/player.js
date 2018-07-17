import gameConfig from '../config/game.json';
import spriteConfig from '../config/sprites.json';

import HoldObject from '../mixins/inventory/hold-object';
import RoomMovement from '../mixins/room-movement';

export default class Player extends 
    RoomMovement(
        HoldObject(
            Phaser.Physics.Arcade.Sprite
        )
    ) {
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
}
