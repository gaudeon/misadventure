import 'phaser';
import 'lodash';
import 'webfontloader';

require('./index.html'); // so we get it in the dist

// import scenes
import LoadingScene from './scenes/loading';
import MainMenuScene from './scenes/main-menu';
import PlayGameScene from './scenes/play-game';

const EMULATED_ATARI_DISPLAY_WIDTH = 320;
const EMULATED_ATARI_DISPLAY_HEIGHT = 200;
const DISPLAY_MULTIPLIER = 3;
const GAME_WIDTH = EMULATED_ATARI_DISPLAY_WIDTH * DISPLAY_MULTIPLIER;
const GAME_HEIGHT = EMULATED_ATARI_DISPLAY_HEIGHT * DISPLAY_MULTIPLIER;

var gameConfig = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true, // enable to see physics bodies outlined
        }
    },
    scene: [LoadingScene, MainMenuScene, PlayGameScene]
}

let game = new Phaser.Game(gameConfig);
