export default class Prop extends Phaser.Physics.Arcade.Image {
    constructor (scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        this.colliders = [];
    }

    preUpdate (time, delta) {
    }
}