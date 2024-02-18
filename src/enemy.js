// State Global Variables (Temporary Addition)
//let IS_FACING_RIGHT = false;
//let STATE = 0;

// General class to extend when creating enemies
class Enemy {
    constructor(name, x, y) {

        this.name = name;
        this.globalX = x;
        this.globalY = y;
        this.state = 0;
        this.facing = 0;

        this.updateBB();

        switch (name) {
            case "goblin":
                this.spritesheet = ASSETS.getImage("e/goblin");
                break;
            case "orc":
                this.spritesheet = ASSETS.getImage("e/orc");
                break;
            case "oni":
                this.spritesheet = ASSETS.getImage("e/oni");
                break;
            case "hobgoblin":
                this.spritesheet = ASSETS.getImage("e/hobgoblin");
                break;
            case "knight":
                this.spritesheet = ASSETS.getImage("e/knight");
                break;
            case "daemon":
                this.spritesheet = ASSETS.getImage("e/daemon");
                break;
        }

        this.x = LOCATION.x; //X_CENTER;
        this.y = LOCATION.y; //Y_CENTER;
        this.speed = 0;
        this.counter = 0;
        this.pause = false;

        

        // All of the enemy's animations.
        this.animations = [];
        if (name != "daemon") {
            this.loadAnimations();
        }
        else {
            this.loadBossAnimations();
        }
    }

    loadBossAnimations() {

        for (var i = 0; i < 7; i++) { // 6 total states for player.
            this.animations[i] = [];
            for (var j = 0; j < 2; j++) { // Two directions
                this.animations[i][j]; 
            }
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1, 56, 57, 4, 0.3, 1, false, true);
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 220, 1, 56, 57, 4, 0.3, 1, false, true);

        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 56 * 2, 56, 56, 4, 0.15, 1, false, true);
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 220, 56 * 2, 56, 56, 4, 0.15, 1, false, true);

        
        // Running animation for state = 2.
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 56 * 2, 56, 56, 4, 0.125, 1, false, true);
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 220, 56 * 2, 56, 56, 4, 0.125, 1, false, true);

        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 56 * 4, 56, 56, 4, 0.125, 1, false, true);
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 220, 56 * 4, 56, 56, 4, 0.125, 1, false, true);


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 56 * 5, 56, 56, 4, 0.125, 1, false, true);
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 220, 56 * 5, 56, 56, 4, 0.125, 1, false, true);

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

        this.x = this.globalX - LOCATION.x;
        this.y = this.globalY - LOCATION.y;

        // console.log("The players coords are " + GAME.PlayerCharacter.x + ", " + GAME.PlayerCharacter.y);
        // console.log("My coords are " + this.x + ", " + this.y);


        // if (this.counter++ % 10 == 0) this.pause = !this.pause;
        // const location = GAME.clockTick * (this.speed + (this.pause ? 0 : 0));
        // //this.x += location;
        // if (this.x > 1024) this.x = -200;

        this.x = this.globalX - LOCATION.x;
        this.y = this.globalY - LOCATION.y;

        // If the player is found, do this.
        if (this.AGGRO.collide(GAME.PlayerCharacter.BB)) {
            this.state = 1;
            if (this.BB.collide(GAME.PlayerCharacter.BB)) {
                this.state = 0;
            }
            else {
                if (this.x < GAME.PlayerCharacter.x) {
                    this.globalX++;
                    this.facing = 0;
                } 
                if (this.x > GAME.PlayerCharacter.x) {
                    this.globalX--;
                    this.facing = 1;
                } 
                if (this.y < GAME.PlayerCharacter.y) {
                    this.globalY++;
                } 
                if (this.y > GAME.PlayerCharacter.y) {
                    this.globalY--;
                } 
            }
        }
        else { // If not, do this.
            this.state = 0;
        }
        

        this.updateBB();

    }

    updateBB() {
        if (this.name == "daemon") {
            this.BB = new BoundingBox(this.x + 20, this.y + 23, 50, 62);
            this.AGGRO = new BoundingBox(this.x + 8, this.y + 7, 20, 28);
        }
        else {
            this.BB = new BoundingBox(this.x + 8, this.y + 7, 20, 28);
            this.AGGRO = new BoundingBox(this.x - 100, this.y - 100, 250, 250);
        }
    }

    draw(context) {

        //this.x = X_CENTER;
        //this.y = Y_CENTER;

        // VIEW BOUNDING BOX BELOW
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "red";
        if (this.name == "daemon") {
            this.BB = new BoundingBox(this.x + 20, this.y + 23, 50, 62);
            this.AGGRO = new BoundingBox(this.x - 250, this.y - 150, 600, 400);

            // // UNCOMMENT THIS TO DRAW BOUNDING BOX FOR BOSS
            // ctx.strokeRect(this.x + 20, this.y + 23, 50, 62);
            // ctx.strokeStyle = "white";
            // ctx.strokeRect(this.x - 250, this.y - 150, 600, 400);
        }
        else { // NORMAL ENEMY
            this.BB = new BoundingBox(this.x + 8, this.y + 7, 20, 28);
            this.AGGRO = new BoundingBox(this.x - 100, this.y - 100, 250, 250);

            // // UNCOMMENT THIS TO DRAW BOUNDING BOX FOR BOSS
            // ctx.strokeRect(this.x + 8, this.y + 7, 20, 32);
            // ctx.strokeStyle = "white";
            // ctx.strokeRect(this.x - 100, this.y - 100, 250, 250);
        }
        
        
        

        /*d
         * Movement Legend:
         * [0][0] = Idle Right      [0][1] = Idle left
         * [1][0] = Walk Right      [1][1] = Walk Left
         * [2][0] = Run Right       [2][1] = Run left
         * [3][0] = Turn Right      [3][1] = Turn Left
         * [4][0] = Damaged Right   [4][1] = Damaged left
         * [5][0] = Dead Right      [5][1] = Dead Left
         */

        this.animations[this.state][this.facing].drawFrame(GAME.clockTick, context, this.x, this.y, 1.5);


    }

}
