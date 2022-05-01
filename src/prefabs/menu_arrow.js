class Menu_arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        // var declare
        this.locate = 1;              //start 1, duo 2, credit 3, quit 4
        this.moveSpeed_12 = 195;
        this.moveSpeed_23 = 200;
        this.moveSpeed_34 = 160;

        this.scene = scene;
        //add sound effect
        this.sfx_move = scene.sound.add("move_menu");

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyD)) {         //move to right                     
            if (this.locate == 1) {
                this.x += this.moveSpeed_12;
                this.sfx_move.play();
                this.locate++;
            } else if (this.locate == 2) {
                this.x += this.moveSpeed_23;
                this.sfx_move.play();
                this.locate++;
            } else if (this.locate == 3) {
                this.x += this.moveSpeed_34;
                this.sfx_move.play();
                this.locate++;
            }//inner if end
        }//if end

        if (Phaser.Input.Keyboard.JustDown(keyA)) {         //move to left
            if (this.locate == 2) {
                this.x -= this.moveSpeed_12;
                this.sfx_move.play();
                this.locate--;
            } else if (this.locate == 3) {
                this.x -= this.moveSpeed_23;
                this.sfx_move.play();
                this.locate--;
            } else if (this.locate == 4) {
                this.x -= this.moveSpeed_34;
                this.sfx_move.play();
                this.locate--;
            }//inner if end
        }//if end
    }// update end

}

