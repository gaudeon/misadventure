import gameConfig from '../config/game.json';

import Player from '../actors/player';

import CarryMe from '../mixins/inventory/carry-me';
import RoomLocation from '../mixins/room/location';

export default class Key extends
    RoomLocation(
        CarryMe(
            Phaser.Physics.Arcade.Image
        )
    ) {
    constructor (scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);

        this.setCanCarry(Player);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}