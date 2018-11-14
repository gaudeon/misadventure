import gameConfig from '../../config/game.json';

import Player from '../../actors/actor/player';
import Prop from '../prop';
import CarryMe from '../../mixins/inventory/carry-me';
import RoomLocation from '../../mixins/room/location';

export default class Key extends
    RoomLocation(
        CarryMe(
            Prop
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