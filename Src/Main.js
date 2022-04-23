// Main.js holds global variables and essential config datas

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Play]
}

var game = new Phaser.Game(config);
var borderUISize = game.config.height/ 20;
var borderPadding = borderUISize / 3;

// Key inputs
var keyLeft_P1, keyRight_P1, keyUp_P1, keyDown_P1;