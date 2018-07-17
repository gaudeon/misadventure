import gameConfig from '../config/game.json';

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

        this.actors = {};

        this.props = {};
    }

    init () {
        this.cursor = this.input.keyboard.createCursorKeys();

        this.dropItem = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create () {
        this.currentRoom = this.scene.get('CurrentRoom');

        this.createPlayer();

        this.createKeys();

        this.createSword();

        this.createGates();

        this.registerPlayerCollisions();

        // load current room
        this.scene.run('CurrentRoom', { roomId: gameConfig.map.startingRoom });
    }

    update () {
    }

    createPlayer () {
        this.actors.player = new Player(this, 100, 100);
        this.physics.add.existing(this.actors.player, false);
        this.actors.player.setCollideWorldBounds(true);
    }

    createKeys () {
        this.props.keys = {};
        this.props.keys.gold = new GoldKey(this, 100, 200);
        this.props.keys.white = new WhiteKey(this, 0, 0);
        this.props.keys.black = new BlackKey(this, 0, 0);

        this.physics.add.existing(this.props.keys.gold);
        this.physics.add.existing(this.props.keys.white);
        this.physics.add.existing(this.props.keys.black);
    }

    createSword () {
        this.props.sword = new Sword(this, 150, 150);
        this.physics.add.existing(this.props.sword);
    }

    createGates () {
        this.props.gates = {};
        this.props.gates[ 6] = new Gate(this, 320, 270);
        this.props.gates[13] = new Gate(this, 320, 270);
        this.props.gates[23] = new Gate(this, 320, 270);

        [...Object.values(this.props.gates)].forEach((gate) => {
            this.physics.add.existing(gate);
        });
    }

    registerPlayerCollisions () {
        [...Object.values(this.props.keys), this.props.sword].forEach((prop) => {
            this.physics.add.collider(this.actors.player, prop, () => {
                if (!prop.isCarried()) prop.holdMe(this.actors.player);
            });
        });

        Object.values(this.props.gates).forEach((gate) => {
            this.physics.add.collider(this.actors.player, gate, () => {
                if (this.actors.player.heldObject() instanceof Key) {
                    gate.openGate(this.currentRoom.roomId, this.actors.player.heldObject());
                }
            });
        });
    }
};
