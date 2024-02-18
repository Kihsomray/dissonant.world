console.log("----------------- LOADED PLAYER.JS")

class PlayerCharacter {

    x;
    y;
    speed = 2;
    cornerSpeed = Math.sqrt(this.speed * this.speed / 2);
    multiplier = 1.5;

    facingRight = false;
    state = 0;

    animations;

    walking;

    cursorInventory;
    inventory;
    hotbarGeneral;
    hotbarTools;

    constructor() {

        if (Math.floor(Math.random() * 10) % 2 == 0) {
            this.spritesheet = ASSETS.getImage("e/player-male");

        } else {
            this.spritesheet = ASSETS.getImage("e/player-female");

        }

        // Initial Variables for player's state.
        this.x = 0;
        this.y = 0;

        // All of the player's animations.
        this.animations = [];
        this.loadAnimations();

        this.walking = false;

        this.cursorInventory = new Inventory(
            ASSETS.getImage("i/*"),
            0, // asset location
            0,
            0, // asset size
            0,
            1, // slot dimensions
            1,
            0, // initial gap
            0,
            0, // slot size
            0,
            0, // slot gap
            0,
            (_) => { // centering function
                
                return GAME.mouseLocation;

            },
            (_) => { true }, // filter
            1, // scale
            false // visible
        )

        // inventory
        this.inventory = new Inventory(
            ASSETS.getImage("i/*"),
            547, // asset location
            153,
            204, // asset size
            176,
            4, // slot dimensions
            3,
            10, // initial gap
            34,
            40, // slot size
            40,
            8, // slot gap
            6,
            (sizeX, sizeY) => { // centering function
                
                //console.log(env.CENTER.x)
                return {
                    x: env.CENTER.x - sizeX / 2,
                    y: env.CENTER.y - sizeY / 2
                }

            },
            (_) => { return true }, // filter
            env.SCALE / 4, // scale
            false // visible
        );

        // hotbar general
        this.hotbarGeneral = new Inventory(
            ASSETS.getImage("i/*"),
            365, // asset location
            537,
            204, // asset size
            60,
            4, // slot dimensions
            1,
            10, // initial gap
            10,
            40, // slot size
            40,
            8, // slot gap
            0,
            (sizeX, sizeY) => { // centering function
                
                return {
                    x: env.CENTER.x - sizeX / 2,
                    y: env.CENTER.y * 2 - sizeY
                }

            },
            (item) => {
                return !item.type.includes("weapon") && !item.type.includes("tool");
            }, // filter
            env.SCALE / 4, // scale
            true // visible
        );

        // hotbar tools
        this.hotbarTools = new Inventory(
            ASSETS.getImage("i/*"),
            565, // asset location
            537,
            108, // asset size
            60,
            2, // slot dimensions
            1,
            10, // initial gap
            10,
            40, // slot size
            40,
            8, // slot gap
            0,
            (sizeX, sizeY) => { // centering function
                
                return {
                    x: (env.CENTER.x - sizeX) / 2,
                    y: env.CENTER.y * 2 - sizeY
                }

            },
            (item) => {
                return item.type.includes("weapon") || item.type.includes("tool");
            }, // filter
            env.SCALE / 4, // scale
            false // visible
        );

    }

    loadAnimations() {

        for (let i = 0; i < 7; i++) { // 6 total states for player.
            this.animations[i] = [];
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1, 24, 25, 4, 0.25, 1, false, true)
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 96, 1, 24, 25, 4, 0.25, 1, false, true)

        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 49, 24, 24, 4, 0.125, 1, false, true)
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 96, 49, 24, 24, 4, 0.125, 1, false, true)


        // Running animation for state = 2.
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 49, 24, 24, 4, 0.1, 1, false, true)
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 96, 49, 24, 24, 4, 0.1, 1, false, true)


        // Turning animation for state = 3.
        // Facing right = 0.
        this.animations[3][0] = new Animator(this.spritesheet, 0, 73, 24, 24, 4, 0.1, 1, false, true)
        // Facing left = 1.
        this.animations[3][1] = new Animator(this.spritesheet, 96, 73, 24, 24, 4, 0.1, 1, false, true)


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 97, 24, 24, 4, 0.2, 1, false, true)
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 97, 24, 24, 4, 0.2, 1, false, true)


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 121, 24, 24, 4, 0.33, 1, false, true)
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 121, 24, 24, 4, 0.33, 1, false, true)


        // // Dodge roll/jump animation for state = 1.
        // // Facing right = 0.
        // this.animations[6][0] = new Animator(this.spritesheet, 0, 25, 24, 24, 4, 0.2, 1, false, true)
        // // Facing left = 1.
        // this.animations[6][1] = new Animator(this.spritesheet, 96, 25, 24, 24, 4, 0.2, 1, false, true)

    }

    update() {

        if (this.counter++ % 10 == 0) this.pause = !this.pause;
        this.updateLocation();
        this.cursorInventory.update();
        this.inventory.update();
        this.hotbarGeneral.update();
        this.hotbarTools.update();

        if (this.inventory.clickedSlot) this.inventory.swap(this.cursorInventory, this.inventory.clickedSlot.i, this.inventory.clickedSlot.j, 0, 0);
        if (this.hotbarGeneral.clickedSlot) this.hotbarGeneral.swap(this.cursorInventory, this.hotbarGeneral.clickedSlot.i, this.hotbarGeneral.clickedSlot.j, 0, 0);
        if (this.hotbarTools.clickedSlot) this.hotbarTools.swap(this.cursorInventory, this.hotbarTools.clickedSlot.i, this.hotbarTools.clickedSlot.j, 0, 0);

    }

    updateLocation() {

        const x = this.x;
        const y = this.y;

        const boost = GAME.keyClick["shift"] ? this.multiplier : 1;

        const corner = Math.round(this.cornerSpeed * boost * 2 * GAME.clockTick * 50) / 2;
        const straight = Math.round(this.speed * boost * 2 * GAME.clockTick * 50) / 2;

        this.state = 1;

        if (GAME.keyClick["w"] && GAME.keyClick["d"]) {
            this.y -= corner;
            this.x += corner;
            this.facingRight = true;

        } else if (GAME.keyClick["w"] && GAME.keyClick["a"]) {
            this.y -= corner;
            this.x -= corner;
            this.facingRight = false;

        } else if (GAME.keyClick["s"] && GAME.keyClick["d"]) {
            this.y += corner;
            this.x += corner;
            this.facingRight = true;

        } else if (GAME.keyClick["s"] && GAME.keyClick["a"]) {
            this.y += corner;
            this.x -= corner;
            this.facingRight = false;

        } else if (GAME.keyClick["w"]) {
            this.y -= straight;

        } else if (GAME.keyClick["d"]) {
            this.x += straight;
            this.facingRight = true;

        } else if (GAME.keyClick["s"]) {
            this.y += straight;

        } else if (GAME.keyClick["a"]) {
            this.x -= straight;
            this.facingRight = false;

        } else {
            this.state = 0;
        }

        if (GAME.keyClick["shift"] && this.state == 1) {
            this.state = 2;
        }

        if (this.x != x || this.y != y) MAP.update();
    }

    updateBB() {

        // Requires other entities to be added before logic can be written.
        this.bb = new BoundingBox(this.x + 8, this.y + 7, 20, 28);

    }

    draw() {

        //this.bb.draw();

        /*d
         * Movement Legend:
         * [0][0] = Idle Right      [0][1] = Idle left
         * [1][0] = Walk Right      [1][1] = Walk Left
         * [2][0] = Run Right       [2][1] = Run left
         * [3][0] = Turn Right      [3][1] = Turn Left
         * [4][0] = Damaged Right   [4][1] = Damaged left
         * [5][0] = Dead Right      [5][1] = Dead Left
         */

        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);


        // // VIEW BOUNDING BOX BELOW
        env.CTX.strokeStyle = "red";
        env.CTX.strokeRect(x + 8, y + 7, 20, 28);

        console.log("Player location: " + x + ", " + y)

        this.animations[this.state][this.facingRight ? 0 : 1].drawFrame(GAME.clockTick, env.CTX, x, y, 1.5);

        this.cursorInventory.draw();
        this.inventory.draw();
        this.hotbarGeneral.draw();
        this.hotbarTools.draw();

    }

}
