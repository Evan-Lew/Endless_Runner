class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload() {
        // load select sound effect
        this.load.audio('sfx_select', './assets/select_menu.mp3');
        // preload background
        this.load.image('Credit_background', './assets/credit.png');
    }

    create() {
        // variable that determine if credit page reach the end
        this.creditOver = false;
        this.totalMoveUp = 0;

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //add background sheet
        this.creditBackground = this.add.tileSprite(0, 0, 1280, 720, 'Credit_background').setOrigin(0, 0);

        //add exit text
        this.creditConfig = {
            fontFamily: 'PixelFont',
            fontSize: "20px",
            color: "#FFFFFF"
        }

        this.add.text(20, 20, "esc to return", this.creditConfig).setOrigin(0);

    }

    update() {
        if (!this.creditOver) {
            // -------------Background---------------------
            this.creditBackground.tilePositionY += 0.7;



            this.totalMoveUp += 0.7;
            // stop scrolling when it's reach the end
            if (this.totalMoveUp > 2000) {
                this.creditOver = true;
                this.scene.start("menuScene_1");
                //free memory
                this.creditBackground.destroy();
            }
        }

        //return to menu if press esc
        if (keyESC.isDown) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene_1");
            //free memory
            this.creditBackground.destroy();
        }
    }// update end

}

