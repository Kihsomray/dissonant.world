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
                    Math.floor((val * multiplier * 2) % 1000),
                    val, 
                    this.chunkX,
                    this.chunkY,
                    i,
                    j
                );
                tile.setRandomized();
                arr.push(tile);
            }
            this.tiles.push(arr);
        }
        return this;
    };

    smoothen(chunkEast, chunkSouth) {

        let rando = MAP.generator.random(this.chunkSeed);

        let offsetWest = 0;
        let offsetNorth = 0;

        for (let i = 0; i < CHUNK_LENGTH; i++) {

            if (chunkSouth == null) break;

            if (offsetWest < 0) {
                //console.log("offsetWest: " + offsetWest);
                this.tiles[i][CHUNK_LENGTH + offsetWest].setTransition(chunkSouth.biome, "s");
                for (let j = CHUNK_LENGTH + offsetWest + 1; j < CHUNK_LENGTH; j++) {
                    this.tiles[i][j].biome = BIOMES[chunkSouth.biome];
                    this.tiles[i][j].holder = ASSETS.getImage(`t/${BIOMES[chunkSouth.biome]}`);
                }
            } else {
                chunkSouth.tiles[i][offsetWest].setTransition(this.biome, "n");
                for (let j = 0; j < offsetWest; j++) {
                    chunkSouth.tiles[i][j].biome = BIOMES[this.biome];
                    chunkSouth.tiles[i][j].holder = ASSETS.getImage(`t/${BIOMES[this.biome]}`);
                }
            }

            let val = Math.floor(rando() * 3) - 1;

            // ensure it doesnt go too much inward or outward.
            offsetWest = Math.max(Math.min(val + offsetWest, CHUNK_WIDTH / 4), -CHUNK_WIDTH / 4);

        }

        rando = MAP.generator.random(this.chunkSeed + 1);

        for (let i = 0; i < CHUNK_WIDTH; i++) {

            if (chunkEast == null) break;

            if (offsetNorth < 0) {
                this.tiles[CHUNK_WIDTH + offsetNorth][i].setTransition(chunkEast.biome, "w");
                for (let j = CHUNK_WIDTH + offsetNorth + 1; j < CHUNK_WIDTH; j++) {
                    this.tiles[j][i].biome = BIOMES[chunkEast.biome];
                    this.tiles[j][i].setRandomized();
                }
            } else {
                chunkEast.tiles[offsetNorth][i].setTransition(this.biome, "e");
                for (let j = 0; j < offsetNorth; j++) {
                    chunkEast.tiles[j][i].biome = BIOMES[this.biome];
                    chunkEast.tiles[j][i].setRandomized();
                }
            }

            let val = Math.floor(rando() * 3) - 1;

            // ensure it doesnt go too much inward or outward.
            offsetNorth = Math.max(Math.min(val + offsetNorth, CHUNK_LENGTH / 4), -CHUNK_LENGTH / 4);

        }


    }

    draw(ctx) {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].draw(ctx);
            }
        }
    };

}