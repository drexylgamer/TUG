class Player {
    constructor(x, y, speed, itemSlot1, itemSlot2, itemSlot3, itemSlot4) {
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
    }

    update() {
        // Reset the direction
        this.direction.x = 0;
        this.direction.y = 0;

        // Check which keys have been pressed
        if (keysPressed.has("w")&&this.y>=this.height*2) this.direction.y -= this.speed;
        if (keysPressed.has("a")&&this.x>=this.width*2) this.direction.x -= this.speed;
        if (keysPressed.has("s")&&this.y<=canvasSize-this.height*2) this.direction.y += this.speed;
        if (keysPressed.has("d")&&this.x<=canvasSize-this.width*2) this.direction.x += this.speed;

        // Normalize the direction
        this.direction.normalize();

        // Update the position
        this.x += this.direction.x;
        this.y += this.direction.y;
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