import gameConfig from '../config/game.json';

import Gate from '../stage/gate';
import Player from '../actors/player';
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

        // load current room
        this.scene.launch('CurrentRoom', { roomId: gameConfig.map.startingRoom });
    }

    update (time, delta) {
        // testing changeRoom functionality
        if (time > 10000 && time < 20000)
            this.changeRoom("1");
        if (time > 20000)
            this.changeRoom("13");
    }

    changeRoom (roomId) {
        if (gameConfig.rooms[roomId])
            this.events.emit('ChangeRoom', roomId);
    }

    createPlayer () {
        this.actors.player = new Player(this, 100, 100);
    }

    createKeys () {
        this.props.keys = {};
        this.props.keys.gold = new GoldKey(this, 100, 200);
        this.props.keys.white = new WhiteKey(this, 0, 0);
        this.props.keys.black = new BlackKey(this, 0, 0);
    }

    createSword () {
        this.props.sword = new Sword(this, 150, 150);
    }

    createGates () {
        this.props.gates = {};
        this.props.gates[ 6] = new Gate(this, 320, 270);
        this.props.gates[13] = new Gate(this, 320, 270);
        this.props.gates[23] = new Gate(this, 320, 270);
    }
};
