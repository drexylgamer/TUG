class Item {
    constructor(name, damage, range, cooldown, coneAngleDegrees) {
        this.name = name;
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

        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            const mousePos = new Vector2(event.clientX - rect.left, event.clientY - rect.top);

            const attackDirection = mousePos.clone().subtract(new Vector2(player.x, player.y)).normalize();

            for (const enemy of enemies) {
                const toEnemy = new Vector2(enemy.x - player.x, enemy.y - player.y);
                const distance = toEnemy.length();

                if (distance > this.range) continue;

                const angle = angleBetween(attackDirection, toEnemy);

                if (angle < this.attackCone.angle) {
                    enemy.takeDamage(this.damage); // or whatever logic you use
                    // Optional: apply knockback
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

    use(player, mouseX, mouseY, enemies) {
        if (!paused && this.canUse()) {
            const attackRange = this.range; // max distance to hit enemy
            const coneAngle = Math.PI / 4; // 45° cone

            const attackDir = new Vector2(mouseX - player.x, mouseY - player.y);
            attackDir.normalize();

            for (const enemy of enemies) {
                if (enemy && player) {
                    const toEnemy = new Vector2(enemy.x - player.x, enemy.y - player.y);
                    const distance = toEnemy.length();
        
                    if (attackRange >= distance) {
                        const enemyDir = toEnemy.clone().normalize();
                        const angle = Math.acos(attackDir.dot(enemyDir));
        
                        if (angle <= coneAngle / 2) {
                            enemy.takeDamage(this.damage);
                            // optional knockback:
                            enemy.direction = enemyDir.clone().multiply(5);
                        }
                    }
                }
            }
            this.lastUsed = Date.now();
        }
    }
}