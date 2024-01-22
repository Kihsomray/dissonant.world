class Chunk {

    biome;
    chunkX;
    chunkY;

    tiles = [];

    constructor(biome, chunkX, chunkY) {
        this.biome = biome;
        this.chunkX = chunkX;
        this.chunkY = chunkY;
    }

    generate() {
        for (let i = 0; i < CHUNK_WIDTH; i++) {
            const arr = [];
            for (let j = 0; j < CHUNK_LENGTH; j++) {
                const tile = new BiomeTile(this.biome, this.chunkX, this.chunkY, i, j);
                arr.push(tile);
                ENGINE.addEntity(tile);
            }
            this.tiles.push(arr);
        }
        return this;
    }

}