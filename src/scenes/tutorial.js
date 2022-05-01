class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/select_menu.mp3');
    }
    
    create() {
        let tutorialConfig = {
            fontFamily: "PixelFont",
            fontSize: "60px",
            color: "#FFFFFF"
        }

        this.add.text(game.config.width / 2, game.config.height / 2 - game.config.height / 3, "Tutorial", tutorialConfig).setOrigin(0.5);

        tutorialConfig.fontSize = "30px";

        this.add.text(game.config.width / 2, game.config.height / 2 - game.config.height / 8, "Stay Alive As Long As You Can!", tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 20, "{W}", tutorialConfig).setOrigin(0,0);
        this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 60, "{S}", tutorialConfig).setOrigin(0,0);
        this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 100, "{A}", tutorialConfig).setOrigin(0,0);
        this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 140, "{D}", tutorialConfig).setOrigin(0,0);

        this.add.text(game.config.width / 2 + game.config.width / 10, game.config.height / 2 + 20, "Move Up", tutorialConfig).setOrigin(1, 0);
        this.add.text(game.config.width / 2 + game.config.width / 10, game.config.height / 2 + 60, "Move Down", tutorialConfig).setOrigin(1, 0);
        this.add.text(game.config.width / 2 + game.config.width / 10, game.config.height / 2 + 100, "Move Left", tutorialConfig).setOrigin(1, 0);
        this.add.text(game.config.width / 2 + game.config.width / 10, game.config.height / 2 + 140, "Move Right", tutorialConfig).setOrigin(1, 0);


        this.add.text(game.config.width/16, game.config.height/9, "← ESC", tutorialConfig).setOrigin(0,0);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (keyESC.isDown) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene_1");
        }
    }

}

