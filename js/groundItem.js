class GroundItem {
    constructor(image, x, y, xpAmount, healthAmount, rangeAmount, attackConeAmount, damageAmount, scaleFactor = 1, chanceOfSpawning=1) {
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
        this.chanceOfSpawning = chanceOfSpawning; // Chance of spawning this item
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
            player.health += this.healthAmount; // Restore health
            if (player.health > maxHealth) {
                player.health = maxHealth; // Cap health at maxHealth
            }
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

    static randomItem() {
        const items = [
            BURGER,
            POISONOUS_GRAPE,
            BOLT,
            PILE_OF_RUSTY_SH_T
        ];
            // Calculate total weight
            const totalWeight = items.reduce((sum, item) => sum + (item.chanceOfSpawning || 1), 0);
            let rand = Math.random() * totalWeight;
            for (const item of items) {
                rand -= (item.chanceOfSpawning || 1);
                if (rand <= 0) {
                    return item;
                }
            }
            return items[0]; // fallback
    }
}