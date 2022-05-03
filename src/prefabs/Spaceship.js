class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, "ship_move");
        scene.add.existing(this);
        this.moveSpeed = 3;
        this.minSpeed = 3;
        this.maxSpeed = 6;
        this.acceleration = 0.01;
        this.isMoving = false;
        this.life = 5;

        this.original_x = this.x;
        this.original_y = this.y;
    }

    update() {

        // Player 8 direction movement
        var hInput = keyRight_P1.isDown - keyLeft_P1.isDown;
        var vInput = keyDown_P1.isDown - keyUp_P1.isDown;
        var moveDir = (new Phaser.Math.Vector2(hInput, vInput)).normalize();
        var moveX = moveDir.dot(new Phaser.Math.Vector2(1, 0));
        var moveY = moveDir.dot(new Phaser.Math.Vector2(0, 1));

        if (hInput != 0 | vInput != 0) {
            //update original xy for angle calculation
            this.original_x = this.x;
            this.original_y = this.y;

            //modify xy
            this.x += moveX * this.moveSpeed;
            this.y += moveY * this.moveSpeed;

            //rotate space ship
            this.rotation = Phaser.Math.Angle.Between(this.y, this.original_x, this.original_y, this.x);

            this.isMoving = true;
        }

        if (hInput === 0 && vInput === 0) {
            this.isMoving = false;
        }

        if (this.isMoving === true && this.moveSpeed <= this.maxSpeed) {
            this.anims.play("ship_move", true);
            this.moveSpeed += this.acceleration;
        } else if (this.isMoving === false) {
            this.anims.play("ship_move", false);
            this.moveSpeed = this.minSpeed;
        }

        // Player collision vs. borders
        if (this.x - this.width/2 <= 0) {
            this.x = this.width/2;
        }
        if (this.x + this.width/2 >= game.config.width) {
            this.x = game.config.width - this.width/2;
        }
        if (this.y - this.height/2 <= 0) {
            this.y = this.height/2;
        }
        if (this.y + this.height/2 >= game.config.height) {
            this.y = game.config.height - this.height/2;
        }
    }
}
