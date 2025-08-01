// Constants


const scaleFactor = 4
const canvasSize = window.innerHeight
const enemyAmount = 10
const enemyScaleFactor = 2
const enemyHealth = 10;

const ACCELERATION = 2;
const FRICTION = 0.8;
const playerMaxSpeed = 10;
const enemyMaxSpeed = 1;

const keysPressed = new Set(); 

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});



class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get ZERO() {
        return new Vector2(0, 0);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const len = this.length();
        if (len > 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }

    distanceTo(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    angleTo(v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    clampLength(maxLength) {
        const len = this.length();
        if (len > maxLength) {
            this.normalize();
            this.multiplyScalar(maxLength);
        }
        return this;
    }
}

function randomIntegerBetween(num1, num2) {
    const min = Math.ceil(Math.min(num1, num2));
    const max = Math.floor(Math.max(num1, num2));
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function angleBetween(v1, v2) {
    const dot = v1.clone().normalize().dot(v2.clone().normalize());
    return Math.acos(Math.max(-1, Math.min(1, dot))); // Clamp to avoid NaNs
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
    ctx.font = "50px \"Bitcount Prop Single\", system-ui";
    ctx.fillText(Math.round(number), 10, 50)
}