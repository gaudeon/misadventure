export default class Actor extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        this.colliders = [];
    }

    preUpdate (time, delta) {
    }
}