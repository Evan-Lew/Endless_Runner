class Play_solo extends Phaser.Scene {
    constructor() {
        super("playSoloScene");

    }

    preload() {
        // ----------Load Sprites----------
        // Atlas
        this.load.atlas('ship_atlas', './assets/shipsheet.png', './assets/shipmap.json');

        // Audio
        this.load.audio('sfx_rock_impact', './assets/rock_impact.wav');
        this.load.audio("sfx_spaceshipOnHit", "./assets/sfx_onHIt.wav");
        this.load.audio('sfx_spaceshipOnHit0', './assets/0hp_onhit.wav');
        this.load.audio('sfx_select', './assets/select_menu.mp3');
        this.load.audio('sfx_gameover', './assets/gameover.mp3');
        // Background music
        this.load.audio('bgm', './assets/Intergalactic Odyssey_8bit.WAV');
        // Stars
        this.load.image('pink_starfield', './assets/pink_starfield.png');
        this.load.image('blue_starfield', './assets/blue_starfield.png');
        // Planet
        this.load.image('planet', './assets/planet_1.png');
        // Asteroid
        this.load.image('asteroid', './assets/animated_asteroid.png');
        this.load.spritesheet('asteroid_spawn', './assets/animated_asteroid_spawn.png', { frameWidth: 64, frameHeight: 64 });        
        // Spaceship
        this.load.image("spaceship", "./assets/spaceship.png");
        // Life (5 heart)
        this.load.spritesheet('indicator_life', './assets/heart.png', { frameWidth: 172, frameHeight: 32 });
    }

    create() {
        // ----------Game/Enviroment settings----------

        // Ship move
        this.anims.create({
            key: 'ship_move',
            frames: this.anims.generateFrameNames('ship_atlas', {
                prefix: 'ship_move_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
        });

        this.anims.create({
            key: 'ship_wreck',
            frames: this.anims.generateFrameNames('ship_atlas', {
                prefix: 'ship_wreck_',
                start: 1,
                end: 12,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
        });

        // Ship move
        this.anims.create({
            key: 'ship_idle',
            frames: this.anims.generateFrameNames('ship_atlas', {
                prefix: 'ship_idle_',
                start: 2,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
        });

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

        this.collisionFunc = false;              // on is collision is working, off is collision is not
        this.update_counter_func_endGame = 0;    // a counter that will keep increment, but used call function one time in update

        // Background
        this.planet = this.add.tileSprite(0, 0, 1280, 720, 'planet').setOrigin(0, 0);
        this.blue_starfield = this.add.tileSprite(0, 0, 1280, 720, 'blue_starfield').setOrigin(0, 0);
        this.pink_starfield = this.add.tileSprite(0, 0, 1280, 720, 'pink_starfield').setOrigin(0, 0);

        // Background music
        this.bgm = this.sound.add('bgm', { volume: 0.5 });
        // this.bgm.play();

        // Border
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x0033ff, 1);
        graphics.strokeRoundedRect(0, 0, 1280, 720, 7);
        graphics.lineStyle(2, 0xDF2121, 0);
        graphics.strokeRoundedRect(0, 0, 1280, 720, 7);

        // UI
        // HP 
        this.anims.create({
            key: "hp5",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('indicator_life', { start: 0, end: 0 }),
            repeat: 1
        });
        this.anims.create({
            key: "hp4",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('indicator_life', { start: 1, end: 1 }),
            repeat: 1
        });
        this.anims.create({
            key: "hp3",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('indicator_life', { start: 2, end: 2 }),
            repeat: 1
        });
        this.anims.create({
            key: "hp2",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('indicator_life', { start: 3, end: 3 }),
            repeat: 1
        });
        this.anims.create({
            key: "hp1",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('indicator_life', { start: 4, end: 4 }),
            repeat: 1
        });
        this.anims.create({
            key: "hp0",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('indicator_life', { start: 5, end: 5 }),
            repeat: 1
        });
        // display hp init
        this.life_bar = this.add.sprite(100, 50, 'indicator_life');
        this.life_bar.play("hp5");
        // display timer init
        this.display_timePassed = this.add.text(80, 70, this.timePassed, { fontFamily: 'PixelFont', fontSize: '32px', color: '#FFFFFF', });


        // timePassed increment
        this.timer_localTimer = this.time.addEvent({
            delay: 1000,                                     //every second call loop below
            callback: () => {
                {
                    if (!this.gameOver) {
                        this.display_timePassed.destroy();   //destory previous timer
                        this.timePassed++;                   //increment timePassed
                        //display runtime timer
                        this.display_timePassed = this.add.text(80, 70, this.timePassed, { align: 'center', fontFamily: 'PixelFont', fontSize: '32px', color: '#FFFFFF', });

                    } else {
                        this.timer_localTimer.remove(false); //turn off clockEvent  
                    }
                }
            },
            callbackScope: this,
            loop: true
        });//timePassed increment end

        // --------------Player Related----------------

        // Instantiate Spaceship
        this.Player1 = new Spaceship(this, game.config.width / 2, game.config.height / 2, "spaceship").setOrigin(0.5, 0.5);


        // Key Inputs (Player1)
        keyLeft_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // -------------------------------------------

        // -------------Asteroid Related---------------
        // Instantiate Asteroids
        //  Asteroid generator function
        //  run everycertain second, spawn the asteroid
        //      novice spawn 1 Asteroid at a time

        this.anims.create({
            key: "asteroid_spawn_anim",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('asteroid_spawn', { start: 0, end: 9 }),
            repeat: 0
        });

        this.timer_spawnTimer_novice = this.time.addEvent({
            delay: this.generationFrequency,                                               //every 3 seconds call loop below
            callback: () => {
                {
                    if (this.gameOver) {
                        this.timer_spawnTimer_novice.remove(false);    //turn off clockEvent if game is over
                    } else {
                        if (this.expertMode) {
                            this.timer_spawnTimer_novice.remove(false);    //turn off clockEvent if expert mode is on
                        } else {
                            this.noviceGenerator(this.randomNum);
                        }//inner if end

                    }//if end
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
                        } else {
                            this.expertGenerator(this.randomNum, this.randomNum2, this.randomArr);
                        }//if end
                    }
                },
                callbackScope: this,
                loop: true
            });//expert generator end
        }, null, this);//expert delay end

        // --------------------------------------------
    }

    update() {
        // console.log(this);
        if (!this.gameOver) {
            // -------------Background---------------------
            this.pink_starfield.tilePositionY -= 2.5;
            this.blue_starfield.tilePositionY -= 1.5;
            this.planet.tilePositionY -= 1;

            // ----------Game/Enviroment update------------
            // asteroid spawn
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

            if (ai.length != 0) {
                //turn on collision
                this.collisionFunc = true;
                // check collision for every asteroid exist
                for (var i = 0; i < ai.length; i++) {
                    this.Collision_Aseteroid_VS_Spaceship(ai[i], this.Player1, this.collisionFunc);
                }
            }


            //  gameOver check + hp change
            if (this.Player1.life <= 0) {
                this.life_bar.play("hp0");
                this.gameOver = true;
            } else if (this.Player1.life == 5) {
                this.life_bar.play("hp5");
            } else if (this.Player1.life == 4) {
                this.life_bar.play("hp4");
            } else if (this.Player1.life == 3) {
                this.life_bar.play("hp3");
            } else if (this.Player1.life == 2) {
                this.life_bar.play("hp2");
            } else if (this.Player1.life == 1) {
                this.life_bar.play("hp1");
            }//if end
        } else {
            this.endGame(this.update_counter_func_endGame);
            this.update_counter_func_endGame++;
        }
    }//update end


    // Helper function that determine the collision
    //     Aseteroid Collision vs. Spaceship
    //     Using AABB Collision
    Collision_Aseteroid_VS_Spaceship(Asteroid, Spaceship, flag) {
        //use flag to check if this function is on or off
        //   flag = false, turn off the collision
        if (!flag) {

        } else {
            if (Asteroid.x < Spaceship.x - Spaceship.width/2 + Spaceship.width
                && Asteroid.x + Asteroid.width/2 > Spaceship.x
                && Asteroid.y < Spaceship.y - Spaceship.height/2 + Spaceship.height
                && Asteroid.y + Asteroid.height/2 > Spaceship.y) {
                Spaceship.life -= 1;
                //play two different sound effect
                if (Spaceship.life == 0) {
                    this.sound.play("sfx_spaceshipOnHit0");
                } else {
                    this.sound.play("sfx_spaceshipOnHit");
                }//if end
                Asteroid.isUpdate = false;
                this.cameras.main.shake(100, 0.005);
            }//if end
        }//flag check end
    }

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

    endGame(counter) {

        let gameOverConfig = {
            fontFamily: 'PixelFont',
            fontSize: "60px",
            color: "#DF2121",

        }

        this.add.text(game.config.width / 2, game.config.height / 2 - game.config.height / 5, "Game Over!", gameOverConfig).setOrigin(0.5);
        gameOverConfig.fontSize = "30px";
        this.add.text(game.config.width / 2, game.config.height / 2 + game.config.height / 5, "Press {R} To Restart\nPress {ESC} To Return To Menu", gameOverConfig).setOrigin(0.5);


        // One time function in update
        //   gameover case     
        if (counter == 0) {
            //remove all sprite, and turn off collision
            for (var i = 0; i < ai.length; i++) {
                ai[i].isUpdate = false;
                ai[i].destroy();
            }
            this.Player1.destroy();
            this.bgm.stop();
            this.collisionFunc = false;



            // play game over sound with delay
            this.timer_endGame = this.time.addEvent({
                delay: 400,                                     //every second call loop below
                callback: () => {
                    {
                        this.sound.play("sfx_gameover");
                    }
                },
                callbackScope: this,
                loop: false
            });//timePassed increment end
        } else {
        }//if end

        if (keyESC.isDown) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene_1");
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {

            this.sound.play('sfx_select');
            this.scene.restart();

        }

    }

}//scene end

