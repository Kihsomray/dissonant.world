class Sword {

    x;
    y;
    state;

    attackAngle = 45;
    attackReach = 35;

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
        this.animations[1][0] = new Animator(this.spritesheet, 0, 32, 32, 32, 4, 0.1, 1, true, true)
        this.animations[1][1] = new Animator(this.spritesheet, 0, 96 + 32, 32, 32, 4, 0.1, 1, true, true)
        this.animations[1][2] = new Animator(this.spritesheet, 0, 96 * 2 + 64, 32, 32, 4, 0.1, 1, true, true)
        this.animations[1][3] = new Animator(this.spritesheet, 0, 96 * 3 + 32, 32, 32, 4, 0.1, 1, true, true)
   
        // Jab animation for state = 2. 
        this.animations[2][0] = new Animator(this.spritesheet, 0, 64, 32, 32, 4, 0.25, 1, false, true)
        this.animations[2][1] = new Animator(this.spritesheet, 0, 96 + 64, 32, 32, 4, 0.25, 1, false, true)
        this.animations[2][2] = new Animator(this.spritesheet, 0, 96 * 2 + 32, 32, 32, 4, 0.25, 1, false, true)
        this.animations[2][3] = new Animator(this.spritesheet, 0, 96 * 3  + 64, 32, 32, 4, 0.25, 1, false, true)

    }

    update() {

        // Update the location of the sword status
        this.x = GAME.player.x + 16;
        this.y = GAME.player.y + 27;

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
        
        let { x, y } = LOCATION.getTrueLocation(this.x, this.y);
            
        // Draw the sword
        const cLoc = GAME.mouseLocation;
        
        x += (GAME.player.goingRight ? 6 : -4);

        // center of the canvas
        env.CTX.translate(x, y);

        // rotate the canvas to the mouse location
        env.CTX.rotate(Math.atan2(cLoc.y - y, cLoc.x - x));

        // draw the sword
        this.animations[this.state][1].drawFrame(GAME.clockTick, env.CTX, -10, -16, 1);

        // rotate the canvas back
        env.CTX.rotate(-Math.atan2(cLoc.y - y, cLoc.x - x));

        // center of the canvas
        env.CTX.translate(-x, -y);

        const mLoc = GAME.mouseLocation;
        const anglePlayerToCursor = (Math.atan2(mLoc.y - y, mLoc.x - x) * (180 / Math.PI) + 360) % 360;

        // draw lines of the range of the sword
        env.CTX.beginPath();
        env.CTX.moveTo(x, y);
        env.CTX.lineTo(x + this.attackReach * Math.cos((anglePlayerToCursor - this.attackAngle / 2) * (Math.PI / 180)), y + this.attackReach * Math.sin((anglePlayerToCursor - this.attackAngle / 2) * (Math.PI / 180)));
        env.CTX.stroke();
        env.CTX.closePath();

        // draw the lower line of the range of the sword
        env.CTX.beginPath();
        env.CTX.moveTo(x, y);
        env.CTX.lineTo(x + this.attackReach * Math.cos((anglePlayerToCursor + this.attackAngle / 2) * (Math.PI / 180)), y + this.attackReach * Math.sin((anglePlayerToCursor + this.attackAngle / 2) * (Math.PI / 180)));
        env.CTX.stroke();
        env.CTX.closePath();

    }


    // used gpt
    inRange(enemyLeft, enemyTop, enemyRight, enemyBottom) {
        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);
        const mLoc = GAME.mouseLocation;

        const mX = mLoc.x;
        const mY = mLoc.y;
        const eX1 = enemyLeft;
        const eY1 = enemyTop;
        const eX2 = enemyRight;
        const eY2 = enemyBottom;

        // Convert the attack angle to radians
        const attackAngleRadians = this.attackAngle * Math.PI / 180;

        // Calculate the start and end angles of the attack range
        const startAngle = Math.atan2(mY - y, mX - x) - attackAngleRadians / 2;
        const endAngle = Math.atan2(mY - y, mX - x) + attackAngleRadians / 2;

        // Calculate the vertices of the triangle
        const triangleVertices = [
            [x, y],
            [x + this.attackReach * Math.cos(startAngle), y + this.attackReach * Math.sin(startAngle)],
            [x + this.attackReach * Math.cos(endAngle), y + this.attackReach * Math.sin(endAngle)]
        ];

        // Calculate the vertices of the rectangle
        const rectangleVertices = [
            [eX1, eY1],
            [eX1, eY2],
            [eX2, eY1],
            [eX2, eY2]
        ];

        // Check if any vertex of the triangle is within the rectangle
        for (const [tX, tY] of triangleVertices) {
            if (tX >= eX1 && tX <= eX2 && tY >= eY1 && tY <= eY2) {
                return true;
            }
        }

        // Check if any vertex of the rectangle is within the triangle
        for (const [rX, rY] of rectangleVertices) {
            if (this.pointInTriangle(rX, rY, triangleVertices)) {
                return true;
            }
        }

        // Check if any edge of the triangle intersects any edge of the rectangle
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.lineIntersectsLine(
                    triangleVertices[i],
                    triangleVertices[(i + 1) % 3],
                    rectangleVertices[j],
                    rectangleVertices[(j + 1) % 4]
                )) {
                    return true;
                }
            }
        }

        // No vertices or edges intersect
        return false;
    }

    pointInTriangle(px, py, [[x1, y1], [x2, y2], [x3, y3]]) {
        const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
        const area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
        const area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
        const area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
        return areaOrig === area1 + area2 + area3;
    }

    lineIntersectsLine([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }

}
