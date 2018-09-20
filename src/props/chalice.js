import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';

import CarryMe from '../mixins/inventory/carry-me';
import RoomLocation from '../mixins/room/location';

export default class Chalice extends
    RoomLocation(
        CarryMe(
            Phaser.Physics.Arcade.Image
        )
    ) {
    constructor (scene, x = propConfig.chalice.startingX, y = propConfig.chalice.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.chalice.frame);

        this.config = propConfig.chalice;

        this.setDepth(propConfig.chalice.startingDepth);

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}