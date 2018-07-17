// json imports
import gameConfig from '../config/game.json';

// web fonts
// import WebFont from 'webfontloader';
// require('../../assets/css/fonts.css');
// require('../../assets/fonts/[font].ttf');

// require in other assets to be included but not added to cache at this time
// require('../../assets/sounds/sound.wav');
require('../../assets/images/sprite_atlas.json');
require('../../assets/images/sprite_atlas.png');
require('../../assets/images/map_tileset.png');
require('../../assets/images/play.png');

require('../../assets/json/room1.json');
require('../../assets/json/room2.json');
require('../../assets/json/room3.json');
require('../../assets/json/room4.json');
require('../../assets/json/room5.json');
require('../../assets/json/room6.json');
require('../../assets/json/room7.json');
require('../../assets/json/room8.json');
require('../../assets/json/room9.json');
require('../../assets/json/room10.json');
require('../../assets/json/room11.json');
require('../../assets/json/room12.json');
require('../../assets/json/room13.json');
require('../../assets/json/room14.json');
require('../../assets/json/room15.json');
require('../../assets/json/room16.json');
require('../../assets/json/room17.json');
require('../../assets/json/room18.json');
require('../../assets/json/room19.json');
require('../../assets/json/room20.json');
require('../../assets/json/room21.json');
require('../../assets/json/room22.json');
require('../../assets/json/room23.json');
require('../../assets/json/room24.json');
require('../../assets/json/room25.json');
require('../../assets/json/room26.json');
require('../../assets/json/room27.json');
require('../../assets/json/room28.json');
require('../../assets/json/room29.json');
require('../../assets/json/room30.json');

export default class LoadingScene extends Phaser.Scene {
    constructor (config, key = 'Loading') {
        super({ key: key });
    }

    init () {
        // font loading
        this.areFontsLoaded = true;
    }

    preload () {
        // load sprite atlas
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.imageFile, gameConfig.spriteAtlas.jsonFile);

        // load tilesets
        gameConfig.map.tilesets.forEach(tileset => {
            this.load.image(tileset.key, tileset.file);
        });

        // load room tilemap data
        Object.keys(gameConfig.rooms).forEach((roomId) => {
            let roomKey = `room${roomId}`;
            let roomFile = `room${roomId}.json`;

            this.load.tilemapTiledJSON(roomKey, roomFile);
        });
    }

    create () {
        this.scene.start('MainMenu'); 
    }
};
