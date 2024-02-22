class Sword {

    x;
    y;
    state;

    attackAngle = 45;
    attackReach = 50;

    constructor() {

        this.x = 0;
        this.y = 0;
        this.state = 0;
        this.facing = 3;
        this.swingOnCoolDown = false;
        this.cooldown = 120;
        this.attackBB = null;
        this.xOffset = 0;
        this.yOffset = 0;

        this.spritesheet = ASSETS.getImage("e/sword");

        this.animations = [];
        this.loadAnimations();

    }

    setState(direction) {
        this.facing = direction;
    }

    loadAnimations() {

        for (let i = 0; i < 4; i++) { // 3 total states for sword.
            this.animations[i] = [];
        }

        // Idle animation for state = 0.        
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 32, 32, 1, 1, 1, false, true)
        this.animations[0][1] = new Animator(this.spritesheet, 0, 96, 32, 32, 1, 1, 1, false, true)
        this.animations[0][2] = new Animator(this.spritesheet, 0, 96 * 2, 32, 32, 1, 1, 1, false, true)
        this.animations[0][3] = new Animator(this.spritesheet, 0, 96 * 3, 32, 32, 1, 1, 1, false, true)

        // // Slash animation for state = 1. 
        this.animations[1][0] = new Animator(this.spritesheet, 0, 32, 32, 32, 4, 0.2, 1, true, true)
        this.animations[1][1] = new Animator(this.spritesheet, 0, 96 + 32, 32, 32, 4, 0.2, 1, true, true)
        this.animations[1][2] = new Animator(this.spritesheet, 0, 96 * 2 + 64, 32, 32, 4, 0.2, 1, true, true)
        this.animations[1][3] = new Animator(this.spritesheet, 0, 96 * 3 + 32, 32, 32, 4, 0.2, 1, true, true)
   
        // Jab animation for state = 2. 
        this.animations[2][0] = new Animator(this.spritesheet, 0, 64, 32, 32, 4, 0.25, 1, false, true)
        this.animations[2][1] = new Animator(this.spritesheet, 0, 96 + 64, 32, 32, 4, 0.25, 1, false, true)
        this.animations[2][2] = new Animator(this.spritesheet, 0, 96 * 2 + 32, 32, 32, 4, 0.25, 1, false, true)
        this.animations[2][3] = new Animator(this.spritesheet, 0, 96 * 3  + 64, 32, 32, 4, 0.25, 1, false, true)

    }

    update() {

        // Update the location of the sword status
        this.x = GAME.player.x;
        this.y = GAME.player.y;

        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);

        // Update Swing status
        if (GAME.keyClick[" "] && !this.swingOnCoolDown) {
            this.state = 1;
            this.swingOnCoolDown = true;
            // Create the bounding box for the attack
            this.attackBB = new BoundingBox(x, y, 20, 28);
        }
        else {

            if (this.cooldown == 0) {
                this.state = 0;
                this.swingOnCoolDown = false;
                this.cooldown = 60;
            }
            else {
                this.cooldown--;
            }

        }

        this.updateBB();

    }

    updateBB() {
        const { x, y } = LOCATION.getTrueLocation(GAME.player.x, GAME.player.y);

        if (this.swingOnCoolDown) {

            if (this.facing == 0) {
                this.xOffset = 5;
                this.yOffset = -20;
                this.attackBB = new BoundingBox(x + this.xOffset, y + this.yOffset, 20, 28);
            }
            else if (this.facing == 1) {
                this.xOffset = 35;
                this.yOffset = 10;
                this.attackBB = new BoundingBox(x + this.xOffset, y + this.yOffset, 20, 28);
            }
            else if (this.facing == 2) {
                this.xOffset = 4;
                this.yOffset = 30;
                this.attackBB = new BoundingBox(x + this.xOffset, y + this.yOffset, 20, 28);
            }
            else {
                this.xOffset = -25;
                this.yOffset = 9;
                this.attackBB = new BoundingBox(x + this.xOffset, y + this.yOffset, 20, 28);
            }

        }
        else {
            this.attackBB = null;
        }

    }

    draw() {
        
        let { x, y } = LOCATION.getTrueLocation(GAME.player.x, GAME.player.y);
        x += 16;
        y += 16 + 11;
            
        // Draw the sword
        const cLoc = GAME.mouseLocation;
        
        x += (GAME.player.goingRight ? 6 : -4);

        // center of the canvas
        env.CTX.translate(x, y);

        // rotate the canvas to the mouse location
        env.CTX.rotate(Math.atan2(cLoc.y - y, cLoc.x - x));

        // draw the sword
        this.animations[0][1].drawFrame(GAME.clockTick, env.CTX, -10, -16, 1);

        // rotate the canvas back
        env.CTX.rotate(-Math.atan2(cLoc.y - y, cLoc.x - x));

        // center of the canvas
        env.CTX.translate(-x, -y);

    }

    inRange (enemyX, enemyY) {

        const {x, y} = GAME.mouseLocation;

        // Calculate the distance from the player to the cursor
        const c = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
            
        // Normalize the angles to be between 0 and 360
        const anglePlayerToEnemy = (Math.atan2(enemyY - this.y, enemyX - this.x) * (180 / Math.PI) + 360) % 360;
        const anglePlayerToCursor = (Math.atan2(y - this.y, x - this.x) * (180 / Math.PI) + 360) % 360;
    
        // Calculate the absolute difference between the angles
        const angleDifference = Math.abs(anglePlayerToCursor - anglePlayerToEnemy);
    
        // Check difference is less than 180
        return (angleDifference <= attackAngle / 2 || angleDifference >= 360 - attackAngle / 2) && c <= this.attackReach;

    }

}
