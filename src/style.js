// This class consists of the style and layout of the game. It is responsible
// for the game's appearance and adjusting the user interface. It updates the
// global variables and the canvas size. It also centers the canvas and resizes
// it according to the window size.

// Update global variables
env.CANVAS = document.getElementById("game");
env.CTX = env.CANVAS.getContext("2d");

// Resize the canvas
function resizeCanvas() {

    const width = $("#container").width() - 36;
    const height = $("#container").height() - $("#header").height() - $("#footer").height() - 36;

    // ensure the bounds of the canvas
    env.CANVAS.width = Math.max(Math.min(width, env.MAX_WIDTH), env.MIN_WIDTH);
    env.CANVAS.height = Math.max(Math.min(height, env.MAX_HEIGHT), env.MIN_HEIGHT);

    console.log(env.CANVAS.width, env.CANVAS.height, env.SCALE, env.CANVAS.width / env.SCALE, env.CANVAS.height / env.SCALE)

    // Center the canvas
    env.CENTER.x = env.CANVAS.width / 2 / env.SCALE;
    env.CENTER.y = env.CANVAS.height / 2 / env.SCALE;

    // Offset the chunks
    env.MAP.OFFSET.x = CLUSTER_WIDTH * CHUNK_WIDTH * TILE_WIDTH / 2;
    env.MAP.OFFSET.y = CLUSTER_LENGTH * CHUNK_LENGTH * TILE_LENGTH / 2;

    env.CTX.scale(env.SCALE, env.SCALE);
}

function unblurCanvas() {
    env.CTX.imageSmoothingEnabled = false;
    env.CTX.webkitImageSmoothingEnabled = false;
    env.CTX.mozImageSmoothingEnabled = false;
    env.CTX.msImageSmoothingEnabled = false;
    env.CTX.oImageSmoothingEnabled = false;
}

// Center the canvas on window resize
$(window).resize(resizeCanvas);

// Initial resizing & centering
resizeCanvas();
