import gameConfig from '../config/game.json';

import RoomLocation from '../mixins/room/location';

import Key from './key';

export default class Gate extends 
    RoomLocation(
        Phaser.Physics.Arcade.Image
    ) {
    constructor(scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);

        this.isOpen = false;

        this.closedY = this.y;
        this.openY = this.y - this.height;

        this.requiredKey = Key;
    }

    open() { // force gate open
        this.isOpen = true;
    }

    close() { // force gate closed
        this.isOpen = false;
    }

    toggleGate(key) {
        if (key instanceof this.requiredKey && (this.y === this.closedY || this.y === this.openY)) {
            this.isOpen = ! this.isOpen;
        }
    }

    preUpdate () {
        if (this.isOpen && this.y !== this.openY) {
            this.setY(this.y - 1);
        }
        else if (! this.isOpen && this.y !== this.closedY) {
            this.setY(this.y + 1);
        }
    }
}
