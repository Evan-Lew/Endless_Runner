
/*
Project Name: Modded Rocket Partol 
Made By:      Laihong Xu
Update Date:  04/22/2022
Working hours:  10 hours
*/

/*
point breakdown:
(30) two player mode
(20) Redesign game artwork : assets, animations
(20) New spaceship type
(10) new title scene (didn't change art, but I add another menu for duo)
(10) Display time
(5) control rocket after it's fired
(5) bgm
(5) Fire UI
(5) speed increase
 
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Menu2, Play2]
  }
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderUISize_SubMenu = game.config.height / 10;
let borderUISize_Num = game.config.height / 10;
let borderPadding = borderUISize / 3;


// reserve keyboard vars
let keyF, keyR, keyA, keyD, keyS;
let keyLeft, keyRight, keyUp, keyDown;


/*
console.log("print test")
*/

