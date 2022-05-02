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
    }

    update() {
        // Player 8 direction movement
        var hInput = keyRight_P1.isDown - keyLeft_P1.isDown;
        var vInput = keyDown_P1.isDown - keyUp_P1.isDown;
        var moveDir = (new Phaser.Math.Vector2(hInput, vInput)).normalize();
        var moveX = moveDir.dot(new Phaser.Math.Vector2(1, 0));
        var moveY = moveDir.dot(new Phaser.Math.Vector2(0, 1));

        if (keyUp_P1.isDown) {
            this.play("ship_move", true);
        }else{
            this.play("ship_move", false);
        }

        if (hInput != 0 | vInput != 0) {
            this.x += moveX * this.moveSpeed;
            this.y += moveY * this.moveSpeed;
            this.isMoving = true;
        }

        if (hInput === 0 && vInput === 0) {
            this.isMoving = false;
        }

        if (this.isMoving === true && this.moveSpeed <= this.maxSpeed) {
            this.moveSpeed += this.acceleration;
        } else if (this.isMoving === false) {
            this.moveSpeed = this.minSpeed;
        }

        // Player collision vs. borders
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x + this.width >= game.config.width) {
            this.x = game.config.width - this.width;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y + this.height >= game.config.height) {
            this.y = game.config.height - this.height;
        }
    }
}
