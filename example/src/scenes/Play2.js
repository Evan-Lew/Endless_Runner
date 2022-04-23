class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    create() {
        // while UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0, 0);

        // place tile sprite
        this.field = this.add.tileSprite(0, borderUISize + borderPadding + borderUISize * 2, 640, 480, 'Windfield').setOrigin(0, 0);

        // add spaceships (x2)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 40).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 1, borderUISize * 8 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship2(this, 0 - borderUISize * 2, borderUISize * 6, 'spaceship2', 0, 30).setOrigin(0, 0);
        this.ship04 = new Spaceship2(this, 0 - borderUISize * 4.5, borderUISize * 10 + borderPadding * 2, 'spaceship2', 0, 10).setOrigin(0, 0);
        this.ship05 = new Spaceship3(this, 0 - borderUISize, borderUISize * 7 + borderPadding * 2, 'spaceship3', 0, 10).setOrigin(0, 0);
        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xF9984D).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xF9984D).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xF9984D).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xF9984D).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xF9984D).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding + 15, 'rocket1').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, game.config.width / 2 + 30, game.config.height - borderUISize - borderPadding + 15, 'rocket2').setOrigin(0.5, 0);



        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);





        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8, first: 0 }),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Minecraft',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text(config.width - borderUISize * 5, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);



        //countdown Timer
        this.countdown = 30;
        //timer config
        let timerConfig = {
            fontFamily: 'Minecraft',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#843605',
            align: 'center',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 50
        }

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                {
                    if (!this.gameOver) {
                        this.countdown -= 1;
                        this.countdownDisplay = this.add.text(borderUISize * 9, borderUISize + borderPadding * 2, this.countdown, timerConfig);
                    }
                }
            },
            callbackScope: this,
            loop: true
        });



        // GAME OVER flag
        this.gameOver = false;
        // 30-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(30000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // 10-second later space ship speed up
        this.clock = this.time.delayedCall(10000, () => {
            this.ship01.moveSpeed += 2;
            this.ship01.points += 10;
            this.ship02.moveSpeed += 2;
            this.ship02.points += 5;
            this.ship03.moveSpeed += 1;
            this.ship03.points += 0;
            this.ship04.moveSpeed += 1;
            this.ship04.points += 0;
            this.ship04.moveSpeed += 1;
            this.ship04.points += 5;
        }, null, this);

        // 20-second later space ship speed up
        this.clock = this.time.delayedCall(20000, () => {
            this.ship01.moveSpeed += 3;
            this.ship01.points += 20;
            this.ship02.moveSpeed += 3;
            this.ship02.points += 10;
            this.ship03.moveSpeed += 2;
            this.ship03.points += 0;
            this.ship04.moveSpeed += 2;
            this.ship04.points += 0;
            this.ship04.moveSpeed += 1;
            this.ship04.points += 5;
        }, null, this);

        //display fire
        let fireConfig = {
            fontFamily: 'Minecraft',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 100
        }

        this.FireNotice = this.add.text(borderUISize * 2, borderUISize + borderPadding * 2, 'FIRE', fireConfig);

    }

    preload() {
        // load images/tile sprites
        this.load.image('Windfield', './assets/Windfield.png');
        this.load.image('SBK_covered', './assets/SBK_covered.png');
        this.load.image('spaceship', './assets/Slime.png');
        this.load.image('spaceship2', './assets/Slime.png');
        this.load.image('spaceship3', './assets/Slime2.png');
        this.load.image('rocket1', './assets/Fire_P1.png');
        this.load.image('rocket2', './assets/Fire_P2.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion2.png', { frameWidth: 28, frameHeight: 28, startFrame: 0, endFrame: 8 });




    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }


        if (!this.gameOver) {
            this.field.tilePositionX += 2;
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships
            this.ship02.update();
            this.ship03.update();           // update spaceships
            this.ship04.update();
            this.ship05.update();
        }


        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
        }


        // check collisions player 2
        if (this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p2Rocket, this.ship05)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship05);
        }




        if (this.p1Rocket.isFiring) {
            this.FireNotice.setVisible(true);

        } else {
            this.FireNotice.setVisible(false);
        }

        if (this.p2Rocket.isFiring) {
            this.FireNotice.setVisible(true);

        } else {
            this.FireNotice.setVisible(false);
        }

    }


    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;

        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        this.p1Score += ship.points;
        this.scoreRight.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }


}

