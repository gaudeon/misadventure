import gameConfig from '../config/game.json';

import RoomLocation from '../mixins/room/location';

import Key from './key';

export default class Gate extends 
    RoomLocation(
        Phaser.Physics.Arcade.Image
    ) {
    constructor(scene, x, y, frame) {
        super(scene, x, y, gameConfig.spriteAtlas.key, frame);

        scene.physics.add.existing(this);
        this.setImmovable(true);

        this.isOpen = false;

        this.requiredKey = Key;
    }

    openGate(key) {
        if (key instanceof this.requiredKey) {
            console.log('opened');
        }
    }

    preUpdate () {

    }
}
