class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("spaceship", "assets/test_spaceship.png");
        this.load.image("asteroid", "assets/test_asteroid.png");
    }

    create() {
        // ----------Game/Enviroment settings----------
    
        // Border
        var border = this.add.graphics();
        border.lineStyle(2, 0x0033ff, 1);
        border.strokeRoundedRect(0, 0, 1280, 720, 7);

        // --------------------------------------------





        // --------------Player Related----------------
        
        // Instantiate Spaceship
        this.Player1 = new Spaceship(this, game.config .width / 2, game.config.height / 2, "spaceship").setOrigin(0, 0);

        // Key Inputs (Player1)
        keyLeft_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown_P1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // --------------------------------------------





        // -------------Asteroid Related---------------
        
        // Instantiate Asteroids
        this.input.on("pointerdown", function (pointer) {
            if(pointer.leftButtonDown()) {
                player2.push((new Asteroid(this, pointer.x, pointer.y, this.Player1.x, this.Player1.y, "asteroid")).setOrigin(0,0));
                asteroidCreaded = true;
            }
        }, this);

        // --------------------------------------------
    }

    update() {
        this.Player1.update();
        if(asteroidCreaded) {
            for (var i = 0; i < player2.length; i++) {
                player2[i].update();
            }
        }

    }


}

