import AdminConsole from '../mixins/admin-console';

import Player from '../actors/actor/player';
import Grundle from '../actors/actor/dragons/grundle';
import Rhindle from '../actors/actor/dragons/rhindle';
import Yorgle from '../actors/actor/dragons/yorgle';
import GoldKey from '../props/prop/keys/gold-key';
import WhiteKey from '../props/prop/keys/white-key';
import BlackKey from '../props/prop/keys/black-key';
import GoldGate from '../props/prop/gates/gold-gate';
import WhiteGate from '../props/prop/gates/white-gate';
import BlackGate from '../props/prop/gates/black-gate';
import Sword from '../props/prop/sword';
import Ladder from '../props/prop/ladder';
import Magnet from '../props/prop/magnet';
import Chalice from '../props/prop/chalice';

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

        this.createDragons();

        this.createKeys();

        this.createSword();

        this.createLadder();

        this.createMagnet();

        this.createChalice();

        this.createGates();

        // load current room
        this.scene.launch('CurrentRoom', { roomId: this.actors.player.getCurrentRoom() });
    }

    createPlayer () {
        this.actors.player = new Player(this);
    }

    createDragons () {
        this.actors.grundle = new Grundle(this);
        this.actors.rhindle = new Rhindle(this);
        this.actors.yorgle = new Yorgle(this);

        // add all dragons into a collection for easy access to just dragons
        this.dragons = [
            this.actors.grundle,
            this.actors.rhindle,
            this.actors.yorgle
        ];
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

    createLadder () {
        this.props.ladder = new Ladder(this);
    }

    createMagnet () {
        this.props.magnet = new Magnet(this);
    }

    createChalice () {
        this.props.chalice = new Chalice(this);
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
