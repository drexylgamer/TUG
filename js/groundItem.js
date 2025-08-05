class groundItem {
    constructor(image, x, y, xpAmount, healthAmount, rangeAmount, attackConeAmount, damageAmount, scaleFactor = 1) {
        this.image = new Image();
        this.image.src = image; // Load the image
        this.image.onload = () => {
            this.width = this.image.width * scaleFactor;
            this.height = this.image.height * scaleFactor;
        };
        this.x = x;
        this.y = y;
        this.scaleFactor = scaleFactor;
        this.collected = false; // Track if the item has been collected
        this.xpAmount = xpAmount; // Amount of XP to give
        this.healthAmount = healthAmount; // Amount of health to restore
        this.rangeAmount = rangeAmount; // Amount of range to increase
        this.attackConeAmount = attackConeAmount; // Amount of attack cone to increase
        this.damageAmount = damageAmount; // Amount of damage to increase
        this.width *= scaleFactor; // Scale the width
        this.height *= scaleFactor; // Scale the height
    }
    render(ctx) {
        if (!this.collected) {
            ctx.drawImage(
                this.image,
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width,
                this.height
            );
        }
    }

    collect(player) {
        if (!this.collected) {
            player.xp += this.xpAmount; // Increase player's XP
            player.health = Math.min(player.maxHealth, player.health + this.healthAmount); // Restore health without exceeding max health
            player.range += this.rangeAmount; // Increase range
            player.attackCone += this.attackConeAmount; // Increase attack cone
            player.damage += this.damageAmount; // Increase damage
            this.collected = true; // Mark the item as collected
        }
    }
    isColliding(player) {
        return (
            player.x - player.width * scaleFactor / 2 < this.x - this.width / 2 + this.width &&
            player.x - player.width * scaleFactor / 2 + player.width * scaleFactor > this.x - this.width / 2 &&
            player.y - player.height * scaleFactor / 2 < this.y - this.height / 2 + this.height &&
            player.y - player.height * scaleFactor / 2 + player.height * scaleFactor > this.y - this.height / 2
        );
    }
}