import gameConfig from '../config/game.json';

import AdminConsole from '../mixins/admin-console';

import Player from '../actors/player';
import GoldKey from '../props/keys/gold-key';
import WhiteKey from '../props/keys/white-key';
import BlackKey from '../props/keys/black-key';
import GoldGate from '../props/gates/gold-gate';
import WhiteGate from '../props/gates/white-gate';
import BlackGate from '../props/gates/black-gate';
import Sword from '../props/sword';

export default class PlayGameScene extends AdminConsole(Phaser.Scene) {
    constructor (config, key = 'PlayGame') {
        super({ key: key });

        this.actors = {};

        this.props = {};
    }

    init () {
        this.setupAdminConsole(); // if admin console is enabled via app, set it up

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
        this.scene.launch('CurrentRoom', { roomId: this.actors.player.getCurrentRoom() });
    }

    update (time, delta) {
    }

    createPlayer () {
        this.actors.player = new Player(this);
    }

    createKeys () {
        this.props.goldKey = new GoldKey(this);
        this.props.whiteKey = new WhiteKey(this);
        this.props.blackKey = new BlackKey(this);

        // add all keys into a collection for easy access to just keys
        this.keyProps = [
            this.props.goldKey,
            this.props.whiteKey,
            this.props.blackKey
        ];
    }

    createSword () {
        this.props.sword = new Sword(this);
    }

    createGates () {
        this.props.goldGate = new GoldGate(this);
        this.props.whiteGate = new WhiteGate(this);
        this.props.blackGate = new BlackGate(this);

        // add all gates into a collection for easy access to just gates
        this.gateProps = [
            this.props.goldGate,
            this.props.whiteGate,
            this.props.blackGate
        ];
    }
};
