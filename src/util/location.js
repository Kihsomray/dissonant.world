class Location {

    boundingWidth = 160;
    boundingHeight = 120;

    x;
    y;


    constructor() {
        this.x = 0;
        this.y = 0;
    }

    getTrueLocation(x, y) {

        // create a bounding box that when the player reaches its border, the map will move
        this.x = Math.max(Math.min(this.x, GAME.player.x + env.CENTER.x / 2), GAME.player.x - env.CENTER.x / 2);
        this.y = Math.max(Math.min(this.y, GAME.player.y + env.CENTER.y / 2), GAME.player.y - env.CENTER.y / 2);
        

        //console.log("The player coords are" + GAME.player.x + ", " + GAME.player.y + " The box coords " + this.x + ", " + this.y);
        return {
            x: x + env.CENTER.x - this.x,
            y: y + env.CENTER.y - this.y,
        };
    }

}




function getCurrentChunk(x, y) {
    return {
        x: Math.floor((x + env.CENTER.x + env.MAP.OFFSET.x) / (CHUNK_WIDTH * TILE_WIDTH)),
        y: Math.floor((y + env.CENTER.y + env.MAP.OFFSET.y) / (CHUNK_LENGTH * TILE_LENGTH))
    };
};

