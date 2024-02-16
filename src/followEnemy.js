// State Global Variables (Temporary Addition)
//let IS_FACING_RIGHT = false;
//let STATE = 0;

// General class to extend when creating enemies
class followEnemy {

    x;
    y;
    name;
    globalX;
    globalY;
    speed;


    constructor(name, x, y) {

        // ENGINE.PlayerCharacter = this;
        this.name = name;
        this.globalX = x;
        this.globalY = y;

        if (name == "goblin") {
            this.spritesheet = ASSET_MANAGER.getImage("e/goblin");
        } 
        else if (name == "orc") {
            this.spritesheet = ASSET_MANAGER.getImage("e/orc");
        }
        else if (name == "oni") {
            this.spritesheet = ASSET_MANAGER.getImage("e/oni");
        }
        else if (name == "hobgoblin") {
            this.spritesheet = ASSET_MANAGER.getImage("e/hobgoblin");
        }
        else if (name == "knight") {
            this.spritesheet = ASSET_MANAGER.getImage("e/knight");
        }

        this.x = LOCATION.x; // X_CENTER;
        this.y = LOCATION.y; // Y_CENTER;
        this.speed = 100; // speed of the enemy;
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

        this.x = Math.round(this.globalX - LOCATION.x);
        this.y = Math.round(this.globalY - LOCATION.y);

        //console.log("The players coords are " + ENGINE.PlayerCharacter.x + ", " + ENGINE.PlayerCharacter.y);
        //console.log("My coords are " + this.x + ", " + this.y);

        let playerX = Math.floor(ENGINE.PlayerCharacter.x);
        let playerY = Math.floor(ENGINE.PlayerCharacter.y);

        if (Math.floor(this.x) < playerX) {
            this.globalX += Math.round(ENGINE.clockTick * this.speed);
        } else if (Math.floor(this.x) > playerX) {
            this.globalX -= Math.round(ENGINE.clockTick * this.speed);
        } 
        
        if (Math.floor(this.y) < playerY) {
            this.globalY += Math.round(ENGINE.clockTick * this.speed);
        } if (Math.floor(this.y) > playerY) {
            this.globalY -= Math.round(ENGINE.clockTick * this.speed);
        } 


        // if (this.counter++ % 10 == 0) this.pause = !this.pause;
        // const location = ENGINE.clockTick * (this.speed + (this.pause ? 0 : 0));
        // //this.x += location;
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
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x + 8, this.y + 7, 20, 28);

        /*d
         * Movement Legend:
         * [0][0] = Idle Right      [0][1] = Idle left
         * [1][0] = Walk Right      [1][1] = Walk Left
         * [2][0] = Run Right       [2][1] = Run left
         * [3][0] = Turn Right      [3][1] = Turn Left
         * [4][0] = Damaged Right   [4][1] = Damaged left
         * [5][0] = Dead Right      [5][1] = Dead Left
         */

        // IN PROGRESS, WORKING ON GETTING LOGIC RIGHT
        if (!IS_FACING_RIGHT && STATE == 0) { // Idle right
            this.animations[0][1].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (IS_FACING_RIGHT && STATE == 0) { // Idle left
            this.animations[0][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (IS_FACING_RIGHT && STATE == 1) { // Walking left
            this.animations[1][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (!IS_FACING_RIGHT && STATE == 1) { // Walking right
            this.animations[1][1].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (IS_FACING_RIGHT && STATE == 2) { // Running left
            this.animations[2][0].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (!IS_FACING_RIGHT && STATE == 2) { // Running right
            this.animations[2][1].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (IS_FACING_RIGHT && STATE == 3) { // Walking right
            this.animations[3][1].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }
        else if (!IS_FACING_RIGHT && STATE == 3) { // Walking right
            this.animations[3][1].drawFrame(ENGINE.clockTick, context, this.x, this.y, 1.5);
        }

    }

    getCurrentChunk() {
        return {
            x: Math.floor((this.x + env.X_OFFSET + env.X_CENTER) / (CHUNK_WIDTH * TILE_WIDTH)),
            y: Math.floor((this.y + env.Y_OFFSET + env.Y_CENTER) / (CHUNK_LENGTH * TILE_LENGTH))
        };
    };

}
