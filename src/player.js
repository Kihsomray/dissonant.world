class PlayerCharacter {
    constructor() {

        ENGINE.PlayerCharacter = this;

        this.animator = new Animator(ASSET_MANAGER.getImage("e/player"), 0, 0, 24, 24, 4, 0.33, 1, true, true);
        this.spritesheet = ASSET_MANAGER.getImage("e/player");

        // Initial Variables for player's state.
        this.x = 25;
        this.y = 150;
        this.speed = 0;
        this.counter = 0;
        this.pause = false;

        // State variables.
        this.facing = 0;    // 0 = right, 1 = left.
        this.state = 0;     // 0 = idle, , walk, turn, damaged, dead.

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
        this.animations[3][0] = new Animator(this.spritesheet, 0, 72, 24, 24, 4, 0.1, 1, false, false)

        // Facing left = 1.
        this.animations[3][1] = new Animator(this.spritesheet, 96, 72, 24, 24, 4, 0.1, 1, false, false)


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 96, 24, 24, 4, 0.2, 1, false, true)

        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 96, 24, 24, 4, 0.2, 1, false, true)


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 120, 24, 24, 4, 0.33, 1, false, false)

        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 120, 24, 24, 4, 0.33, 1, false, false)
    }

    update() {
        if (this.counter++ % 10 == 0) this.pause = !this.pause;
        const location = ENGINE.clockTick * (this.speed + (this.pause ? 0 : 0));
        this.x += location;
        if (this.x > 1024) this.x = -200;
    }

    draw(context) {
        //this.animator.drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        this.animations[0][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        this.animations[0][1].drawFrame(ENGINE.clockTick, context, this.x + 25, this.y, 1.5);

        this.animations[1][0].drawFrame(ENGINE.clockTick, context, this.x + 75, this.y, 1.5);
        this.animations[1][1].drawFrame(ENGINE.clockTick, context, this.x + 100, this.y, 1.5);
        
        this.animations[2][0].drawFrame(ENGINE.clockTick, context, this.x + 150, this.y, 1.5);
        this.animations[2][1].drawFrame(ENGINE.clockTick, context, this.x + 175, this.y, 1.5);

        this.animations[3][0].drawFrame(ENGINE.clockTick, context, this.x + 225, this.y, 1.5);
        this.animations[3][1].drawFrame(ENGINE.clockTick, context, this.x + 250, this.y, 1.5);

        this.animations[4][0].drawFrame(ENGINE.clockTick, context, this.x + 300, this.y, 1.5);
        this.animations[4][1].drawFrame(ENGINE.clockTick, context, this.x + 325, this.y, 1.5);

        this.animations[5][0].drawFrame(ENGINE.clockTick, context, this.x + 375, this.y, 1.5);
        this.animations[5][1].drawFrame(ENGINE.clockTick, context, this.x + 400, this.y, 1.5);
    }

}