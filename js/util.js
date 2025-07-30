// Constants

const scaleFactor = 4
const canvasSize = 800
const playerSpeed = 5

const keysPressed = new Set(); 

class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // Normalize the Vector
    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        if (length !== 0) {
            this.x = this.x / length * playerSpeed;
            this.y = this.y / length * playerSpeed;
        }
    }

    static ZERO = new Vector2(0, 0)
}