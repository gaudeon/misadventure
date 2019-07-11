import gameConfig from '../../config/game.json';
//TODO: redesign how current-room works so that gameobjects aren't in the parent scene but in this scene
// even though they get destroyed find a way to persist things (probably means separating out actor/prop login and properties from their associated sprite/image objects)
export default class CurrentRoomScene extends Phaser.Scene {
    constructor (config, key = 'CurrentRoom') {
        super({ key: key });
    }

    init (data) {
        // set roomId to startingRoom unless defined
        this.roomId = data.roomId || gameConfig.map.startingRoom;

        this.roomConfig = gameConfig.rooms[this.roomId];
    }

    create () {
        this.game = this.scene.get('PlayGame');

        this.setupMap();

        this.setupEdges();

        this.setupActors();

        this.setupProps();

        this.setupCameras();

        if (this.roomConfig.fog) this.startRoomFog();
    }

    changeRoom (roomId) {
        if (gameConfig.rooms[roomId]) {
            this.scene.pause();
            this.cleanup();
            this.scene.restart({ roomId });
        }
        else {
            throw Error(`Room ${roomId} do not exist!`);
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
        });

        // set collision on walls
        this.tileLayers.walls.setCollisionByProperty({ collides: true });

        // set z-index of walls higher so actors / props are underneath
        this.tileLayers.walls.setDepth(1);

        // resize world to match the tilemap
        this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }

    setupActors () {
        this.add.existing(this.game.actors.player); // makes player.preUpdate get called
        this.physics.add.existing(this.game.actors.player, false);

        // reset every time we start a room so player sprite doesn't break
        this.game.actors.player.scene = this.game;
        this.game.actors.player.setActive(true);
        this.game.actors.player.setVisible(true);
        this.game.actors.player.setCollideWorldBounds(true);

        this.onEdge(this.game.actors.player); // room edge detection

        this.game.actors.player.colliders.push(this.physics.add.collider(this.game.actors.player, this.tileLayers.walls)); // map collisions with wall layer

        // prop collisions
        Object.values(this.game.props).forEach((prop) => {
            if (typeof prop.canBeCarried === 'function' && prop.canBeCarried(this.game.actors.player)) {
                if (prop.getCurrentRoom() === this.roomId) {
                    this.game.actors.player.colliders.push(this.physics.add.collider(this.game.actors.player, prop, () => {
                        if (!prop.isCarried()) prop.holdMe(this.game.actors.player);
                    }));
                }
            }
        });

        // dragons
        Object.values(this.game.dragons).forEach((dragon) => {
            if (dragon.getCurrentRoom() === this.roomId) {
                this.add.existing(dragon);
                this.physics.add.existing(dragon);

                 // reset every time we start a room so dragon sprites don't break
                dragon.scene = this.game;
                dragon.setActive(true);
                dragon.setVisible(true);
            }

            // TODO: figure out collision / edge detection for dragons

            // TODO: setup collision with the player
            // this.game.actors.player.colliders.push(this.physics.add.collider(this.game.actors.player, dragon)); 
        });
    }

    setupProps () {
        Object.values(this.game.props).forEach((prop) => {
            if (prop.getCurrentRoom() === this.roomId) {
                this.add.existing(prop);
                this.physics.add.existing(prop);

                // reset every time so props don't break
                prop.scene = this.game;
                prop.setActive(true);
                prop.setVisible(true);
            }
        });

        // setup gate collision if there is a gate in this room
        this.game.gateProps.forEach((gate) => {
            if (gate.getCurrentRoom() === this.roomId) {
                // add gate
                this.physics.add.existing(gate);
                gate.setImmovable(true);

                this.game.actors.player.colliders.push(this.physics.add.collider(this.game.actors.player, gate, () => {}));

                // make sure gate stays open on room changes
                this.game.actors.player.once('changingRoom', (data) => {
                    if(this.game.actors.player.findExit(data.direction, gate.getCurrentRoom()) === data.destinationRoom)
                        gate.open();
                });

                this.game.keyProps.forEach(key => {
                    if (key instanceof gate.requiredKey) {
                        // gate collision with appropriate key
                        key.colliders.push(this.physics.add.collider(key, gate, () => {
                            if (this.game.actors.player.heldObject() === key) {
                                gate.toggleGate(this.game.actors.player.heldObject());
                            }
                        }));
                    }
                });
            }
        });
    }

    setupCameras () {
        this.cameras.normal = this.cameras.main;

        if (! this.roomConfig.fog) return;

        this.cameras.fogBG = this.cameras.add();

        let color = new Phaser.Display.Color(231, 163, 88, 255);

        this.cameras.fogBG.setBackgroundColor(color);
        this.cameras.fogBG.transparent = false;

        this.cameras.fogBG.ignore(this.children.list);

        this.cameras.fogFG = this.cameras.add();
        this.cameras.fogFG.setSize(this.cameras.main.width * .3, this.cameras.main.height * .3);
        this.cameras.fogFG.setRoundPixels(true);

        this.startRoomFog();
    }

    // setup cameras for displaying fog
    startRoomFog () {
        this.cameras.normal.setVisible(false);
        this.cameras.fogBG.setVisible(true);
        this.cameras.fogFG.setVisible(true);
        this.cameras.main = this.cameras.fogBG;
    }

    // useful to clear room fog cameras
    clearRoomFog () {
        this.cameras.normal.setVisible(true);
        this.cameras.fogBG.setVisible(false);
        this.cameras.fogFG.setVisible(false);
        this.cameras.main = this.cameras.normal;
    }

    setupEdges () {
        // I was attempting to get the worldbounds emitted event to show up somewhere, but that was proving hard to setup
        this.edge = {};

        let W = this.cameras.main.width;
        let H = this.cameras.main.height;
        let dir = {
            north: [0, 0,   W, 1],
            south: [0, H-1, W, 1],
            west:  [0,   0, 1, H],
            east:  [W-1, 0, 1, H]
        };

        for (let d in dir) {
            let [x, y, w, h] = dir[d];

            if (typeof gameConfig.rooms[this.roomId].exits[d] === 'object') {
                const { topLeftTile, tileWidth, tileHeight } = gameConfig.rooms[this.roomId].exits[d].zone;

                x = topLeftTile.x * gameConfig.tileWidth;
                y = topLeftTile.y * gameConfig.tileHeight;

                w = tileWidth * gameConfig.tileWidth;
                h = tileHeight * gameConfig.tileHeight;

                this.edge[d] = this.add.zone(x, y, x + w, y + h);
            } else {
                this.edge[d] = this.add.zone(x, y, w, h);
            }

            this.edge[d].setOrigin(0, 0);

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

    update () {
        this.updateRoomFog();
    }

    updateRoomFog () {
        if (!this.roomConfig.fog) return;

        let playerX = this.game.actors.player.x;
        let playerY = this.game.actors.player.y;
        let hazeCameraWidth = this.cameras.main.width * .3;
        let hazeCameraHeight = this.cameras.main.height * .3;
        let hazeCameraX = playerX - hazeCameraWidth / 2;
        let hazeCameraY = playerY - hazeCameraHeight / 2;

        this.cameras.fogFG.setViewport(hazeCameraX, hazeCameraY, hazeCameraWidth, hazeCameraHeight);
        this.cameras.fogFG.centerOn(playerX, playerY);
    }

    cleanup () {
        this.sys.updateList.removeAll(); // clear the update list ahead of shutdown so we don't destroy our actors and props

        // undo actors and props physics bodies because they may not be in the next room
        [...Object.values(this.game.actors), ...Object.values(this.game.props)].forEach((thing) => {
            if (thing.getCurrentRoom() === this.roomId && thing.body) {
                thing.disableBody(true, true);
            }
            thing.colliders.forEach(collider => collider.destroy());

            thing.colliders = [];
        });

        if (this.roomConfig.fog) this.clearRoomFog();
    }
}