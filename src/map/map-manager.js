const SEED = 0;

// terminology:
// tile: a tile containing data (dimensions in pixels)
// chunk: a 2D array of tiles (dimensions in tiles)
// cluster: a 2D array of chunks (dimensions in chunks)

const TILE_WIDTH = 16;
const TILE_LENGTH = 16;

const CHUNK_WIDTH = 32;
const CHUNK_LENGTH = 32;

const CLUSTER_WIDTH = 6;
const CLUSTER_LENGTH = 6;

const BIOMES = [
    "cave",
    "desert",
    "forest",
    "swamp",
    "taiga",
    "tundra"
];

const BIOME_TYPES = [
    "bridgeAnimatedTiles",
    "bridgeHorizontal",
    "bridgeVertical",
    "fencesAndWalls",
    "fountain",
    "resources"
];

const BIOME_TYPES_EXTRA = [
    ["cave", "railway"],
    ["desert", "path"],
    ["desert", "quickSand"],
    ["swamp", "puddle"],
    ["taiga", "path"],
    ["tundra", "ice"],
    ["tundra", "igloo"],
    ["tundra", "path"],
    ["tundra", "snow"]
];

class MapManager{

    seed = 0;
    generatorMap;
    chunks = [];

    constructor() {

        // load all assets for all biomes
        this.#loadAssets();
    }

    #loadAssets() {

        // loop through all biomes
        for (let i = 0; i < BIOMES.length; i++) {

            // loop through all biome types
            for (let j = 0; j < BIOME_TYPES.length; j++) {

                // queue download for each biome type
                ASSET_MANAGER.queueDownload(
                    `t/${BIOMES[i]}/${BIOME_TYPES[j]}`,
                    `./res/tile/${BIOMES[i]}_/${BIOMES[i]}_ [${BIOME_TYPES[j]}].png`
                );

            }

            // queue generic tile set for the biome
            ASSET_MANAGER.queueDownload(
                `t/${BIOMES[i]}`,
                `./res/tile/${BIOMES[i]}_/${BIOMES[i]}_.png`
            );
        }
        
        // loop through all extra biome types
        for (let i = 0; i < BIOME_TYPES_EXTRA.length; i++) {

            // queue download for each extra biome type
            ASSET_MANAGER.queueDownload(
                `t/${BIOME_TYPES_EXTRA[i][0]}/${BIOME_TYPES_EXTRA[i][1]}`,
                `./res/tile/${BIOME_TYPES_EXTRA[i][0]}_/${BIOME_TYPES_EXTRA[i][1]}_.png`
            );

        }

    };

    init() {

        this.generatorMap = new MapGenerator(this.seed, CLUSTER_WIDTH, CLUSTER_LENGTH).generate();

        //console.log(this.generatorMap);
        for (let i = 0; i < CLUSTER_WIDTH; i++) {
            const arr = [];
            for (let j = 0; j < CLUSTER_LENGTH; j++) {
                //console.log(Object.keys(this.generatorMap[i][j])[0]);
                arr.push(this.generateChunk(Math.floor(Object.keys(this.generatorMap[i][j])[0]), i, j));
            }
            this.chunks.push(arr);
        }

    }

    update() {

    }

    draw(ctx) {

        for (let i = 0; i < CLUSTER_WIDTH; i++) {
            for (let j = 0; j < CLUSTER_LENGTH; j++) {
                this.updateChunk(ctx, i, j);
            }
        }

    }

    generateChunk(biomeIndex, chunkX, chunkY) {
        console.log(BIOMES[biomeIndex]);
        const tiles = [];
        for (let i = 0; i < CHUNK_WIDTH; i++) {
            //console.log("yuh2");
            const arr = []
            for (let j = 0; j < CHUNK_LENGTH; j++) {
                //console.log("yuh3");
                //console.log(CHUNK_WIDTH * this.tileWidth * chunkX + i);
                //console.log(CHUNK_LENGTH * this.tileLength * chunkY + j);
                const tile = new BiomeTile(
                    BIOMES[biomeIndex],
                    BiomeTile.randomize(),
                    chunkX,
                    chunkY,
                    i,
                    j
                );
                arr.push(tile);
                ENGINE.addEntity(tile);
            }
            tiles.push(arr);
        }
        return this;
    }

    updateChunk(ctx, chunkX, chunkY) {
        tiles = this.chunks[chunkX][chunkY];
        console.log("@ " + chunkX + ", " + chunkY)
        forAllTiles((i, j) => {
            tiles[i][j].draw(ctx, chunkX, chunkY);
        });
    }

    forAllTiles(func) {
        for (let i = 0; i < CHUNK_WIDTH; i++) {
            for (let j = 0; j < CHUNK_LENGTH; j++) {
                func(i, j);
            }
        }
    }

}