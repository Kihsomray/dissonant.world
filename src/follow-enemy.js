// State Global Variables (Temporary Addition)
//let IS_FACING_RIGHT = false;
//let STATE = 0;

// General class to extend when creating enemies
class FollowEnemy {

    facingRight = false;
    state = 0;
    range;

    animations;

    x;
    y;

    constructor(name, x, y, distanceRange = 0, discoverRange = 10) {

        // GAME.PlayerCharacter = this;
        this.name = name;
        this.x = x;
        this.y = y;
        this.range = [distanceRange, discoverRange];

        if (name == "goblin") {
            this.spritesheet = ASSETS.getImage("e/goblin");
        } 
        else if (name == "orc") {
            this.spritesheet = ASSETS.getImage("e/orc");
        }
        else if (name == "oni") {
            this.spritesheet = ASSETS.getImage("e/oni");
        }
        else if (name == "hobgoblin") {
            this.spritesheet = ASSETS.getImage("e/hobgoblin");
        }
        else if (name == "knight") {
            this.spritesheet = ASSETS.getImage("e/knight");
        }

        this.speed = 1;
        this.counter = 0;
        this.pause = false;

        this.updateBB();

        // All of the enemies's animations.
        this.animations = [];
        this.loadAnimations();

    }

    loadAnimations() {

        // TODO add the animations
        // It shouldn't matter for this class since its general but this should be overloaded for each enemy



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

    }

    update() {

        //console.log("The players coords are " + GAME.PlayerCharacter.x + ", " + GAME.PlayerCharacter.y);
        //console.log("My coords are " + this.x + ", " + this.y);

        if (Math.abs(this.x - GAME.player.x) < 0.3 * env.SCALE) {
            this.x = GAME.player.x;
        }

        if (Math.abs(this.y - GAME.player.y) < 0.3 * env.SCALE) {
            this.y = GAME.player.y;
        }

        console.log("The players coords are " + GAME.player.x + ", " + GAME.player.y);

        const c = Math.sqrt((GAME.player.x - this.x) ** 2 + (GAME.player.y - this.y) ** 2);

        console.log ("c: " + c)

        if (c > this.range[0] * TILE_WIDTH && c < this.range[1] * TILE_LENGTH) {
            const dx = this.speed * (GAME.player.x - this.x) / c;
            console.log(this.speed, GAME.player.x, this.x, c, dx)
            const dy = this.speed * (GAME.player.y - this.y) / c;

            console.log("dx: " + dx + " dy: " + dy)

            this.x += dx;
            this.y += dy;
        }
        // if (this.counter++ % 10 == 0) this.pause = !this.pause;
        // const GAME.player = GAME.clockTick * (this.speed + (this.pause ? 0 : 0));
        // //this.x += GAME.player;
        // if (this.x > 1024) this.x = -200;

    }

    updateBB() {

        // Requires other entities to be added before logic can be written.
        // this.BB = new BoundingBox(this.x + 8, this.y + 7, 20, 28);

    }

    draw(context) {

        //this.x = X_CENTER;
        //this.y = Y_CENTER;

        // // VIEW BOUNDING BOX BELOW
        env.CTX.strokeStyle = "red";
        env.CTX.strokeRect(this.x + 8, this.y + 7, 20, 28);

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
        this.animations[this.state][this.facingRight ? 0 : 1].drawFrame(GAME.clockTick, env.CTX, x, y, 1.5);

    }

}
