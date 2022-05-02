// Main.js holds global variables and essential config datas

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Menu_1, Play_solo, Tutorial, Credit]
}

var game = new Phaser.Game(config);
var borderUISize = game.config.height / 20;
var borderPadding = borderUISize / 3;

// Key inputs
var keyLeft_P1, keyRight_P1, keyUp_P1, keyDown_P1, keyR;
var keyA, keyD, keyEnter, keyESC;         //key for menu

// Global variables
var asteroidCreaded = false;
var player2 = [];
var ai = [];

function Vector2(x, y) {
    return new Phaser.Math.Vector2(x, y);
}

/* ------Submission Description-----

Collaborators: Laihong Xu, Evan Lew, Tiange Wei

Title: Asteroid Dodger

Completed 5/2

Creative Tilt: 
We are proud of the asteroid generation in the game that depends
on creating a random number that determines the location of every
asteroid. It took us a while to find the right location and timing
for the asteroids to spawn in, while also balancing the difficulty of
the game.

For our visual style we think the background effect of having two backgrounds
scrolling at different speeds creates nice look that pairs well with the planets.
Another thing we liked was how when the ship gets hit the sounds effect and slight
screen shake adds to the player urgency and experience.

Credit:

*/