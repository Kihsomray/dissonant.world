class Location {
    
    speed = 2.8;
    corner_speed = Math.sqrt(this.speed * this.speed / 1.5);
    multiplier = 1.75;

    x;
    y;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update() {
        const x = this.x;
        const y = this.y;

        const boost = ENGINE.keyClick["shift"] ? this.multiplier : 1;

        const corner = Math.round(this.corner_speed * boost * 2 * ENGINE.clockTick * 50) / 2;
        const straight = Math.round(this.speed * boost * 2 * ENGINE.clockTick * 50) / 2;

        if (ENGINE.keyClick["w"] && ENGINE.keyClick["d"] && !(BLOCKED_UP || BLOCKED_RIGHT)) {
            this.x += corner;
            this.y -= corner;
            IS_FACING_RIGHT = true;
            STATE = 1;
        }
        else if (ENGINE.keyClick["w"] && ENGINE.keyClick["a"] && !(BLOCKED_UP || BLOCKED_LEFT)) {
            this.y -= corner;
            this.x -= corner;
            IS_FACING_RIGHT = false;
            STATE = 1;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["d"] && !(BLOCKED_DOWN || BLOCKED_RIGHT)) {
            this.y += corner;
            this.x += corner;
            IS_FACING_RIGHT = true;
            STATE = 1;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["a"] && !(BLOCKED_DOWN || BLOCKED_LEFT)) {
            this.y += corner;
            this.x -= corner;
            IS_FACING_RIGHT = false;
            STATE = 1;
        }
        else if (ENGINE.keyClick["w"] && !BLOCKED_UP) {
            this.y -= straight;
            BLOCKED_DOWN = false;
            STATE = 1;
        }
        else if (ENGINE.keyClick["a"] && !BLOCKED_LEFT) {
            this.x -= straight;
            IS_FACING_RIGHT = false;
            BLOCKED_RIGHT = false;
            STATE = 1;
        }
        else if (ENGINE.keyClick["s"] && !BLOCKED_DOWN) {
            this.y += straight;
            BLOCKED_UP = false;
            STATE = 1;
        }
        else if (ENGINE.keyClick["d"] && !BLOCKED_RIGHT) {
            this.x += straight;
            IS_FACING_RIGHT = true;
            BLOCKED_LEFT = false;
            STATE = 1;
        }
        else {
            STATE = 0;
            BLOCKED_UP = false;
            BLOCKED_RIGHT = false;
            BLOCKED_DOWN = false;
            BLOCKED_LEFT = false;
        }

        if (BLOCKED_DOWN || BLOCKED_LEFT || BLOCKED_RIGHT || BLOCKED_UP) {
            STATE = 4; 
        }
        
        if (ENGINE.keyClick["shift"] && STATE == 1) {
            STATE = 2;
        }

        
        
        //console.log(this.getCurrentChunk());

        if (this.x != x || this.y != y) MAP_MANAGER.update();
    }


    draw(_) {

    }

    getCurrentChunk() {
        return {
            x: Math.floor((this.x + env.X_OFFSET + env.X_CENTER) / (CHUNK_WIDTH * TILE_WIDTH)),
            y: Math.floor((this.y + env.Y_OFFSET + env.Y_CENTER) / (CHUNK_LENGTH * TILE_LENGTH))
        };
    };


}