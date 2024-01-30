class Chunk {

    chunkX;
    chunkY;
    biome;
    chunkSeed;

    updatedSeed;

    multiplier;

    tiles = [];

    MULTIPLIERS = [
        4,
        17,
        23,
        30,
        44,
        59,
        83,
        97,
    ]


    constructor(chunkX, chunkY, biome, chunkSeed) {
        this.chunkX = chunkX;
        this.chunkY = chunkY;
        this.biome = biome;
        this.chunkSeed = chunkSeed;
        this.updatedSeed = chunkSeed;

        this.multiplier = 0;
    }



    async generate() {
        for (let i = 0; i < CHUNK_WIDTH; i++) {
            const arr = [];
            for (let j = 0; j < CHUNK_LENGTH; j++) {

                const multiplier = this.MULTIPLIERS[this.multiplier = (this.multiplier + 1) % (this.MULTIPLIERS.length - 1)];

                const val = this.updatedSeed * multiplier;

                this.updatedSeed = val / 27;

                const tile = new BiomeTile(
                    BIOMES[this.biome],
                    BiomeTile.randomize((val % 10) / 10, Math.floor((val * multiplier * 2) % 1000)),
                    this.chunkX,
                    this.chunkY,
                    i,
                    j
                );
                arr.push(tile);
            }
            this.tiles.push(arr);
        }
        return this;
    };

    draw(ctx) {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].draw(ctx);
            }
        }
    };

}