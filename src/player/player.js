// State Global Variables (Temporary Addition)
let IS_FACING_RIGHT = 1;
let STATE = 0;
let BLOCKED_UP = false;
let BLOCKED_RIGHT = false;
let BLOCKED_DOWN = false;
let BLOCKED_LEFT = false;

class PlayerCharacter {
    constructor() {

        GAME.PlayerCharacter = this; 
      
        if (Math.floor(Math.random() * 10) % 2 == 0) {
            this.spritesheet = ASSETS.getImage("e/player-male");
        }
        else {
            this.spritesheet = ASSETS.getImage("e/player-female");
        }
        
        // Initial Variables for player's state.
        this.x = env.X_CENTER - 18;
        this.y = env.Y_CENTER - 24;
        this.speed = 0;
        this.counter = 0;
        this.pause = false;
        this.BB = new BoundingBox(this.x + 10, this.y + 12, 16, 24);
        
        this.updateBB();

        // All of the player's animations and animation variables.
        
        this.animations = [];
        this.loadAnimations();

        this.inventory = new PlayerInventory();

    }

    loadAnimations() {

        for (var i = 0; i < 7; i++) { // 6 total states for player.
            this.animations[i] = [];
            for (var j = 0; j < 2; j++) { // Two directions
                this.animations[i][j]; 
            }
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1, 24, 25, 4, 0.25, 1, false, true)
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 96, 1, 24, 25, 4, 0.25, 1, false, true)

        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 49, 24, 25, 4, 0.125, 1, false, true)
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 96, 49, 24, 25, 4, 0.125, 1, false, true)

        
        // Running animation for state = 2.
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 49, 24, 25, 4, 0.1, 1, false, true)
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 96, 49, 24, 25, 4, 0.1, 1, false, true)


        // // Turning animation for state = 3.
        // // Facing right = 0.
        // this.animations[3][0] = new Animator(this.spritesheet, 0, 73, 24, 25, 4, 0.1, 1, false, true)
        // // Facing left = 1.
        // this.animations[3][1] = new Animator(this.spritesheet, 96, 73, 24, 25, 4, 0.1, 1, false, true)


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 97, 24, 25, 4, 0.125, 1, false, true)
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 97, 24, 25, 4, 0.125, 1, false, true)


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 121, 24, 25, 4, 0.33, 1, false, true)
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 121, 24, 25, 4, 0.33, 1, false, true)


        // // Dodge roll/jump animation for state = 1.
        // // Facing right = 0.
        // this.animations[6][0] = new Animator(this.spritesheet, 0, 25, 24, 24, 4, 0.2, 1, false, true)
        // // Facing left = 1.
        // this.animations[6][1] = new Animator(this.spritesheet, 96, 25, 24, 24, 4, 0.2, 1, false, true)

    }

    update() {

        // if (this.counter++ % 10 == 0) this.pause = !this.pause;
        // const location = GAME.clockTick * (this.speed + (this.pause ? 0 : 0));
        // this.x += location;
        // if (this.x > 1024) this.x = -200;

        this.x = env.X_CENTER - 18;
        this.y = env.Y_CENTER - 24;

        this.updateBB();
        
        // Bounding Box Logic
        GAME.getEntities().forEach(entity => {
            if ((entity instanceof Enemy || entity instanceof followEnemy)) {
                if (this.BB.collide(entity.BB)) {
                    STATE = 4;
                    if (this.BB.right <= entity.BB.right) {
                        BLOCKED_RIGHT = true;
                    }
                    else if (this.BB.left <= entity.BB.right) {
                        BLOCKED_LEFT = true;
                    }
                    if (this.BB.bottom >= entity.BB.top) {
                        BLOCKED_DOWN = true;
                    }
                    else if (this.BB.top <= entity.BB.bottom) {
                        BLOCKED_UP = true;
                        console.log("BLOCKED_UP"); 
                    }
                }
            }
            // else if (entity instanceof tree || entity instanceof river) {
                // // Add once trees, rivers, rocks, etc. are in.
            // }
        });
        
    }


    updateBB() {
        this.box = new BoundingBox(this.x + 10, this.y + 12, 16, 24);
    }

    draw(context) {

        this.x = env.X_CENTER - 18;
        this.y = env.Y_CENTER - 24;

        // VIEW BOUNDING BOX BELOW
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x + 10, this.y + 12, 16, 24);

        /*d
         * Movement Legend:
         * [0][0] = Idle Right      [0][1] = Idle left
         * [1][0] = Walk Right      [1][1] = Walk Left
         * [2][0] = Run Right       [2][1] = Run left
         * [3][0] = Turn Right      [3][1] = Turn Left
         * [4][0] = Damaged Right   [4][1] = Damaged left
         * [5][0] = Dead Right      [5][1] = Dead Left
         */

        this.animations[STATE][IS_FACING_RIGHT].drawFrame(GAME.clockTick, context, this.x, this.y, 1.5);

        this.inventory.draw(context);

    }

}
