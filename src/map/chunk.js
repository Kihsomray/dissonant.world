class Chunk {

    chunkX;
    chunkY;
    biome;
    chunkSeed;
    updatedSeed;

    multiplier;

    tiles = [];

    // prime numbers
    MULTIPLIERS = [
        13,
        17,
        23,
        29,
        37,
        59,
        83
    ]


    constructor(chunkX, chunkY, biome, chunkSeed) {
        this.chunkX = chunkX;
        this.chunkY = chunkY;
        this.biome = biome;
        this.chunkSeed = chunkSeed;

        this.multiplier = 0;
    }



    generate() {
        for (let i = 0; i < CHUNK_WIDTH; i++) {
            const arr = [];
            for (let j = 0; j < CHUNK_LENGTH; j++) {

                const val = this.updatedSeed * this.MULTIPLIERS[this.multiplier++ % this.MULTIPLIERS.length];
                this.updatedSeed = val / 10 + this.MULTIPLIERS[this.multiplier];

                const tile = new BiomeTile(
                    BIOMES[this.biome],
                    BiomeTile.randomize((val % 10) / 10),
                    this.chunkX,
                    this.chunkY,
                    i,
                    j
                );
                arr.push(tile);
                ENGINE.addEntity(tile);
            }
            this.tiles.push(arr);
        }
        return this;
    }

}