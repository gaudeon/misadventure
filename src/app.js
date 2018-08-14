import 'phaser';
import 'lodash';
import 'webfontloader';

import gameConfig from './config/game.json';

require('./index.html'); // so we get it in the dist

// import scenes
import LoadingScene from './scenes/loading';
import MainMenuScene from './scenes/main-menu';
import PlayGameScene from './scenes/play-game';
import CurrentRoomScene from './scenes/play-game/current-room';

var gameSettings = {
    type: Phaser.AUTO,
    width: gameConfig.gameWidth,
    height: gameConfig.gameHeight,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false // enable to see physics bodies outlined
        }
    },
    scene: [LoadingScene, MainMenuScene, PlayGameScene, CurrentRoomScene],
    callbacks: {
        postBoot: (game) => {
            game.registry.set('allowAdminConsole', true); // enable game admin commands via devtools console
        }
    }
}

let game = new Phaser.Game(gameSettings);
