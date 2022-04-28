// Main.js holds global variables and essential config datas

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [ Menu_1, Play_solo , Play ]
}

var game = new Phaser.Game(config);
var borderUISize = game.config.height/ 20;
var borderPadding = borderUISize / 3;

// Key inputs
var keyLeft_P1, keyRight_P1, keyUp_P1, keyDown_P1;
var keyA, keyD, keyEnter;         //key for menu

// Global variables
var asteroidCreaded = false;
var player2 = [];
var ai = [];

function Vector2(x, y) {
    return new Phaser.Math.Vector2(x, y);
}