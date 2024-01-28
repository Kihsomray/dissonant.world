class PlayerCharacter {
    constructor() {

        ENGINE.PlayerCharacter = this;

        this.ENGINE = ENGINE;

        this.spritesheet = ASSET_MANAGER.getImage("e/player");

        // Initial Variables for player's state.
        this.x = 960 / 4 - 16;
        this.y = 540 / 4 - 24;
        this.speed = 0;
        this.counter = 0;
        this.pause = false;

        // State variables.
        this.facing = 0;    // 0 = right, 1 = left.
        this.state = 0;     // 0 = idle, 1 = walk, run = 2, turn = 3, damaged = 4, dead = 5.

        // All of the player's animations.
        this.animations = [];
        this.loadAnimations();

    }

    loadAnimations() {

        for (var i = 0; i < 6; i++) { // 6 total states for player.
            this.animations[i] = [];
            for (var j = 0; j < 2; j++) { // Two directions
                this.animations[i][j]; 
            }
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 24, 24, 4, 0.25, 1, false, true)
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 96, 0, 24, 24, 4, 0.25, 1, false, true)


        // Jumping animation for state = 1. (Subject to be changed to a dodge roll instead.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 24, 24, 24, 4, 0.2, 1, false, true)
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 96, 24, 24, 24, 4, 0.2, 1, false, true)

        
        // Walking animation for state = 2.
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 48, 24, 24, 4, 0.1, 1, false, true)
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 96, 48, 24, 24, 4, 0.1, 1, false, true)


        // Turning animation for state = 3.
        // Facing right = 0.
        this.animations[3][0] = new Animator(this.spritesheet, 0, 72, 24, 24, 4, 0.1, 1, false, true)
        // Facing left = 1.
        this.animations[3][1] = new Animator(this.spritesheet, 96, 72, 24, 24, 4, 0.1, 1, false, true)


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 96, 24, 24, 4, 0.2, 1, false, true)
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 96, 24, 24, 4, 0.2, 1, false, true)


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 120, 24, 24, 4, 0.33, 1, false, true)
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 120, 24, 24, 4, 0.33, 1, false, true)

    }

    update() {

        if (this.counter++ % 10 == 0) this.pause = !this.pause;
        const location = ENGINE.clockTick * (this.speed + (this.pause ? 0 : 0));
        this.x += location;
        if (this.x > 1024) this.x = -200;

        if (this.ENGINE.right) {
            this.facing = 0;
        }
        if (this.ENGINE.left) {
            this.facing = 1;
        }

    }

    draw(context) {

        /*
         * Movement Legend:
         * [0][0] = Idle Right      [0][1] = Idle left
         * [1][0] = Walk Right      [1][1] = Walk Left
         * [2][0] = Run Right       [2][1] = Run left
         * [3][0] = Turn Right      [3][1] = Turn Left
         * [4][0] = Damaged Right   [4][1] = Damaged left
         * [5][0] = Dead Right      [5][1] = Dead Left
         */

        // Temp
        this.animations[0][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);

        // IN PROGRESS, WORKING ON GETTING LOGIC RIGHT
        // if (this.facing == 0 && this.ENGINE.entities[1].speed == 0) { // Idle right
        //     this.animations[0][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        //     console.log("Reached 1");
        // }
        // else if (this.facing == 1 && this.ENGINE.entities[1].speed == 0) { // Idle left
        //     this.animations[0][1].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        //     console.log("Reached 3");
        // }

    }

}