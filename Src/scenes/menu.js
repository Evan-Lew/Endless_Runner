class Menu_1 extends Phaser.Scene {
    constructor() {
        super("menuScene_1");
    }

    preload() {
        // load audio example
        // this.load.audio('sfx_select', './assets/assets_blip_select12.wav');

    }

    preload() {
        // preload background
        this.load.image('Menu_background', './assets/EndlessRunner1.png');
        // preload arrow 
        this.load.image('Menu_arrow', './assets/arrow.png')
    }

    create() {

        // key input init
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        //      init end

        // background load, may be used for animation
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'Menu_background').setOrigin(0, 0);
        // load arrow
        this.arrow = new Menu_arrow(this, 340, 610, 'Menu_arrow').setOrigin(0, 0);
        

    }



    update() {
        //update arrow
        this.arrow.update();          

 

        //enter key interaction
        if (Phaser.Input.Keyboard.JustDown(keyEnter) ){
            if(this.arrow.locate == 1){ 
                this.scene.start("playScene");
            }else if(this.arrow.locate == 2){
                console.log('TO DO: DUO');
            }else if(this.arrow.locate == 3){
                console.log('TO DO: CREDIT');
            }else if(this.arrow.locate == 4){
                close();
            }//inner if end
        }//if end



    }
}