console.log("----------------- LOADED PLAYER.JS")

class PlayerCharacter {

    x;
    y;
    speed = 2;
    cornerSpeed = Math.sqrt(this.speed * this.speed / 2);
    multiplier = 1.5;

    goingRight = false;
    //facingRight = false;
    state = 0;

    model = 0;
    animations;
    dodgeAnimations;

    walking;
    rolling;
    rollCooldown;

    cursorInventory;
    inventory;
    hotbarGeneral;
    hotbarTools;

    knockback = 2;
    velocity = 1 * this.knockback;
    hitEntity = this;

    constructor() {

        if (Math.floor(Math.random() * 10) % 2 == 0) {
            this.spritesheet = ASSETS.getImage("e/player-male");
            this.dodgeAnimations = ASSETS.getImage("e/player-male-dodge");
        } else {
            this.model = 1;
            this.spritesheet = ASSETS.getImage("e/player-female");
            this.dodgeAnimations = ASSETS.getImage("e/player-female-dodge");
        }

        // Initial Variables for player's state.
        this.x = 0;
        this.y = 0;
        this.lastStep = 0;
        this.iFrames = 0;
        this.rollCooldown = 0;
        this.win = false;

        // All of the player's animations.
        this.animations = [];
        this.loadAnimations();

        this.walking = false;
        this.rolling = false;

        this.loadInventories();

        this.inventory.inventory[0][0].itemData = env.ITEMS[3];
        this.inventory.inventory[1][0].itemData = env.ITEMS[4];
        this.inventory.inventory[2][0].itemData = env.ITEMS[5];
        this.inventory.inventory[3][0].itemData = env.ITEMS[6];
        this.inventory.inventory[0][1].itemData = env.ITEMS[7];
        this.inventory.inventory[1][1].itemData = env.ITEMS[8];
        this.inventory.inventory[2][1].itemData = env.ITEMS[9];
        this.inventory.inventory[3][1].itemData = env.ITEMS[10];
        this.inventory.inventory[0][2].itemData = env.ITEMS[11];
        this.inventory.inventory[1][2].itemData = env.ITEMS[12];
        this.inventory.inventory[2][2].itemData = env.ITEMS[13];
        this.inventory.inventory[3][2].itemData = env.ITEMS[14];



        this.hotbarGeneral.inventory[0][0].itemData = env.ITEMS[23];

        this.hotbarTools.inventory[0][0].itemData = env.ITEMS[1];
        this.hotbarTools.inventory[1][0].itemData = env.ITEMS[2];

    }

    init() {
        this.health = new PlayerHealthbar();
        this.sword = new Sword();
    }

    loadInventories() {

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
            (item) => { return true }, // filter
            env.SCALE / 4, // scale
            false // visible
        );
        this.inventory.togglable = true;

        const widthHotbarGeneral = 204;
        const widthHotbarTools = 108;

        // hotbar general
        this.hotbarGeneral = new Inventory(
            ASSETS.getImage("i/*"),
            365, // asset location
            537,
            widthHotbarGeneral, // asset size
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
                    x: env.CENTER.x - (sizeX + (widthHotbarTools - 4) * env.UI.SCALE) / 2,
                    y: env.CENTER.y * 2 - sizeY
                }

            },
            (item) => {
                return !item.itemData.type.includes("weapon") && !item.itemData.type.includes("tool");
            }, // filter
            env.SCALE / 4, // scale
            true // visible
        );

        // hotbar tools
        this.hotbarTools = new Inventory(
            ASSETS.getImage("i/*"),
            565, // asset location
            537,
            widthHotbarTools, // asset size
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
                //console.log("yes")
                return {
                    x: env.CENTER.x - (sizeX - (widthHotbarGeneral + 4) * env.UI.SCALE) / 2,
                    y: env.CENTER.y * 2 - sizeY
                }

            },
            (item) => {
                return item.itemData.type.includes("weapon") || item.itemData.type.includes("tool") || item.itemData.type.includes("null");
            }, // filter
            env.SCALE / 4, // scale
            true // visible
        );


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
            (sizeX, sizeY) => { // centering function
                
                return GAME.mouseLocation;

            },
            (item) => { return true }, // filter
            1, // scale
            false // visible
        );
        this.cursorInventory.togglable = true;

    }

    loadAnimations() {

        for (let i = 0; i < 9; i++) { // 7 total states for player.
            this.animations[i] = [];
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1, 24, 24, 4, 0.25, 1, false, true);
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 96, 1, 24, 24, 4, 0.25, 1, false, true);

        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 49, 24, 24, 4, 0.125, 1, false, true);
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 96, 49, 24, 24, 4, 0.125, 1, false, true);


        // Running animation for state = 2.
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 49, 24, 24, 4, 0.1, 1, false, true);
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 96, 49, 24, 24, 4, 0.1, 1, false, true);


        // Turning animation for state = 3.
        // Facing right = 0.
        this.animations[3][0] = new Animator(this.spritesheet, 0, 73, 24, 24, 4, 0.1, 1, false, true);
        // Facing left = 1.
        this.animations[3][1] = new Animator(this.spritesheet, 96, 73, 24, 24, 4, 0.1, 1, false, true);


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 97, 24, 24, 4, 0.15, 1, true, false);
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 97, 24, 24, 4, 0.15, 1, true, false);


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 121, 24, 24, 4, 0.35, 1, false, true);
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 121, 24, 24, 4, 0.35, 1, false, true);

        // Reverse walking animation for state = 6.
        this.animations[6][0] = new Animator(this.spritesheet, 96, 49, 24, 24, 4, 0.125, 1, true, true);
        this.animations[6][1] = new Animator(this.spritesheet, 0, 49, 24, 24, 4, 0.125, 1, true, true);


        // Dodge roll animation for state = 7.
        // Right roll = 0 
        this.animations[7][0] = new Animator(this.dodgeAnimations, 24, 1, 24, 24, 5, 0.15, 1, false, true);
        // Left roll = 1
        this.animations[7][1] = new Animator(this.dodgeAnimations, 24, 32, 24, 24, 5, 0.15, 1, false, true);

        // Reverse dodge roll animation for state = 8.
        // Right roll = 0 
        this.animations[8][0] = new Animator(this.dodgeAnimations, 24, 32, 24, 24, 5, 0.15, 1, true, true);
        // Left roll = 1 
        this.animations[8][1] = new Animator(this.dodgeAnimations, 24, 1, 24, 24, 5, 0.15, 1, true, true);

    }

    update() {
        this.hit = false;

        if (this.counter++ % 10 == 0) this.pause = !this.pause;

        this.updateLocation();
        this.updateSound();

        this.sword.update();
        this.inventory.update();
        this.hotbarGeneral.update();
        this.hotbarTools.update();
        this.cursorInventory.update();

        if (this.inventory.clickedSlot) this.inventory.swap(this.cursorInventory, this.inventory.clickedSlot.i, this.inventory.clickedSlot.j, 0, 0);
        if (this.hotbarGeneral.clickedSlot) this.hotbarGeneral.swap(this.cursorInventory, this.hotbarGeneral.clickedSlot.i, this.hotbarGeneral.clickedSlot.j, 0, 0);
        if (this.hotbarTools.clickedSlot) this.hotbarTools.swap(this.cursorInventory, this.hotbarTools.clickedSlot.i, this.hotbarTools.clickedSlot.j, 0, 0);

        if (this.rollCooldown > 0) this.rollCooldown--;

        this.updateBB();
        
        GAME.getEntities().forEach(entity => {

            if (entity instanceof Enemy && this.bb.collide(entity.bb) && !GAME.player.win) {


                if (this.state !== 4 && !this.rolling) {
                    ASSETS.playAudio("a/hit");
                    this.health.health -= 1;
                    this.state = 4;
                    this.hit = true;
                    this.hitEntity = entity;
                }
                
            }

        });

        const entity = this.hitEntity;
        let c = Math.sqrt((entity.x - this.x) ** 2 + (entity.y - this.y) ** 2);
        c = c == 0 ? 0.001 : c;

        if (this.animations[4][0].isTruelyDone() || this.animations[4][1].isTruelyDone()) {
            this.animations[4][0].elapsedTime = 0;
            this.animations[4][1].elapsedTime = 0;
            this.state = 0;
            this.velocity = 1 * this.knockback;
        }

        if (this.state === 4) {

            // launch player opposite direction of player
            const dx = 1.5 * (this.x - entity.x) / c * this.velocity;
            const dy = 1.5 * (this.y - entity.y) / c * this.velocity;

            this.x += dx;
            this.y += dy;


            this.velocity -= Math.max(GAME.clockTick * this.animations[4][0].totalTime * this.knockback * 2, 0);

        }

    }

    updateSound() {

        if ((this.state == 1 || this.state == 2 || this.state == 6) && this.lastStep <= 0) {

            if (this.state == 2) this.lastStep = 20;
            else this.lastStep = 30;
    
            let walkSound = Math.floor(Math.random() * 10) % 3 + 1;

            if (walkSound == 1) ASSETS.playAudio("a/walk-one");
            else if (walkSound == 2) ASSETS.playAudio("a/walk-two");
            else ASSETS.playAudio("a/walk-three");
    
        }
        this.lastStep--;
        
    }

    updateLocation() {

        if (this.iFrames > 0) this.iFrames--; 
        if (this.iFrames == 0) this.rolling = false; 

        if (this.state === 4) {
            MAP.update();
            return;
        }

        const tLoc = LOCATION.getTrueLocation(this.x, this.y);

        const reverse = (this.goingRight && GAME.mouseLocation.x < tLoc.x + 12) || (!this.goingRight && GAME.mouseLocation.x >= tLoc.x + 12);

        const prevX = this.x;
        const prevY = this.y;

        const boost = (!GAME.keyClick["shift"] || reverse) ? 1 : this.multiplier;
        const rollBoost = (this.state == 7 || this.state == 8) ? this.multiplier : 0;

        const corner = Math.round(this.cornerSpeed * boost * 2 * GAME.clockTick * 50) / 2;
        const straight = Math.round(this.speed * boost * 2 * GAME.clockTick * 50) / 2;

        if (this.health.health <= 0) this.state = 5; 
        if (this.state == 5 || this.win) return;
        
        this.state = 1;

        if (GAME.keyClick[" "] && this.rollCooldown == 0 && this.state > 0) {
            this.rolling = true;
            this.state = 7;
            this.iFrames = 60;
            this.rollCooldown = 180;
            if (this.model == 0) ASSETS.playAudio("a/dodge-zero");
            else ASSETS.playAudio("a/dodge-one");
        } 
   
        if (GAME.keyClick["w"] && GAME.keyClick["d"]) {
            this.goingRight = true;
            this.sword.setState(1);
            this.y -= corner + rollBoost;
            this.x += corner + rollBoost;
        } 
        else if (GAME.keyClick["w"] && GAME.keyClick["a"]) {
            this.goingRight = false;
            this.sword.setState(3);
            this.y -= corner + rollBoost;
            this.x -= corner + rollBoost;
        } 
        else if (GAME.keyClick["s"] && GAME.keyClick["d"]) {
            this.goingRight = true;
            this.sword.setState(1);
            this.y += corner + rollBoost;
            this.x += corner + rollBoost;
        } 
        else if (GAME.keyClick["s"] && GAME.keyClick["a"]) {
            this.goingRight = false;
            this.sword.setState(3);
            this.y += corner + rollBoost;
            this.x -= corner + rollBoost;
        } 
        else if (GAME.keyClick["w"]) {
            this.goingRight = GAME.mouseLocation.x > tLoc.x + 12;
            this.sword.setState(0);
            this.y -= straight + rollBoost;
        } 
        else if (GAME.keyClick["d"]) {
            this.goingRight = true;
            this.sword.setState(1);
            this.x += straight + rollBoost;
        } 
        else if (GAME.keyClick["s"]) {
            this.goingRight = GAME.mouseLocation.x > tLoc.x + 12;
            this.sword.setState(2);
            this.y += straight + rollBoost;
        } 
        else if (GAME.keyClick["a"]) {
            this.goingRight = false;
            this.sword.setState(3);
            this.x -= straight + rollBoost;
        } 
        else {
            this.goingRight = GAME.mouseLocation.x > tLoc.x + 12;
            this.state = 0;
        }
        
        if (this.iFrames > 0 && !this.rolling) {
            this.state = 4;
        }

        if (GAME.keyClick["shift"] && this.state == 1) {
            this.state = 2;
        }
        
        if (this.x != prevX || this.y != prevY) MAP.update();
        if ((this.state == 1 || this.state == 2) && reverse) this.state = 6;

        if (this.rolling && !reverse) this.state = 7;
        else if (this.rolling && reverse) this.state = 8;
        
        //this.goingRight = GAME.mouseLocation.x > tLoc.x + 12;
        
    }

    updateBB() {

        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);

        this.bb = new BoundingBox(x + 8, y + 7, 20, 28);

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
        // env.CTX.strokeRect(x + 8, y + 7, 20, 28);

        if (!this.goingRight && GAME.mouseLocation.x < x) this.sword.draw();

        this.animations[this.state][this.goingRight ? 0 : 1].drawFrame(GAME.clockTick, env.CTX, x, y, 1.5);

        if (this.goingRight || GAME.mouseLocation.x >= x) this.sword.draw();

        this.inventory.draw();
        this.hotbarGeneral.draw();
        this.hotbarTools.draw();
        this.cursorInventory.draw();

        this.health.draw();

    }

}
