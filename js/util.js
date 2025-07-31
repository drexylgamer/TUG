// Constants

const scaleFactor = 4
const canvasSize = window.innerHeight
const enemyAmount = 10
const enemyScaleFactor = 2

const ACCELERATION = 2;
const FRICTION = 0.8;
const playerMaxSpeed = 10;
const enemyMaxSpeed = 1;

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

function randomIntegerBetween(num1, num2) {
    const min = Math.ceil(Math.min(num1, num2));
    const max = Math.floor(Math.max(num1, num2));
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isColliding(a, b, isEnemy) {
    if(isEnemy) {
        return (
            a.x-a.width*enemyScaleFactor/2 < b.x-b.width*enemyScaleFactor/2 + b.width*enemyScaleFactor &&
            a.x-a.width*enemyScaleFactor/2 + a.width*enemyScaleFactor > b.x-b.width*enemyScaleFactor/2 &&
            a.y-a.height*enemyScaleFactor/2 < b.y-b.height*enemyScaleFactor/2 + b.height*enemyScaleFactor &&
            a.y-a.height*enemyScaleFactor/2 + a.height*enemyScaleFactor > b.y-b.height*enemyScaleFactor/2
        );
    }
    return (
        a.x-a.width*enemyScaleFactor/2 < b.x-b.width*scaleFactor/2 + b.width*scaleFactor &&
        a.x-a.width*enemyScaleFactor/2 + a.width*enemyScaleFactor > b.x-b.width*scaleFactor/2 &&
        a.y-a.height*enemyScaleFactor/2 < b.y-b.height*scaleFactor/2 + b.height*scaleFactor &&
        a.y-a.height*enemyScaleFactor/2 + a.height*enemyScaleFactor > b.y-b.height*scaleFactor/2
    );
}

function drawNumber(number, ctx) {
    ctx.fillStyle = "blue";
    ctx.font = "50px \"Google Sans Code\", monospace";
    ctx.fillText(Math.round(number), 10, 50)
}