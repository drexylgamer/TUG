// ------------
// CONSTANTS
// ------------

const teacup = new Item("Teacup", 3, 100, 500, 45); // 500ms cooldown
const player = new Player(400, 400, playerMaxSpeed, teacup, null, null, null, 100); // Player starts with a teacup
var enemies = []
var running = true;
var paused = false;

for(let i=0; i<enemyAmount; i++) {
    enemies.push(new Enemy(randomIntegerBetween(0, canvasSize), randomIntegerBetween(0, canvasSize), enemyMaxSpeed, i, enemyHealth))
}

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

// ------------
// CANVAS
// ------------

canvas.width = canvasSize;
canvas.height = canvasSize;
ctx.imageSmoothingEnabled = false;

// ------------
// GAME LOOP
// ------------

function gameLoop() {
    player.health += 0.01; // Regenerate health over time
    player.update();
    player.render(ctx);
    for (let enemy of enemies) {
        enemy.update(player, enemies);
        enemy.render(ctx);
    }
    enemies = enemies.filter(enemy => enemy.alive);
    randomIntegerBetween(0, 100) < 1 && enemies.push(new Enemy(randomIntegerBetween(0, canvasSize), randomIntegerBetween(0, canvasSize), enemyMaxSpeed, enemies.length, enemyHealth));
    if (running==false) {
        gameOver()
    } else if (!paused) {
        requestAnimationFrame(gameLoop);
    }
    const item = player.itemInHand;
    if (item && item.attackCone && item.attackCone.direction) {
        ctx.save();
        ctx.translate(player.x, player.y);

        const angle = Math.atan2(item.attackCone.direction.y, item.attackCone.direction.x);
        const radius = item.attackCone.range;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, angle - item.attackCone.angle / 2, angle + item.attackCone.angle / 2);
        ctx.closePath();

        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.fill();
        ctx.restore();
}
}

gameLoop();

function gameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    ctx.font = "14px Arial";
    ctx.fillText("Click or press start to restart.", canvas.width / 2 - 80, canvas.height / 2 + 40);
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

canvas.addEventListener("mousemove", (event) => {
    
});

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