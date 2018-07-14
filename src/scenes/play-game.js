import gameConfig from '../config/game.json';

import map from '../stage/map';
import player from '../actors/player';
import GoldKey from '../props/keys/gold-key';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.map = new map(this, gameConfig.map.startingRoom);
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

        this.goldKey.holdMe(this.player);

        console.log('carried by ', this.goldKey.carryTarget);

        this.physics.add.existing(this.player, false);
        this.player.setCollideWorldBounds(true);
        this.onEdge(this.player);

        // this.onEdge(this.bat);

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update () {


    }

    onEdge (entity) {
        if (! this.edge) this.setupEdges();
        if (! entity.onEdge) { console.log("Object "+entity+" does not have onEdge"); return }
        for (let dir in this.edge)
            this.physics.add.overlap(entity, this.edge[dir], function () { entity.onEdge(dir) }, null);
    }

    setupEdges () {
        // I was attempting to get the worldbounds emitted event to show up somewhere, but that was proving hard to setup

        this.edge = {};

        var W = this.cameras.main.width;
        var H = this.cameras.main.height;
        var dir = {
            north: [0, 0,   W, 1],
            south: [0, H-1, W, 1],
            west:  [0,   0, 1, H],
            east:  [W-1, 0, 1, H]
        };
        for (let d in dir) {
            let [x, y, w, h] = dir[d];
            this.edge[d] = new Phaser.Physics.Arcade.Sprite(this, x, y).setOrigin(0, 0);
            this.add.existing(this.edge[d]);
            this.physics.add.existing(this.edge[d], true);
            this.edge[d].body.width  = w;
            this.edge[d].body.height = h;
            this.edge[d].width = w;
        }

    }
};
