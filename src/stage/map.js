import gameConfig from '../config/game.json';

export default class Map {
    constructor (scene, room) {
        this.scene = scene;
        this.room = room;
    }

    preload () {
        gameConfig.map.tilesets.forEach(tileset => {
            this.scene.load.image(tileset.key, tileset.file);
        });

        let roomfile = "../../assets/json/room" + this.room + ".json";
        this.scene.load.tilemapTiledJSON("room" + this.room, roomfile);
    }

    create () {
        this.tilemap = this.scene.make.tilemap({ key: "room" + this.room });

        this.tilesets = {};
        gameConfig.map.tilesets.forEach(tileset => {
            this.tilesets[tileset.key] = this.tilemap.addTilesetImage(tileset.key);
        });

        this.tileLayers = {};
        gameConfig.map.tileLayers.forEach(layer => {
            this.tileLayers[layer.name] = this.tilemap.createDynamicLayer(layer.name, this.tilesets[layer.tileset], 0, 0);

            // Set colliding tiles
            this.tileLayers[layer.name].setCollisionByProperty({ collides: true });
        });

        // resize world to match the tilemap
        this.scene.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.scene.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }
}
