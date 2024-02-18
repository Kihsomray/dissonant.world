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
        this.x = Math.max(Math.min(this.x, GAME.player.x + env.CENTER.x / 3), GAME.player.x - env.CENTER.x / 3);
        this.y = Math.max(Math.min(this.y, GAME.player.y + env.CENTER.y / 3), GAME.player.y - env.CENTER.y / 3);
        

        //console.log(x + env.CENTER.x - this.x - env.OFFSET.x, y + env.CENTER.y - this.y - env.OFFSET.y)
        return {
            x: Math.round((x + env.CENTER.x - this.x - env.OFFSET.x) * 2) / 2,
            y: Math.round((y + env.CENTER.y - this.y - env.OFFSET.y) * 2) / 2,
        };
    }

}




function getCurrentChunk(x, y) {
    const loc = LOCATION.getTrueLocation(x, y);
    //console.log("The loc is " + Math.floor(x + (CHUNK_WIDTH * TILE_WIDTH / 2)) + ", " + Math.floor(y + (CHUNK_LENGTH * TILE_LENGTH / 2)));
    return {
        x: Math.floor(x / (CHUNK_WIDTH * TILE_WIDTH) + (CLUSTER_WIDTH) / 2),
        y: Math.floor(y / (CHUNK_LENGTH * TILE_LENGTH) + (CLUSTER_LENGTH) / 2)
    };
};

