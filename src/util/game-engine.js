// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {

    player;
    entities = [];
    chunks = new Set();

    // Clicked: esc, w, d, s, a, shift, alt, e, space
    keyClick = {
        "Escape": false,
        "w": false,
        "d": false,
        "s": false,
        "a": false,
        "Shift": false,
        "Alt": false,
        "e": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false
    };

    keyClickCooldownWhitelist = ["w", "d", "s", "a", "shift", "alt"];

    keyClickCooldowns = new Map();

    // Clicked: left, middle, right
    mouseClick = [false, false, false];

    mouseHold = [false, false, false];

    // Mouse location: x, y
    mouseLocation = { x: env.X_CENTER, y: env.Y_CENTER };

    mouseTile = { x: 0, y: 0 };
    mouseChunk = { x: 0, y: 0 };

    // Constructor
    constructor() {

        document.addEventListener("visibilitychange", function () {

            if (document["hidden"]) {

                this.keyClick = {
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

    init() {
        this.startInput();
        this.timer = new Timer();
        ASSETS.playAudio("m/overworld");
    };

    #updateMouseLocation = e => {
        const loc = this.mouseLocation = {
            x: (e.clientX - env.CTX.canvas.getBoundingClientRect().left) / env.SCALE,
            y: (e.clientY - env.CTX.canvas.getBoundingClientRect().top) / env.SCALE
        };

        const loc2 = LOCATION.getTrueLocation(0, 0);

        const x = loc.x - loc2.x - env.OFFSET.x;
        const y = loc.y - loc2.y - env.OFFSET.y;

        this.mouseChunk = getCurrentChunk(x, y);
        this.mouseTile = getCurrentTile(x, y);
        console.log(x, y);
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            window.requestAnimationFrame(gameLoop, env.CTX.canvas);
        };
        gameLoop();
    };

    startInput() {

        env.CTX.canvas.addEventListener("mousemove", this.#updateMouseLocation);

        env.CTX.canvas.addEventListener("mousedown", (e) => {

            this.mouseHold[e.button] = true;

            if (!this.keyClickCooldownWhitelist.includes(e.button)) {
                if (this.keyClickCooldowns.has(e.button) || !(Date.now() - this.keyClickCooldowns.get(e.button) < 100)) {
                    this.mouseClick[e.button] = true
                    this.keyClickCooldowns.set(e.button, Date.now());
                }
            } else {
                this.mouseClick[e.button] = true
            }
        });

        env.CTX.canvas.addEventListener("mouseup", (e) => this.mouseClick[e.button] = this.mouseHold[e.button] = false);

        env.CTX.canvas.addEventListener("wheel", e => e.preventDefault());

        window.addEventListener("keydown", e => {

            if (!this.keyClickCooldownWhitelist.includes(e.key.toLowerCase())) {
                if (this.keyClickCooldowns.has(e.key.toLowerCase()) || !(Date.now() - this.keyClickCooldowns.get(e.key.toLowerCase()) < 100)) {
                    this.keyClick[e.key.toLowerCase()] = true;
                    this.keyClickCooldowns.set(e.key.toLowerCase(), Date.now());
                }
            } else {
                this.keyClick[e.key.toLowerCase()] = true;
            }
        
        });
        window.addEventListener("keyup", event => this.keyClick[event.key.toLowerCase()] = false);
    };

    getEntities() {
        return this.entities;
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    removeEntity(entity) {
        let index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
    };

    addChunk(chunk) {
        this.chunks.add(chunk);
    };

    removeChunk(chunk) {
        this.chunks.delete(chunk);
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        env.CTX.clearRect(0, 0, env.CTX.canvas.width, env.CTX.canvas.height);

        this.chunks.forEach(chunk => chunk.draw(env.CTX));

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(env.CTX, this);
        }

        env.CTX.font = "10px Arial";
        env.CTX.fillStyle = "white";

        // Draw text on the canvas
        env.CTX.fillText("+", this.mouseLocation.x - 3, this.mouseLocation.y + 3);

        // Apply blur effect to canvas edges
        const gradient = env.CTX.createRadialGradient(
            env.CENTER.x, env.CENTER.y, env.CANVAS.width / 5,
            env.CENTER.x, env.CENTER.y, env.CANVAS.width / 4
        );

        const { x, y } = getCurrentChunk(this.player.x, this.player.y);
        const { r, g, b } = BIOME_RGB[MAP.chunk[x][y].tiles[16][16].biome];

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.1)`); // Adjusted opacity to 0.5
        env.CTX.fillStyle = gradient;
        env.CTX.fillRect(0, 0, env.CANVAS.width, env.CANVAS.height);
        env.CTX.fill(); // Add this line to fill the gradient

        // Apply blur effect to canvas edges
        const outerGradient = env.CTX.createRadialGradient(
            env.CENTER.x, env.CENTER.y, env.CANVAS.width / (9 / 2),
            env.CENTER.x, env.CENTER.y, env.CANVAS.width / 4
        );

        outerGradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
        outerGradient.addColorStop(1, `rgba(0, 0, 0, 0.15)`); // Adjusted opacity to 0.5
        env.CTX.fillStyle = outerGradient;
        env.CTX.fillRect(0, 0, env.CANVAS.width, env.CANVAS.height);
        env.CTX.fill(); // Add this line to fill the gradient

        env.CTX.font = "10px Arial";
        env.CTX.fillStyle = "white";
        env.CTX.fillText(`x: ${Math.floor(this.player.x / TILE_WIDTH)}, y: ${-Math.ceil(this.player.y / TILE_LENGTH)}`, 2, 10);
    };

    update() {

        this.chunks.forEach(chunk => chunk.update());

        for (let i = 0; i < this.entities.length; i++) {
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

        this.keyClickCooldowns.forEach((_, key) => {
            if (Number.isInteger(key)) this.mouseClick[key] = false;
            else this.keyClick[key] = false;
        });

        this.updateAudio();
        
    };

    updateAudio() {
        const mute = document.getElementById("mute").checked;

        const volume = document.getElementById("volume").value;

        ASSETS.muteAllAudio(mute);
        ASSETS.adjustVolume(volume);
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};