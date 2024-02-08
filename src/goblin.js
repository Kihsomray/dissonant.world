class GoblinEnemy {
    constructor() {
        this.animator = new Animator(/* parameters to configure your goblin's spritesheet and animations */);
        this.spritesheet = ASSET_MANAGER.getImage("e/goblin");

        // Initial Variables for goblin's state.
        this.x = 100; // starting x-position
        this.y = 150; // starting y-position
        this.speed = 1; // speed of the goblin

        // State variables.
        this.facing = 0;    // 0 = right, 1 = left.
        this.state = 0;     // 0 = idle, 1 = walk, 2 = attack, etc.

        // All of the goblin's animations.
        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        // Define the frames and animations for the goblin here
        // For example, you might have an idle animation:
        this.animations[0] = [];
        this.animations[0][0] = new Animator(this.spritesheet, /* frame parameters for idle facing right */);
        this.animations[0][1] = new Animator(this.spritesheet, /* frame parameters for idle facing left */);

        // Continue with other states and directions
    }

    update() {
        // Update goblin position and state logic here
        // For example, move the goblin, change states based on player interaction, etc.
    }

    draw(context) {
        // Draw the current frame of the goblin's animation based on its state and facing direction
        // For example, if the goblin is idle and facing right:
        this.animations[this.state][this.facing].drawFrame(/* time, context, x, y, scale */);
    }
}