class Enemy {
    constructor(x, y, speed, id, health) {
        this.x=x
        this.y=y
        this.speed=speed
        this.id=id
        this.width=11
        this.height=18
        this.velocity = new Vector2(0, 0);
    }
    
    getDirectionToPlayer(player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const direction = new Vector2(dx, dy);
        direction.normalize();
        return direction;
    };

    update(player, enemies) {
        // --- Chase Player ---
        const chaseDir = this.getDirectionToPlayer(player);

        // --- Apply movement toward player ---
        const acceleration = this.speed * 0.2; // reduce acceleration
        this.velocity.x += chaseDir.x * acceleration;
        this.velocity.y += chaseDir.y * acceleration;

        // --- Knockback from Player if colliding ---
        if (isColliding(this, player, false)) {
            const awayFromPlayer = new Vector2(this.x - player.x, this.y - player.y);
            awayFromPlayer.normalize();
            this.velocity.x += awayFromPlayer.x * 3; // knockback strength
            this.velocity.y += awayFromPlayer.y * 3;
            player.health -= 1
        }

        // --- Knockback from other enemies ---
        for (const other of enemies) {
            if (other !== this && isColliding(this, other, true)) {
                const awayFromOther = new Vector2(this.x - other.x, this.y - other.y);
                awayFromOther.normalize();
                this.velocity.x += awayFromOther.x * 1.5; // softer knockback
                this.velocity.y += awayFromOther.y * 1.5;
            }
        }

        // --- Apply friction (optional) ---
        this.velocity.x *= 0.9;
        this.velocity.y *= 0.9;

        // --- Update position ---
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // --- Keep within bounds ---
        this.x = Math.max(this.width, Math.min(canvasSize - this.width, this.x));
        this.y = Math.max(this.height, Math.min(canvasSize - this.height, this.y));
    }

    render(ctx) {
        // let image = new Image
        // image.src = "./assets/player/player1.png"
        // image.onload = () => {
        //    ctx.clearRect(0, 0, canvasSize, canvasSize)
        //    ctx.drawImage(
        //        image, 
        //        this.x-this.width*scaleFactor/2, 
        //        this.y-this.height*scaleFactor/2, 
        //        this.width*scaleFactor, 
        //        this.height*scaleFactor)
        // }
        ctx.fillStyle = "red"
        ctx.fillRect(this.x-this.width*enemyScaleFactor/2,this.y-this.height*enemyScaleFactor/2, this.width*enemyScaleFactor, this.height*enemyScaleFactor)
    }
}