class Asteroid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player1PosX, playerPosY, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.player1Pos = new Phaser.Math.Vector2(player1PosX, playerPosY);
        this.asteroidPos = new Phaser.Math.Vector2(x, y);
        this.moveDir = new Phaser.Math.Vector2(this.player1Pos.x - this.asteroidPos.x, this.player1Pos.y - this.asteroidPos.y).normalize();
        this.moveSpeed = 1;
        this.acceleration = 0.01;
        this.lifeTime = 15;
        this.scene = scene;
        this.Spcaeship = scene.Player1;
        this.isUpdate = true;
        this.clock = scene.time.delayedCall(this.lifeTime * 1000, () => {
            this.isUpdate = false;
        })

        this.sfx_asteroid = scene.sound.add('sfx_rock_impact');
        this.sfx_onHit = scene.sound.add("sfx_spaceshipOnHit");


        //play animation one time
        this.anims.play("asteroid_spawn_anim", false);
    }

    update() {
        // Asteroid movement
        // When an asteroid is created in the scene, it will move toward where the player is when the asteroid is created at a speed of this.moveSpeed, with an acceleration of this.acceleration;
        this.moveX = this.moveDir.dot(new Phaser.Math.Vector2(1, 0));
        this.moveY = this.moveDir.dot(new Phaser.Math.Vector2(0, 1));
        this.moveSpeed += this.acceleration;
        this.x += this.moveX * this.moveSpeed;
        this.y += this.moveY * this.moveSpeed;

        // Asteroid Collision vs. borders
        // The Vector2() function is defined in Main.js
        if (this.x + this.width >= game.config.width) {
            this.sfx_asteroid.play();
            this.moveDir = this.moveDir.reflect(Vector2(-1, 0));
        }
        if (this.x <= 0) {
            this.sfx_asteroid.play();
            this.moveDir = this.moveDir.reflect(Vector2(1, 0));
        }
        if (this.y + this.height >= game.config.height) {
            this.sfx_asteroid.play();
            this.moveDir = this.moveDir.reflect(Vector2(0, 1));
        }
        if (this.y <= 0) {
            this.sfx_asteroid.play();
            this.moveDir = this.moveDir.reflect(Vector2(0, -1));
        }

        /*
        // Aseteroid Collision vs. Spaceship
        // Using AABB Collision
        if (   this.x < this.Spcaeship.x + this.Spcaeship.width
            && this.x + this.width > this.Spcaeship.x 
            && this.y < this.Spcaeship.y + this.Spcaeship.height
            && this.y + this.height > this.Spcaeship.y) {
                this.Spcaeship.life -= 1;
                this.isUpdate = false;
                Play_solo.cameras.main.shake(100, 0.005);
                Play_solo.sound.play("sfx_spaceshipOnHit");
            }
        */
    }



}