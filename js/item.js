class Item {
    constructor(image, damage, range, cooldown, coneAngleDegrees) {
        this.damage = damage;
        this.range = range;
        this.cooldown = cooldown; // in milliseconds
        this.lastUsed = 0;
        this.coneAngle = coneAngleDegrees * (Math.PI / 180); // convert to radians
        this.attackCone = {
            direction: null,
            range: this.range,
            angle: this.coneAngle, // 60 degrees
            timer: 0
        };
        this.image = new Image();
        this.image.src = image;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };

        canvas.addEventListener("click", (event) => {
            if (!paused && this.canUse() && player.itemInHand === this) {
                const rect = canvas.getBoundingClientRect();
                const mousePos = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
    
                const attackDirection = mousePos.clone().subtract(new Vector2(player.x, player.y)).normalize();
    
                // Find all enemies hit
                const hitEnemies = [];
                for (const enemy of enemies) {
                    const toEnemy = new Vector2(enemy.x - player.x, enemy.y - player.y);
                    const distance = toEnemy.length();
                    if (distance > this.range) continue;
                    const angle = angleBetween(attackDirection, toEnemy);
                    if (angle < this.attackCone.angle) {
                        hitEnemies.push(enemy);
                    }
                }
                // Split damage among hit enemies
                const splitDamage = hitEnemies.length > 0 ? this.damage / hitEnemies.length : 0;
                for (const enemy of hitEnemies) {
                    enemy.takeDamage(splitDamage);
                    // Optional: apply knockback
                    const toEnemy = new Vector2(enemy.x - player.x, enemy.y - player.y);
                    const knockback = toEnemy.clone().normalize().multiply(10);
                    enemy.x += knockback.x;
                    enemy.y += knockback.y;
                }
            }
        });
    }

    canUse() {
        return Date.now() - this.lastUsed >= this.cooldown;
    }

    

    render(ctx, player) {
        ctx.drawImage(
            this.image,
            player.x + 10,
            player.y,
            this.width*2,
            this.height*2
        );
    }
}