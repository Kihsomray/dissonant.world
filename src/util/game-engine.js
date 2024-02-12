// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {

    entities = [];
    chunks = new Set();

    // Clicked: esc, w, d, s, a, shift, alt, e
    keyClick = {
        "Escape": false,
        "w": false,
        "d": false,
        "s": false,
        "a": false,
        "shift": false,
        "Alt": false,
        "e": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false
    };

    // Clicked: left, middle, right
    mouseClick = [false, false, false];

    // Mouse location: x, y
    mouseLocation = { x: 0, y: 0 };

    // Constructor
    constructor() {
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        document.addEventListener("visibilitychange", function () {

            if (document["hidden"]) {

                ENGINE.keyClick = {
                    "Escape": false,
                    "w": false,
                    "d": false,
                    "s": false,
                    "a": false,
                    "shift": false,
                    "Alt": false,
                    "e": false,
                    "1": false,
                    "2": false,
                    "3": false,
                    "4": false
                };

            }

            
        });
    };

    init(ctx) { // called after page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    #updateMouseLocation = e => (this.mouseLocation = {
        x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
        y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
    });

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        this.ctx.canvas.addEventListener("mousemove", this.#updateMouseLocation);

        this.ctx.canvas.addEventListener("mousedown", (e) => this.mouseClick[e.button] = true);
        this.ctx.canvas.addEventListener("mouseup", (e) => this.mouseClick[e.button] = false);

        this.ctx.canvas.addEventListener("wheel", e => e.preventDefault());

        window.addEventListener("keydown", event => this.keyClick[event.key.toLowerCase()] = true);
        window.addEventListener("keyup", event => this.keyClick[event.key.toLowerCase()] = false);
    };

    getEntities() {
        return this.entities;
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    addChunk(chunk) {
        this.chunks.add(chunk);
    };

    removeChunk(chunk) {
        this.chunks.delete(chunk);
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        this.chunks.forEach(chunk => chunk.draw(this.ctx));
        
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

        this.ctx.font = "10px Arial";
        this.ctx.fillStyle = "white";

        // Draw text on the canvas
        this.ctx.fillText(`x: ${Math.floor(LOCATION.x / CHUNK_WIDTH * SCALE)}, y: ${-Math.ceil(LOCATION.y / CHUNK_LENGTH * SCALE)}`, 2, 10);

        this.ctx.fillText("+", this.ctx.canvas.width / 4 - 3, this.ctx.canvas.height / 4 + 3);

        //this.camera.draw(this.ctx);
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};