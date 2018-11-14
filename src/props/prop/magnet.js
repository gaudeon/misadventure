import gameConfig from '../../config/game.json';
import propConfig from '../../config/props.json';

import Player from '../../actors/actor/player';
import Prop from '../prop';
import CarryMe from '../../mixins/inventory/carry-me';
import RoomLocation from '../../mixins/room/location';

export default class Magnet extends
    RoomLocation(
        CarryMe(
            Prop
        )
    ) {
    constructor (scene, x = propConfig.magnet.startingX, y = propConfig.magnet.startingY) {
        super(scene, x, y, gameConfig.spriteAtlas.key, propConfig.magnet.frame);

        this.config = propConfig.magnet;

        this.setDepth(propConfig.magnet.startingDepth);

        this.setCanCarry(Player);

        this.setCurrentRoom(this.config.startingRoom);
    }

    preUpdate (time, delta) {
        if (super.preUpdate) super.preUpdate(time, delta);
    }
}