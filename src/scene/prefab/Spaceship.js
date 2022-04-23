class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
    }
    
    update() {
        // Player movement
        var hInput = keyRight_P1.isDown - keyLeft_P1.isDown;
        var vInput = keyDown_P1.isDown - keyUp_P1.isDown;
        var moveDir = (new Phaser.Math.Vector2(hInput, vInput)).normalize();
        var moveX = moveDir.dot(new Phaser.Math.Vector2(1, 0));
        var moveY = moveDir.dot(new Phaser.Math.Vector2(0, 1));

        if(hInput != 0 | vInput != 0) {
            this.x += moveX * this.moveSpeed;
            this.y += moveY * this.moveSpeed;
        }
    }
}
