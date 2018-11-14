import gameConfig from '../../config/game.json';
import propConfig from '../../config/props.json';

import Player from '../../actors/actor/player';
import Prop from '../prop';
import CarryMe from '../../mixins/inventory/carry-me';
import RoomLocation from '../../mixins/room/location';

export default class Sword extends
    RoomLocation(
        CarryMe(
            Prop
        )
    ) {
    constructor (scene, x = propConfig.sword.startingX, y = propConfig.sword.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.sword.frame);

        this.config = propConfig.sword;

        this.setDepth(propConfig.sword.startingDepth);

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}