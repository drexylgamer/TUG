class Player {
    constructor(x, y, speed, itemSlot1, itemSlot2, itemSlot3, itemSlot4, health) {
        this.x=x
        this.y=y
        this.speed=speed
        this.itemSlot1=itemSlot1
        this.itemSlot2=itemSlot2
        this.itemSlot3=itemSlot3
        this.itemSlot4=itemSlot4
        this.width=11
        this.height=18
        this.direction = Vector2.ZERO
        this.health=health
        this.itemInHand = itemSlot1 // Default item in hand
        
    }

    update() {
        if(this.health <= 0) {
            running = false;
        }

        if (keysPressed.has("1")) {
            this.itemInHand = this.itemSlot1;
        }
        if (keysPressed.has("2")) {     
            this.itemInHand = this.itemSlot2;
        }
        if (keysPressed.has("3")) {
            this.itemInHand = this.itemSlot3;
        }
        if (keysPressed.has("4")) {
            this.itemInHand = this.itemSlot4;
        }

        // Build input vector
        let input = new Vector2(0, 0);
        if (keysPressed.has("w")) input.y -= 1;
        if (keysPressed.has("a")) input.x -= 1;
        if (keysPressed.has("s")) input.y += 1;
        if (keysPressed.has("d")) input.x += 1;

        input.normalize();

        const ACCELERATION = 1.2;
        const FRICTION = 0.88;
        const MAX_SPEED = this.speed;

        // Accelerate in input direction
        this.direction.x += input.x * ACCELERATION;
        this.direction.y += input.y * ACCELERATION;

        // Apply friction
        this.direction.x *= FRICTION;
        this.direction.y *= FRICTION;

        // Clamp to max speed
        this.direction.clampLength(MAX_SPEED);

        // Predict new position
        const nextX = this.x + this.direction.x;
        const nextY = this.y + this.direction.y;

        const halfW = (this.width * scaleFactor) / 2;
        const halfH = (this.height * scaleFactor) / 2;

        // Apply canvas boundary collision
        if (nextX - halfW >= 0 && nextX + halfW <= canvasSize) {
            this.x = nextX;
        } else {
            this.direction.x = 0;
        }

        if (nextY - halfH >= 0 && nextY + halfH <= canvasSize) {
            this.y = nextY;
        } else {
            this.direction.y = 0;
        }
    }


    render(ctx) {
        let image = new Image
        image.src = "./assets/player/player1.png"
        image.onload = () => {
            ctx.clearRect(0, 0, canvasSize, canvasSize)
            ctx.drawImage(
                image, 
                this.x-this.width*scaleFactor/2, 
                this.y-this.height*scaleFactor/2, 
                this.width*scaleFactor, 
                this.height*scaleFactor)
            }
    }
}