// State Global Variables (Temporary Addition)
//let IS_FACING_RIGHT = false;
//let STATE = 0;

// General class to extend when creating enemies
class Enemy {

    facingRight = false;
    facingUp = false;
    state = 0;
    angle = 0.5;
    range;
    totalHealth = 12;
    health = this.totalHealth;
    agro = false;
    dead = false;
    deathDelay;
    knockback = 2;
    velocity = 1 * this.knockback;


    animations;

    x;
    y;

    constructor(name, x, y, distanceRange = 0, discoverRange = 10) {

        // GAME.PlayerCharacter = this;
        this.name = name;
        this.x = x;
        this.y = y;
        this.range = [distanceRange, discoverRange];
        this.speed = 1;
        this.counter = 0;
        this.pause = false;
        this.iFrames = 0;
        this.deathDelay = 120;

        if (name == "goblin") this.spritesheet = ASSETS.getImage("e/goblin");
        else if (name == "orc") this.spritesheet = ASSETS.getImage("e/orc");
        else if (name == "oni") this.spritesheet = ASSETS.getImage("e/oni");
        else if (name == "hobgoblin") this.spritesheet = ASSETS.getImage("e/hobgoblin");
        else if (name == "knight") this.spritesheet = ASSETS.getImage("e/knight");
        else if (name == "daemon") {
            this.spritesheet = ASSETS.getImage("e/daemon");
            this.health = 40;
            this.totalHealth = 40;
        }

        // All of the enemies's animations.
        this.animations = [];
        if (name == "daemon") this.loadBossAnimations();
        else this.loadAnimations(); 

        this.updateBB();

        this.healthBar = new EnemyHealth(this);

    }

    loadAnimations() {

        for (var i = 0; i < 7; i++) { // 6 total states for player.
            this.animations[i] = [];
        }

        // Idling animation for state = 0.
        // Facing right = 0.
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1, 24, 25, 4, 0.25, 1, false, true)
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 96, 1, 24, 25, 4, 0.25, 1, false, true)

        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 49, 24, 24, 4, 0.155, 1, false, true)
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 96, 49, 24, 24, 4, 0.155, 1, false, true)

        
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
        this.animations[4][0] = new Animator(this.spritesheet, 0, 97, 24, 24, 4, 0.15, 1, true, false)
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 96, 97, 24, 24, 4, 0.15, 1, true, false)


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 121, 24, 24, 4, 0.2, 1, false, false)
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 96, 121, 24, 24, 4, 0.2, 1, false, false)

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
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1, 56, 56, 4, 0.3, 1, false, true);
        // Facing left = 1.
        this.animations[0][1] = new Animator(this.spritesheet, 220, 1, 56, 56, 4, 0.3, 1, false, true);

        // Walking animation for state = 1.
        // Facing right = 0.
        this.animations[1][0] = new Animator(this.spritesheet, 0, 56 * 2 + 1, 56, 56, 4, 0.15, 1, false, true);
        // Facing left = 1.
        this.animations[1][1] = new Animator(this.spritesheet, 220, 56 * 2 + 1, 56, 56, 4, 0.15, 1, false, true);

        
        // Running animation for state = 2.
        // Facing right = 0.
        this.animations[2][0] = new Animator(this.spritesheet, 0, 56 * 2 + 1, 56, 56, 4, 0.125, 1, false, true);
        // Facing left = 1.
        this.animations[2][1] = new Animator(this.spritesheet, 220, 56 * 2 + 1, 56, 56, 4, 0.125, 1, false, true);


        // // Turning animation for state = 3.
        // // Facing right = 0.
        // this.animations[3][0] = new Animator(this.spritesheet, 220, 56 * 2, 56, 56, 4, 0.125, 1, false, true);
        // // Facing left = 1.
        // this.animations[3][1] = new Animator(this.spritesheet, 220, 56 * 2, 56, 56, 4, 0.125, 1, false, true);


        // Player damaged animation for state = 4.
        // Facing right = 0.
        this.animations[4][0] = new Animator(this.spritesheet, 0, 56 * 4 + 1, 56, 56, 4, 0.15, 1, true, false);
        // Facing left = 1.
        this.animations[4][1] = new Animator(this.spritesheet, 220, 56 * 4 + 1, 56, 56, 4, 0.15, 1, true, false);


        // Player death animation for state = 5.
        // Facing right = 0.
        this.animations[5][0] = new Animator(this.spritesheet, 0, 56 * 5 + 1, 56, 56, 4, 0.5, 1, false, false);
        // Facing left = 1.
        this.animations[5][1] = new Animator(this.spritesheet, 220, 56 * 5 + 1, 56, 56, 4, 0.5, 1, false, false);

    }

    update() {

        this.agro = false;

        //console.log("The players coords are " + GAME.PlayerCharacter.x + ", " + GAME.PlayerCharacter.y);
        //console.log("My coords are " + this.x + ", " + this.y);

        const sword = GAME.player.sword;

        if (GAME.player.win == true || GAME.player.state == 5) return;

        // if (this.state === 4) console.log(sword.hit);
        
        if (sword.hit) { 
            if (sword.inRange(this.bb.left, this.bb.bottom, this.bb.right, this.bb.top)) {
                
                ASSETS.playAudio("a/hit");
                this.health -= GAME.player.sword.item.attack_damage || 1;
        
                if (this.health <= 0) {
                    this.state = 5;
                    if (this.name == "daemon") GAME.player.win = true;  
                }
                else this.state = 4;
            }
        }

        if (Math.abs(this.x - GAME.player.x) < 0.3 * env.SCALE) {
            this.x = GAME.player.x;
        }

        if (Math.abs(this.y - GAME.player.y) < 0.3 * env.SCALE) {
            this.y = GAME.player.y;
        }


        let c = Math.sqrt((GAME.player.x - this.x) ** 2 + (GAME.player.y - this.y) ** 2);
        c = c == 0 ? 0.001 : c;

        //console.log(this.animations[4][0].isDone() || this.animations[4][1].isDone());

        if (this.animations[4][0].isTruelyDone() || this.animations[4][1].isTruelyDone()) {
            this.animations[4][0].elapsedTime = 0;
            this.animations[4][1].elapsedTime = 0;
            this.state = 0;
            this.velocity = 1 * this.knockback;
        }

        if (this.state === 4) {

            // launch player opposite direction of player
            const dx = this.speed * (this.x - GAME.player.x) / c * this.velocity;
            const dy = this.speed * (this.y - GAME.player.y) / c * this.velocity;

            this.x += dx;
            this.y += dy;

            this.velocity -= Math.max(GAME.clockTick * this.animations[4][0].totalTime * this.knockback * 2, 0);

        } else if (this.state === 5) {

            if (this.animations[5][0].isTruelyDone() || this.animations[5][1].isTruelyDone()) {
                this.removeFromWorld = true;
            }

        } else if (c < this.range[1] * TILE_LENGTH) {

            this.agro = true;

            this.state = 0;

            if (c > this.range[0] * TILE_WIDTH) {

                this.state = 1;

                if (this.iFrames > 0) {
                    this.state = 4;
                }
    
                const dx = this.speed * (GAME.player.x - this.x) / c;
                const dy = this.speed * (GAME.player.y - this.y) / c;
    
                if (dx < 0) this.facingRight = false;
                else this.facingRight = true;
    
                this.x += dx;
                this.y += dy;

            }


        } else {

            if (!this.walking) {
            
                this.state = 0;
    
                if (Math.random() < 0.005) {
                    this.state = 1;
                    this.walking = true;
                    this.facingRight = Math.random() > 0.5;
                    this.facingUp = Math.random() > 0.5;
                    this.angle = Math.random();
                }
    
            } else if (this.walking) {
    
                if (Math.random() < 0.007) {
                    this.state = 0;
                    this.walking = false;
                }
    
    
                if (this.facingRight) this.x += this.speed * this.angle;
                else this.x -= this.speed * this.angle;
    
                if (this.facingUp) this.y -= this.speed * (1 - this.angle);
                else this.y += this.speed * (1 - this.angle);
    
            }
        }

        this.updateBB();

        // if (this.counter++ % 10 == 0) this.pause = !this.pause;
        // const GAME.player = GAME.clockTick * (this.speed + (this.pause ? 0 : 0));
        // //this.x += GAME.player;
        // if (this.x > 1024) this.x = -200;

        this.healthBar.update();

        
    }

    updateBB() {
        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);

        if (this.name == "daemon") {
            this.bb = new BoundingBox(x + 20, y + 23, 50, 62);
        }
        else {
            this.bb = new BoundingBox(x + 8, y + 7, 20, 28);
        }

    }

    draw() {

        //this.x = X_CENTER;
        //this.y = Y_CENTER;

        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);
        const pLoc = LOCATION.getTrueLocation(GAME.player.x, GAME.player.y);

        // VIEW BOUNDING BOX BELOW
        env.CTX.strokeStyle = "red";

        if (this.name == "daemon") {
            this.bb = new BoundingBox(x + 20, y + 23, 50, 62);
            // env.CTX.strokeRect(x + 20, y + 23, 50, 62);
        }
        else  {
            this.bb = new BoundingBox(x + 8, y + 7, 20, 28);
            // env.CTX.strokeRect(x + 8, y + 7, 20, 28);
        }

        /*
         * Movement Legend:
         * [0][0] = Idle Right      [0][1] = Idle left
         * [1][0] = Walk Right      [1][1] = Walk Left
         * [2][0] = Run Right       [2][1] = Run left
         * [3][0] = Turn Right      [3][1] = Turn Left
         * [4][0] = Damaged Right   [4][1] = Damaged left
         * [5][0] = Dead Right      [5][1] = Dead Left
         */

        this.animations[this.state][this.facingRight ? 0 : 1].drawFrame(GAME.clockTick, env.CTX, x, y, 1.5);

        this.healthBar.draw();

        // // Show enemy vision lines
        // if (this.agro) {
        //     env.CTX.strokeStyle = "magenta";
        //     env.CTX.beginPath();
        //     env.CTX.moveTo(x, y);
        //     env.CTX.lineTo(pLoc.x, pLoc.y);
        //     env.CTX.stroke();
        // }
    }

}
