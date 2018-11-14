import gameConfig from '../../config/game.json';
import actorConfig from '../../config/actors.json';

import Actor from '../actor';
import HoldObject from '../../mixins/inventory/hold-object';
import RoomMovement from '../../mixins/room/movement';
import RoomLocation from '../../mixins/room/location';

export default class Player extends
    RoomLocation(
       RoomMovement(
           HoldObject(
               Actor
           )
       )
    ) {
    constructor (scene, x = actorConfig.player.startingX, y = actorConfig.player.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, actorConfig.player.frame);

        this.controls = {
            cursor: scene.cursor,
            dropItem: scene.dropItem
        };

        this.config = actorConfig.player;

        this.colliders = [];

        this.setCurrentRoom(this.config.startingRoom);
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {

        let { cursor, dropItem } = this.controls;

        let v  = this.config.velocity;

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
