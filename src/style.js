// Max width and height of the canvas
const maxWidth = 960;
const maxHeight = 540;

// Min width and height of the canvas
const minWidth = 480;
const minHeight = 270;



// Get the canvas element
const canvas = $("#game")[0];

// Resize the canvas
function resizeCanvas() {
    const width = $("#container").width() - 16;
    const height = $("#container").height() - $("#header").height() - $("#footer").height() - 16;

    canvas.width = Math.max(Math.min(width, maxWidth), minWidth);
    canvas.height = Math.max(Math.min(height, maxHeight), minHeight);
}

// Center the canvas on window resize
$(window).resize(resizeCanvas);

// Initial resizing & centering
resizeCanvas();
