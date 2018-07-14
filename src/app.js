import 'phaser';
import 'lodash';
import 'webfontloader';
import gameConfig from './config/game.json';

require('./index.html'); // so we get it in the dist

// import scenes
import LoadingScene from './scenes/loading';
import MainMenuScene from './scenes/main-menu';
import PlayGameScene from './scenes/play-game';

var gameSettings = {
    type: Phaser.AUTO,
    width: gameConfig.gameWidth,
    height: gameConfig.gameHeight,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true, // enable to see physics bodies outlined
        }
    },
    scene: [LoadingScene, MainMenuScene, PlayGameScene]
}

let game = new Phaser.Game(gameSettings);
