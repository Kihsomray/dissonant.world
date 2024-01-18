// max width and height of the canvas
const maxWidth = 960;
const maxHeight = 540;

const minWidth = 480;
const minHeight = 270;

$(document).ready(function () {

    // Get the canvas element
    const canvas = $("#game")[0];

    // Resize the canvas
    function resizeCanvas() {
        const width = $("#container").width() - 16;
        const height = $("#container").height() - $("#header").height() - $("#footer").height() - 16;

        console.log(`Resizing canvas to ${width}x${height}`);

        canvas.width = Math.max(Math.min(width, maxWidth), minWidth);
        canvas.height = Math.max(Math.min(height, maxHeight), minHeight);
    }

    // Center the canvas on window resize
    $(window).resize(resizeCanvas);

    // Initial resizing & centering
    resizeCanvas();

});