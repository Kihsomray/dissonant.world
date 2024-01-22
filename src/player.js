class PlayerCharacter {
    constructor() {

        ENGINE.PlayerCharacter = this;

        this.animator = new Animator(ASSET_MANAGER.getImage("e/player"), 0, 0, 24, 24, 4, 0.33, 1, true, true);
        this.spritesheet = ASSET_MANAGER.getImage("./res/player.png");

        // Initial Variables for player's state.
        this.x = 230;
        this.y = 150;
        this.speed = 0;
        this.counter = 0;
        this.pause = false;

        // State variables.
        this.facing = 0;    // 0 = right, 1 = left.
        this.state = 0;     // 0 = idle, walk, jump, turn, damaged, dead.

        // All of the player's animations.
        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        for (var i = 0; i < 6; i++) { // 6 total states for player.
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // Two directions
                this.animations[i][j]; 
            }
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 24, 24, 4, 0.33, 1, false, true)
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 96, 0, 24, 24, 4, 0.33, 1, true, true)


        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 24, 24, 24, 4, 0.33, 1, false, true)
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 96, 24, 24, 24, 4, 0.33, 1, true, true)


        // Jumping animation for state = 2. (Currently not planned for use.)
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 48, 24, 24, 4, 0.33, 1, false, true)
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 96, 48, 24, 24, 4, 0.33, 1, true, true)


        // Turning animation for state = 3.
        // Facing right = 0.
        this.animations[3][0] = new Animator(this.spritesheet, 0, 72, 24, 24, 4, 0.33, 1, false, true)

        // Facing left = 1.
        this.animations[3][1] = new Animator(this.spritesheet, 96, 72, 24, 24, 4, 0.33, 1, true, true)


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 96, 24, 24, 4, 0.33, 1, false, true)

        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 96, 24, 24, 4, 0.33, 1, true, true)


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 120, 24, 24, 4, 0.33, 1, false, false)

        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 120, 24, 24, 4, 0.33, 1, true, false)
    }

    update() {
        if (this.counter++ % 10 == 0) this.pause = !this.pause;
        const location = ENGINE.clockTick * (this.speed + (this.pause ? 0 : 0));
        this.x += location;
        if (this.x > 1024) this.x = -200;
    }

    draw(context) {
        this.animator.drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
    }

}