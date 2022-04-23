class Asteroid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player1PosX, playerPosY, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.player1Pos = new Phaser.Math.Vector2(player1PosX, playerPosY);
        this.asteroidPos = new Phaser.Math.Vector2(x, y);
        this.moveDir = new Phaser.Math.Vector2(this.player1Pos.x - this.asteroidPos.x, this.player1Pos.y - this.asteroidPos.y).normalize();
        this.moveSpeed = 1;
        this.acceleration = 0.01;
        
        this.lifeTime = 100;

        this.clock = scene.time.delayedCall(this.lifeTime * 1000, () => {
            this.destroy();
        })
    }
    
    update() {
        // Asteroid movement
        // When an asteroid is created in the scene, it will move toward where the player is when the asteroid is created at a speed of this.moveSpeed, with an acceleration of this.acceleration;
        this.moveX = this.moveDir.dot(new Phaser.Math.Vector2(1, 0));
        this.moveY = this.moveDir.dot(new Phaser.Math.Vector2(0,1));
        this.moveSpeed += this.acceleration;
        this.x += this.moveX * this.moveSpeed;
        this.y += this.moveY * this.moveSpeed;

        // Asteroid Collision vs. borders
        // The Vector2() function is defined in Main.js
        if (this.x + this.width >= game.config.width) {
            this.moveDir = this.moveDir.reflect(Vector2(-1,0));
        } 
        if (this.x <= 0) {
            this.moveDir = this.moveDir.reflect(Vector2(1, 0));
        } 
        if (this.y + this.height >= game.config.height) {
            this.moveDir = this.moveDir.reflect(Vector2(0, 1));
        } 
        if (this.y <= 0) {
            this.moveDir = this.moveDir.reflect(Vector2(0, -1));
        }

        
    }

    

}