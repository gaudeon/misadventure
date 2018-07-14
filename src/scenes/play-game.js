import gameConfig from '../config/game.json';

import map from '../stage/map';
import player from '../actors/player';
import GoldKey from '../props/keys/gold-key';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.map = new map(this);
    }

    preload () {
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.imageFile, gameConfig.spriteAtlas.jsonFile);

        this.map.preload();
    }

    create () {
        this.map.create();

        this.player = new player(this, 100, 100);
        this.add.existing(this.player); // makes player.preUpdate get called

        this.goldKey = new GoldKey(this, 300,300);
        this.add.existing(this.goldKey);

        this.physics.add.existing(this.player, false);

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update () {


    }
};
