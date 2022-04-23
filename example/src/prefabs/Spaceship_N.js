// Spaceship prefab
class Spaceship3 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);     // add to existing scene
        this.points = 50;            // store pointValue
        this.moveSpeed = 6;         // pixels per frame
    }

    update() {
        // move spaceship left
        this.x += this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x >= game.config.width) {
            this.reset();
        }
    }

    reset(){
        this.x = 0;
    }
}