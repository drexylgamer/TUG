// Constants

const scaleFactor = 4
const canvasSize = 800

const ACCELERATION = 0.6;
const FRICTION = 0.9;
const playerMaxSpeed = 80;
const enemyMaxSpeed = 7;

const keysPressed = new Set(); 

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get ZERO() {
        return new Vector2(0, 0);
    }

    normalize() {
        const length = Math.hypot(this.x, this.y);
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
    }

    clampLength(max) {
        const length = Math.hypot(this.x, this.y);
        if (length > max) {
            this.x = (this.x / length) * max;
            this.y = (this.y / length) * max;
        }
    }
}