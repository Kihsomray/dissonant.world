// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {

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
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
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

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
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