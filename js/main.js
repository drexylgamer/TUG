// ------------
// CONSTANTS
// ------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = new Player(400, 400, playerMaxSpeed, null, null, null, null);

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
    player.update();
    player.render(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();