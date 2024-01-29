class Location {

    speed = 4.25 / 2;
    corner_speed = Math.sqrt(this.speed * this.speed / 2);
    multiplier = 1.4;

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

        
        if (ENGINE.keyClick["w"] && ENGINE.keyClick["d"]) {
            this.y -= corner;
            this.x += corner;
            IS_FACING_RIGHT = true;
        }
        else if (ENGINE.keyClick["w"] && ENGINE.keyClick["a"]) {
            this.y -= corner;
            this.x -= corner;
            IS_FACING_RIGHT = false;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["d"]) {
            this.y += corner;
            this.x += corner;
            IS_FACING_RIGHT = true;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["a"]) {
            this.y += corner;
            this.x -= corner;
            IS_FACING_RIGHT = false;
        }

        else if (ENGINE.keyClick["w"]) this.y -= straight;
        else if (ENGINE.keyClick["d"]) {
            this.x += straight;
            IS_FACING_RIGHT = true;
            STATE = 1;
        }
        else if (ENGINE.keyClick["s"]) this.y += straight;
        else if (ENGINE.keyClick["a"]) {
            this.x -= straight;
            IS_FACING_RIGHT = false;
            STATE = 1;
        }
        else {
            STATE = 0;
        }

        if (ENGINE.keyClick["shift"]) {
            STATE = 2;
        }
        
        //console.log(this.getCurrentChunk());

        if (this.x != x || this.y != y) MAP_MANAGER.update();
    }
    

    draw(_) {

    }

    getCurrentChunk() {
        return {
            x: Math.floor((this.x + X_OFFSET + X_CENTER) / (CHUNK_WIDTH * TILE_WIDTH)),
            y: Math.floor((this.y + Y_OFFSET + Y_CENTER) / (CHUNK_LENGTH * TILE_LENGTH))
        };
    };


}