class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('sfx_bgm', './assets/BGM.wav');
    }

    create() {

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
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
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'SLIME PATROL', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use Key A and D to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Use Key S to slow down the rocket speed', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize*2 + borderPadding*2, 'Press A for Novice or D for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize*3 + borderPadding*3, 'Press R for DUO MODE', menuConfig).setOrigin(0.5);
        //variable that loop bgm
        this.bgm = this.sound.add('sfx_bgm', {loop: true});

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            // ez mode
            game.settings = {
                spaceshipSpeed: 3,
            }
            this.sound.play('sfx_select');    
            this.bgm.play();
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
            }
            this.sound.play('sfx_select');
            this.bgm.play();
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
            }
            this.sound.play('sfx_select');
            this.scene.start("menuScene2");
        }
    }
}