import gameConfig from '../../config/game.json';

import Key from '../../props/key';

export default class CurrentRoomScene extends Phaser.Scene {
    constructor (config, key = 'CurrentRoom') {
        super({ key: key });
    }

    init (data) {
        // set roomId to startingRoom unless defined
        this.roomId = data.roomId || gameConfig.map.startingRoom;
    }

    create () {
        this.game = this.scene.get('PlayGame');

        this.setupMap();

        this.setupEdges();

        this.setupActors();

        this.setupProps();
    }

    changeRoom (roomId) {
        if (gameConfig.rooms[roomId]) {
            this.scene.pause();
            this.scene.restart({ roomId });
        }
    }

    setupMap () {
        this.tilemap = this.make.tilemap({ key: `room${this.roomId}` });

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
        this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }

    setupActors () {
        this.add.existing(this.game.actors.player); // makes player.preUpdate get called
        this.physics.add.existing(this.game.actors.player, false);

        this.game.actors.player.setCollideWorldBounds(true);

        this.onEdge(this.game.actors.player); // room edge detection

        this.physics.add.collider(this.game.actors.player, this.tileLayers.walls); // map collisions with wall layer

        // prop collisions
        Object.values(this.game.props).forEach((prop) => {
            if (typeof prop.canBeCarried === 'function' && prop.canBeCarried(this.game.actors.player)) {
                this.physics.add.collider(this.game.actors.player, prop, () => {
                    if (!prop.isCarried()) prop.holdMe(this.game.actors.player);
                });
            }
        });
    }

    setupProps () {
        Object.values(this.game.props).forEach((prop) => {
            if (prop.getCurrentRoom() === this.roomId) {
                this.add.existing(prop);
                this.physics.add.existing(prop);
            }
        });

        // setup gate collision if there is a gate in this room
        this.game.gateProps.forEach((gate) => {
            if (gate.getCurrentRoom() === this.roomId) {
                // gate collision with player
                this.physics.add.collider(this.game.actors.player, gate, () => {
                    if (this.game.actors.player.heldObject() instanceof Key) {
                        gate.openGate(this.game.actors.player.heldObject());
                    }
                });
            }
        });
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

    onEdge (entity) {
        if (! entity.onEdge) { console.log("Object "+entity+" does not have onEdge"); return }

        for (let direction in this.edge)
            this.physics.add.overlap(entity, this.edge[direction], () => { entity.onEdge(this, direction) }, null);
    }
}