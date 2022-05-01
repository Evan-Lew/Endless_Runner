class Menu_1 extends Phaser.Scene {
    constructor() {
        super("menuScene_1");
    }

    preload() {
        // Load sfx
        this.load.audio('sfx_select', './assets/select_menu.mp3');
        this.load.audio('move_menu', './assets/move_menu.wav');
        // preload background
        this.load.image('Menu_background', './assets/EndlessRunner1.2.png');
        // preload arrow 
        this.load.image('Menu_arrow', './assets/arrow.png')
    }

    create() {

        // key input init
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //      init end

        // background load, may be used for animation
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'Menu_background').setOrigin(0, 0);
        // load arrow
        this.arrow = new Menu_arrow(this, 310, 610, 'Menu_arrow').setOrigin(0, 0);

    }



    update() {
        //update arrow
        this.arrow.update();


        //enter key interaction
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            if (this.arrow.locate == 1) {
                this.sound.play('sfx_select');
                this.scene.start("playSoloScene");
            } else if (this.arrow.locate == 2) {
                this.sound.play('sfx_select');
                this.scene.start("tutorialScene");
            } else if (this.arrow.locate == 3) {
                this.sound.play('sfx_select');
                this.scene.start("creditScene");
            } else if (this.arrow.locate == 4) {
                this.sound.play('sfx_select');
                close();
            }//inner if end
        }//if end


    }
}