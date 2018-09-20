import gameConfig from '../config/game.json';

import HoldObject from '../mixins/inventory/hold-object';
import RoomMovement from '../mixins/room/movement';
import RoomLocation from '../mixins/room/location';

export default class Dragon extends
    RoomLocation(
       RoomMovement(
           HoldObject(
               Phaser.Physics.Arcade.Sprite
           )
       )
    ) {

    constructor (scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);

        //this.setCanCarry(Bat);
    }

    // will only be invoked if added to gameobject (not just physics object)
    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}
