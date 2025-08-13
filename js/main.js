// ------------
// CONSTANTS
// ------------

const player = new Player(
    400,
    400,
    playerMaxSpeed,
    TEAPOT,
    SWORD_IN_THE_STONE,
    SWITCH,
    BRICK,
    100
); // Player starts with a teacup
const body = document.querySelector("body");
const groundItems = [];
var enemies = []
var running = true;
var paused = false;



// ------------
// INPUT
// ------------

window.addEventListener("keydown", (e) => {
    keysPressed.add(e.key.toLowerCase())
})

window.addEventListener("keyup", (e) => {
    keysPressed.delete(e.key.toLowerCase())
})
window.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})
window.addEventListener("click", (e) => {
    e.preventDefault()
})

window.addEventListener('resize', () => {
    canvas.width = canvasSizeX = window.innerWidth;
    canvas.height = canvasSizeY = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
});

// ------------
// CANVAS
// ------------

canvas.width = canvasSizeX;
canvas.height = canvasSizeY;
ctx.imageSmoothingEnabled = false;

// ------------
// GAME LOOP
// ------------

function gameLoop() {
    ctx.clearRect(0, 0, canvasSizeX, canvasSizeY);
    const item = player.itemInHand;
    item.renderAttackCone(ctx, player, mouseX, mouseY);
    if (player.health > maxHealth) {
        player.health = maxHealth; // Cap health at maxHealth
    }
    player.health += 0.005; // Regenerate health over time
    player.update();
    // Draw player
    player.render(ctx);
    // Draw ground items first
    for (let i=0; i < groundItems.length; i++) {
        if (groundItems[i].collected) continue; // Skip collected items
        groundItems[i].render(ctx);
    }
    // Draw item in hand
    if (player.itemInHand) {
        player.itemInHand.render(ctx, player);
    }
    // Draw enemies
    for (let enemy of enemies) {
        enemy.update(player, enemies);
        enemy.render(ctx);
    }
    if (randomIntegerBetween(0, 1) < 1 && groundItems.length < 5) {
        groundItem = GroundItem.randomItem();
        groundItems.push(new GroundItem(
            groundItem.image.src,
            randomIntegerBetween(0, canvasSizeX),
            randomIntegerBetween(0, canvasSizeY),
            groundItem.xpAmount,
            groundItem.healthAmount,
            groundItem.rangeAmount,
            groundItem.attackConeAmount,
            groundItem.damageAmount,
            groundItem.scaleFactor
        ));
    }
    enemies = enemies.filter(enemy => enemy.alive);
    if (enemies.length < 1000) {
        randomIntegerBetween(0, enemyChance) < 1 && enemies.push(new Enemy(randomIntegerBetween(0, canvasSizeX), randomIntegerBetween(0, canvasSizeY), enemyMaxSpeed, enemies.length, enemyHealth));
    }
    if (running==false) {
        gameOver()
    } else if (!paused) {
        requestAnimationFrame(gameLoop);
    }
    if (enemyChance < 1) {
        enemyChance = 1; // Prevents enemyChance from going below 1
    }
    enemyChance -= 0.01; // Gradually increase enemy spawn chance
}


gameLoop();

function gameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.font = "14px Arial";
    ctx.fillText("Click or press space to restart.", canvas.width / 2 - 80, canvas.height / 2 + 40);
    requestAnimationFrame(gameOver)

    addEventListener("click", () => {
        location.reload();
    });
}

addEventListener("keydown", (e) => {
    if( e.key == " " ) {
        if (running) {
            paused = !paused;
            if (!paused) {
                gameLoop();
            } else {
                
                for (let enemy of enemies) {
                    enemy.update(player, enemies);
                }
                drawNumber(player.health, ctx);
            }
        } else {
            location.reload(); // Restart the game if it's over
        }
    }
})

function alwaysRunning() {
    if(running) {
        player.render(ctx);
        for (let enemy of enemies) {
            enemy.render(ctx);
        }
        drawNumber(player.health, ctx);
        requestAnimationFrame(alwaysRunning);
    }
    const rect = canvas.getBoundingClientRect();

    // Update direction
    const dx = mouseX - player.x;
    const dy = mouseY - player.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length > 0 && player.itemInHand && player.itemInHand.attackCone) {
        player.itemInHand.attackCone.direction = new Vector2(dx / length, dy / length);
    }
    if(paused) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Paused", canvas.width / 2 - 50, canvas.height / 2);
    }

}
alwaysRunning()