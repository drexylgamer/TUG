class Item {
    renderAttackCone(ctx, player, mouseX, mouseY) {
        // Center the cone on the middle of the player sprite (top-left + half width/height)
        const centerX = player.x - player.width/scaleFactor;
        const centerY = player.y + player.height/scaleFactor; // Adjusted to center on the top of the player
        const direction = new Vector2(mouseX - centerX, mouseY - centerY).normalize();
        const angle = Math.atan2(direction.y, direction.x);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(
            0,
            0,
            this.range + player.range,
            angle - (this.coneAngle + player.attackCone * Math.PI/180) / 2,
            angle + (this.coneAngle + player.attackCone * Math.PI/180) / 2
        );
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 113, 113, 0.3)";
        ctx.fill();
        ctx.restore();
    }
    constructor(image, damage, range, cooldown, coneAngleDegrees, scaleFactor = 1, knockback = 10) {
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
        this.scaleFactor = scaleFactor;
        this.knockback = knockback; // Knockback strength

        canvas.addEventListener("click", (event) => {
            if (!paused && this.canUse() && player.itemInHand === this) {
                const rect = canvas.getBoundingClientRect();
                const mousePos = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
                // Use player center for attack direction
                const centerX = player.x + player.width / 2;
                const centerY = player.y + player.height / 2;
                const attackDirection = mousePos.clone().subtract(new Vector2(centerX, centerY)).normalize();
                const attackAngle = Math.atan2(attackDirection.y, attackDirection.x);
                // ...existing code...
                // Find all enemies hit
                const hitEnemies = [];
                for (const enemy of enemies) {
                    const toEnemy = new Vector2(enemy.x - player.x, enemy.y - player.y);
                    const distance = toEnemy.length();
                    if (distance > this.range + player.range) continue;
                    const toEnemyAngle = Math.atan2(toEnemy.y, toEnemy.x);
                    let diff = toEnemyAngle - attackAngle;
                    // Normalize angle to [-PI, PI]
                    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
                    if (Math.abs(diff) < (this.coneAngle + player.attackCone* Math.PI / 180) / 2) {
                        hitEnemies.push(enemy);
                    }
                }
                // Split damage among hit enemies
                const splitDamage = hitEnemies.length > 0 ? this.damage + player.damage / hitEnemies.length : 0;
                const slpitKnockback = hitEnemies.length > 0 ? this.knockback / hitEnemies.length : 0;
                for (const enemy of hitEnemies) {
                    enemy.takeDamage(splitDamage);
                    // Optional: apply knockback
                    const toEnemy = new Vector2(enemy.x - player.x, enemy.y - player.y);
                    const knockback = toEnemy.clone().normalize().multiply(slpitKnockback);
                    enemy.x += knockback.x;
                    enemy.y += knockback.y;
                }
                // Set cooldown after attack
                if (hitEnemies.length > 0) {
                    this.lastUsed = Date.now();
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
            this.width*this.scaleFactor,
            this.height*this.scaleFactor
        );
    }
}