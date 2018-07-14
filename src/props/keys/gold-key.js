import spriteConfig from '../../config/sprites.json';

import Key from '../key';

export default class GoldKey extends Key {
    constructor(scene, x, y) {
        super(scene, x, y, spriteConfig.keys.gold.frame);

        this.config = spriteConfig.keys.gold;
    }
}