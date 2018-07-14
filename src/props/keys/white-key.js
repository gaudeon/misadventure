import spriteConfig from '../../config/sprites.json';

import Key from '../key';

export default class WhiteKey extends Key {
    constructor(scene, x, y) {
        super(scene, x, y, spriteConfig.keys.gold.frame);

        this.config = spriteConfig.keys.gold;
    }
}