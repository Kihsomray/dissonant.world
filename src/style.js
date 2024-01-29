// Max width and height of the canvas
const maxWidth = 960;
const maxHeight = 540;

// Min width and height of the canvas
const minWidth = 480;
const minHeight = 270;

let X_CENTER = 0;
let Y_CENTER = 0;

const SCALE = 2;

let X_OFFSET = 0;
let Y_OFFSET = 0;

// Get the canvas element
const canvas = $("#game")[0];

// Resize the canvas
function resizeCanvas() {

    const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

    const width = $("#container").width() - 16;
    const height = $("#container").height() - $("#header").height() - $("#footer").height() - 16;

    canvas.width = Math.max(Math.min(width, maxWidth), minWidth);
    canvas.height = Math.max(Math.min(height, maxHeight), minHeight);

    ctx.scale(2, 2);
    ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;

    X_CENTER = ctx.canvas.width / 2 / SCALE;
    Y_CENTER = ctx.canvas.height / 2 / SCALE;

    X_OFFSET = CLUSTER_WIDTH * CHUNK_WIDTH * TILE_WIDTH / 2 - X_CENTER;
    Y_OFFSET = CLUSTER_LENGTH * CHUNK_LENGTH * TILE_LENGTH / 2 - Y_CENTER;
    
}

// Center the canvas on window resize
$(window).resize(resizeCanvas);

// Initial resizing & centering
resizeCanvas();
