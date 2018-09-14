import gameConfig from '../config/game.json';
import propConfig from '../config/props.json';

import Player from '../actors/player';

import CarryMe from '../mixins/inventory/carry-me';
import RoomLocation from '../mixins/room/location';

export default class Ladder extends
    RoomLocation(
        CarryMe(
            Phaser.Physics.Arcade.Image
        )
    ) {
    constructor (scene, x = propConfig.ladder.startingX, y = propConfig.ladder.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.ladder.frame);

        this.config = propConfig.ladder;

        this.setDepth(propConfig.ladder.startingDepth);

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}