class Sword {

    x;
    y;
    state;

    attackAngle = 45;
    attackReach = 30;

    scale = 1;

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

        this.animations = [];
        this.loadAnimations();

    }

    setState(direction) {
        this.facing = direction;
    }

    loadAnimations() {

        this.setItem(GAME.player.hotbarTools.inventory[0][0].itemData);

    }

    update() {

        this.hit = false;

        // Update the location of the sword status
        this.x = GAME.player.x + this.width / 2;
        this.y = GAME.player.y + this.height / 2 + this.height / 3;

        if (this.animations[1].isDone()) {
            this.state = 0;
            this.animations[1].elapsedTime = 0;
        }

        // Update Swing status
        if (GAME.keyClick[" "] && this.state != 1) {
            console.log("swing")
            this.state = 1;
            this.hit = true;
        }

        if (GAME.keyClick["z"] || GAME.player.hotbarTools.inventory[0][0] != this.prevZ) {
            this.setItem(GAME.player.hotbarTools.inventory[0][0].itemData);
        } else if (GAME.keyClick["x"] || GAME.player.hotbarTools.inventory[1][0] != this.prevX) {
            this.setItem(GAME.player.hotbarTools.inventory[1][0].itemData);
        }

        this.prevZ = GAME.player.hotbarTools.inventory[0][0];
        this.prevX = GAME.player.hotbarTools.inventory[1][0];

    }

    setItem(item) {
        if (item.asset != undefined) {
            this.width = 32;
            this.height = 32;
            const spritesheet = ASSETS.getImage(item.asset);
            this.animations[0] = new Animator(spritesheet, 0, 0, 32, 32, 1, item.attackCooldown || 1, 1, false, true);
            this.animations[1] = new Animator(spritesheet, 0, 32, 32, 32, 4, (item.attackCooldown || 1) / 4, 1, false, false);
            this.scale = 1;
        } else {
            const loc = item.location;
            const size = item.size;
            this.width = size[0];
            this.height = size[1];
            const spritesheet = ASSETS.getImage("i/*");
            this.scale = 0.5;
            this.animations[0] = new Animator(spritesheet, loc[0], loc[1], size[0], size[1], 1, item.attackCooldown || 1, 1, false, true);
            this.animations[1] = new Animator(spritesheet, loc[0], loc[1], size[0], size[1], 1, item.attackCooldown || 1, 1, false, false);
        }
    }


    draw() {
        
        let { x, y } = LOCATION.getTrueLocation(this.x, this.y);
            
        // Draw the sword
        const cLoc = GAME.mouseLocation;
    
        x += (GAME.player.goingRight ? (this.width / this.scale / 4) : (-this.width / this.scale / 16 / 5));

        // center of the canvas
        env.CTX.translate(x, y);

        const fR = GAME.player.state === 6 ? !GAME.player.goingRight : GAME.player.goingRight;

        if (!fR) env.CTX.scale(1, -1);

        // if the sword is in the attacking state
        // rotate the sword, calculate the additional 
        // rotation based on the current frame of the animation
        
        const extraRotation = this.state === 1 ? Math.min(this.animations[1].elapsedTime / this.animations[1].totalTime * 8, 1) * Math.PI / 2 - Math.PI / 2 : 0;

        // rotate the canvas to the mouse location
        env.CTX.rotate((fR ? 1 : -1) * Math.atan2(cLoc.y - y, cLoc.x - x) + 1 / 2 * Math.PI + extraRotation);

        // draw the sword
        this.animations[this.state].drawFrame(GAME.clockTick, env.CTX, -this.width * this.scale / 2, -this.height * this.scale * 3 / 4, this.scale);

        // rotate the canvas back
        env.CTX.rotate((fR ? -1 : 1) * Math.atan2(cLoc.y - y, cLoc.x - x) - 1 / 2 * Math.PI - extraRotation);

        if (!fR) env.CTX.scale(1, -1);

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
