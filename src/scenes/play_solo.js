class Play_solo extends Phaser.Scene {
    constructor() {
        super("playSoloScene");

    }

    preload() {
        // ----------Load Sprites----------
        //this.load.image("spaceship", "assets/test_spaceship.png");
        //this.load.image("asteroid", "assets/test_asteroid.png");

        // Stars
        this.load.image('pink_starfield', './assets/pink_starfield.png');
        this.load.image('blue_starfield', './assets/blue_starfield.png');
        // Planet
        this.load.image('planet', './assets/planet_1.png');
        // Asteroid
        this.load.image('asteroid', './assets/animated_asteroid.png');
        // Spaceship
        this.load.image("spaceship", "assets/spaceship.png");
    }

    create() {
        // ----------Game/Enviroment settings----------

        // Scene local variable 
        this.spawnTime = 1;             // every x seconds, Asteroid will be spawned
        this.gameOver = false;          // GAME OVER flag
        this.expertMode = false;        // flag determine if expert mode is on or off
        this.timePassed = 0;            // used to calculate total time has passed. start from 0 +1 every second
        
        this.generationFrequency = 2000;    //generate Asteroid every num/1000 seconds;
        this.expertStartTime = 10000;       //expert mode starts at num/1000 seconds;

        this.randomNum = 0;             // random number used for spawning location
        this.randomNum2 = 0;
        this.randomArr = [];

        // Background
        this.planet = this.add.tileSprite(0, 0, 300, 720, 'planet').setOrigin(0, 0);
        this.blue_starfield = this.add.tileSprite(0, 0, 1280, 720, 'blue_starfield').setOrigin(0, 0);
        this.pink_starfield = this.add.tileSprite(0, 0, 1280, 720, 'pink_starfield').setOrigin(0, 0);
        
        

        // Border
        var border = this.add.graphics();
        border.lineStyle(2, 0x0033ff, 1);
        border.strokeRoundedRect(0, 0, 1280, 720, 7);


        // timePassed increment
        this.timer_localTimer = this.time.addEvent({
            delay: 1000,                                     //every second call loop below
            callback: () => {
                {
                    if (!this.gameOver) {
                        this.timePassed++;                   //increment timePassed

                    } else {
                        this.timer_localTimer.remove(false); //turn off clockEvent  
                    }
                }
            },
            callbackScope: this,
            loop: true
        });//timePassed increment end

        // --------------------------------------------







        // --------------Player Related----------------

        // Instantiate Spaceship
        this.Player1 = new Spaceship(this, game.config.width / 2, game.config.height / 2, "spaceship").setOrigin(0, 0);

        // Key Inputs (Player1)
        keyLeft_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // --------------------------------------------





        // -------------Asteroid Related---------------
        // Instantiate Asteroids
        //  Asteroid generator function
        //  run everycertain second, spawn the asteroid
        //      novice spawn 1 Asteroid at a time
        this.timer_spawnTimer_novice = this.time.addEvent({    
            delay: this.generationFrequency,                                               //every 3 seconds call loop below
            callback: () => {
                {
                    if (this.gameOver) {
                        this.timer_spawnTimer_novice.remove(false);    //turn off clockEvent if game is over
                    }// if end
                    if (this.expertMode){
                        this.timer_spawnTimer_novice.remove(false);    //turn off clockEvent if expert mode is on
                    }
                    this.noviceGenerator(this.randomNum);
                }
            },
            callbackScope: this,
            loop: true
        });//novice generator end

        //  expert spawn 2 Asteroids at a time
        this.timer_runDelay_expert = this.time.delayedCall(this.expertStartTime, () => { 
            this.expertMode = true;
            this.timer_spawnTimer_expert = this.time.addEvent({    
                delay: this.generationFrequency,                                               //every second call loop below
                callback: () => {
                    {
                        if (this.gameOver) {
                            this.timer_spawnTimer_expert.remove(false);    //turn off clockEvent if game is over
                        }// if end
                        this.expertGenerator(this.randomNum, this.randomNum2, this.randomArr);
                    }
                },
                callbackScope: this,
                loop: true
            });//expert generator end
        }, null, this);//expert delay end

        // --------------------------------------------



    }

    update() {

        // -------------Background---------------------
        this.pink_starfield.tilePositionY -= 2.5;
        this.blue_starfield.tilePositionY -= 1.5;
        this.planet.tilePositionY -= 1;

        // ----------Game/Enviroment update------------

        //  gameOver check
        if (this.Player1.life <= 0) {
            this.gameOver = true;
        }

        if (!this.gameOver) {
            this.Player1.update();
            if (asteroidCreaded) {
                for (var i = 0; i < ai.length; i++) {
                    if (ai[i].isUpdate === true) {
                        ai[i].update();
                    } else {
                        ai[i].y = 2000;
                        ai.splice(i, 1);
                    }
                }
            }
        } else {

        }
    }//update end

    //  Helper function that determine the spawning point
    //      argument: input_randomNum: number from 1-8, which number indicate a pair of number below
    //      NOTE: Proper spawning point (x, y):   (0, 0), (0, 325), (0, 650), (600, 0), (1200, 0)
    //                                        (1200, 325), (1200, 650), (600, 650)
    locationAssign(input_randomNum) {
        if (input_randomNum == 1) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 0, 0, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 2) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 0, 325, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 3) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 0, 650, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 4) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 600, 0, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 5) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 1200, 0, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 6) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 1200, 325, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 7) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 1200, 650, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        } else if (input_randomNum == 8) {
            if (this.timePassed % this.spawnTime == 0) {       //every X second
                ai.push((new Asteroid(this, 600, 650, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0, 0));
                asteroidCreaded = true;
            }
        }//if end
    }

    // novice Asteroid generator
    //    use: generate one Asteroid at a time
    noviceGenerator(randomNum) {
        randomNum = Phaser.Math.Between(1, 8);       //random number between 1-8
        this.locationAssign(randomNum);
    }


    // expert Asteroid generator
    //    use: generate two Asteroid at a time, location will be diff
    expertGenerator(randomNum, randomNum2, randomArr) {
        randomNum = Phaser.Math.Between(1, 8);       //random number between 1-8
        randomArr.push(randomNum);
        for (var i = 0; i < 1; i++) {
            randomNum2 = Phaser.Math.Between(1, 8);   //random number between 1-8
            if (randomArr.includes(randomNum2) == true) {
                i = i - 1;                                   //pick another random number if it's repeated
            } else {
                randomNum2 = Phaser.Math.Between(1, 8);
            }
        }//for end
        this.locationAssign(randomNum);                  //generate two Asteroid
        this.locationAssign(randomNum2);
    }

}

