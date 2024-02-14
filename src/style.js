

// Get the canvas element
const canvas = $("#game")[0];

// Resize the canvas
function resizeCanvas() {

    const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

    const width = $("#container").width() - 16;
    const height = $("#container").height() - $("#header").height() - $("#footer").height() - 16;

    canvas.width = Math.max(Math.min(width, env.MAX_WIDTH), env.MIN_WIDTH);
    canvas.height = Math.max(Math.min(height, env.MAX_HEIGHT), env.MIN_HEIGHT);

    ctx.scale(env.SCALE, env.SCALE);
    ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;

    env.X_CENTER = ctx.canvas.width / 2 / env.SCALE;
    env.Y_CENTER = ctx.canvas.height / 2 / env.SCALE;

    env.X_OFFSET = CLUSTER_WIDTH * CHUNK_WIDTH * TILE_WIDTH / 2 - env.X_CENTER;
    env.Y_OFFSET = CLUSTER_LENGTH * CHUNK_LENGTH * TILE_LENGTH / 2 - env.Y_CENTER;

    console.log(env.X_CENTER)
    
}

// Center the canvas on window resize
$(window).resize(resizeCanvas);

// Initial resizing & centering
resizeCanvas();
