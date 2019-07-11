export default class Actor extends Phaser.Physics.Arcade.Image {
    constructor (scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        this.colliders = [];
    }

    preUpdate (time, delta) {
    }
}