class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/select_menu.mp3');
    }

    create() {
        this.tutorialConfig = {
            fontFamily: 'PixelFont',
            fontSize: "60px",
            color: "#FFFFFF"
        }

        this.add.text(game.config.width / 2, game.config.height / 2 - game.config.height / 3, "Tutorial", this.tutorialConfig).setOrigin(0.5);

        this.tutorialConfig.fontSize = "30px";

        this.text1 = this.add.text(game.config.width / 2, game.config.height / 2 - game.config.height / 8, "Stay Alive As Long As You Can!", this.tutorialConfig).setOrigin(0.5);
        this.text2 = this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 20, "[W]", this.tutorialConfig).setOrigin(0, 0);
        this.text3 = this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 60, "[S]", this.tutorialConfig).setOrigin(0, 0);
        this.text4 = this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 100, "[A]", this.tutorialConfig).setOrigin(0, 0);
        this.text5 = this.add.text(game.config.width / 2 - game.config.width / 10, game.config.height / 2 + 140, "[D]", this.tutorialConfig).setOrigin(0, 0);

        this.text6 = this.add.text(game.config.width / 2 + game.config.width / 10 + 5, game.config.height / 2 + 20, " Move Up", this.tutorialConfig).setOrigin(1, 0);
        this.text7 = this.add.text(game.config.width / 2 + game.config.width / 10 + 55, game.config.height / 2 + 60, " Move Down", this.tutorialConfig).setOrigin(1, 0);
        this.text8 = this.add.text(game.config.width / 2 + game.config.width / 10 + 52, game.config.height / 2 + 100, " Move Left", this.tutorialConfig).setOrigin(1, 0);
        this.text9 = this.add.text(game.config.width / 2 + game.config.width / 10 + 67, game.config.height / 2 + 140, " Move Right", this.tutorialConfig).setOrigin(1, 0);


        this.text10 = this.add.text(game.config.width / 16, game.config.height / 9, "← ESC", this.tutorialConfig).setOrigin(0, 0);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (keyESC.isDown) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene_1");
        }
    }

}

