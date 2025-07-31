// ------------
// CONSTANTS
// ------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = new Player(400, 400, playerMaxSpeed, null, null, null, null, 100);
var enemies = []
var running = true;

for(let i=0; i<enemyAmount; i++) {
    enemies.push(new Enemy(randomIntegerBetween(0, 800), randomIntegerBetween(0, 800), enemyMaxSpeed, i, 5))
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
    drawNumber(player.health, ctx);

    if (running==false) {
        gameOver()
    } else {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

function gameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    requestAnimationFrame(gameOver)

    addEventListener("click", () => {
        location.reload();
    });
}