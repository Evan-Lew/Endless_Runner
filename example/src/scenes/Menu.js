class Menu2 extends Phaser.Scene {
    constructor() {
        super("menuScene2");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('sfx_bgm', './assets/BGM.wav');
    }

    create() {

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // display menu
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 0
        }
        let menuConfig2 = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 7,
                bottom: 7,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'SLIME PATROL DUO', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Player 1 Use Key A and D to move & (F) to fire', menuConfig2).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Use Key S to slow down the rocket speed', menuConfig2).setOrigin(0.5);
        menuConfig2.backgroundColor = '#00FF00';
        menuConfig2.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize*2 + borderPadding*2, 'Player 2 Press right left to move & up to fire', menuConfig2).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize*3 + borderPadding*3, 'Press down to slow down the rocket', menuConfig2).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize*4 + borderPadding*5, 'Press R to start', titleConfig).setOrigin(0.5);
        //variable that loop bgm
        this.bgm = this.sound.add('sfx_bgm', {loop: true});

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            // Duo mode
            game.settings = {
                spaceshipSpeed: 4,
            }
            this.sound.play('sfx_select');
            this.bgm.play();
            this.scene.start("playScene2");
        }
    }
}