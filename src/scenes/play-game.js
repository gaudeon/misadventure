import gameConfig from '../config/game.json';

import Map from '../stage/map';
import Gate from '../stage/gate';
import Player from '../actors/player';
import Key from '../props/key';
import GoldKey from '../props/keys/gold-key';
import WhiteKey from '../props/keys/white-key';
import BlackKey from '../props/keys/black-key';
import Sword from '../props/sword';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.map = new Map(this, gameConfig.map.startingRoom);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.dropItem = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create () {
        this.map.create();

        this.createPlayer();

        this.createKeys();

        this.createSword();

        this.createGates();

        this.registerPlayerCollisions();

        // this.onEdge(this.bat);
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

            this.edge[d] = this.add.zone(x, y, w, h).setOrigin(0, 0);

            // need to add an arcade physics body to the zone for collision
            this.physics.add.existing(this.edge[d], true);
            this.edge[d].body.width  = w;
            this.edge[d].body.height = h;
            this.edge[d].width = w;
        }
    }

    createPlayer () {
        this.player = new Player(this, 100, 100);
        this.add.existing(this.player); // makes player.preUpdate get called
        this.physics.add.existing(this.player, false);
        this.player.setCollideWorldBounds(true);
        this.onEdge(this.player);
    }

    createKeys () {
        this.goldKey = new GoldKey(this, 100, 200);
        this.whiteKey = new WhiteKey(this, 0, 0);
        this.blackKey = new BlackKey(this, 0, 0);

        this.add.existing(this.goldKey);
        this.physics.add.existing(this.goldKey);
    }

    createSword () {
        this.sword = new Sword(this, 150, 150);
        this.add.existing(this.sword);
        this.physics.add.existing(this.sword);
    }

    createGates () {
        this.gates = {};
        this.gates[ 6] = new Gate(this, 320, 270);
        this.gates[13] = new Gate(this, 320, 270);
        this.gates[23] = new Gate(this, 320, 270);

        let hasGate = this.gates[this.map.room];
        if (hasGate) {
            this.add.existing(hasGate);
            this.physics.add.existing(hasGate);
        }
    }

    registerPlayerCollisions () {
        [this.goldKey, this.whiteKey, this.blackKey, this.sword].forEach((item) => {
            this.physics.add.collider(this.player, item, () => {
                if (!item.isCarried()) item.holdMe(this.player);
            });
        });

        Object.keys(this.gates).forEach((gateId) => {
            let gate = this.gates[gateId];
            this.physics.add.collider(this.player, gate, () => {
                if (this.player.heldObject() instanceof Key) {
                    gate.openGate(this.map.room, this.player.heldObject());
                }
            });
        });

        // map collisions with wall layer
        console.log(this.map.tileLayers.walls);
        this.physics.add.collider(this.player, this.map.tileLayers.walls);
    }
};
