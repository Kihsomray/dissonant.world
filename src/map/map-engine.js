const SEED = 0;

// terminology:
// tile: a tile containing data (dimensions in pixels)
// chunk: a 2D array of tiles (dimensions in tiles)
// cluster: a 2D array of chunks (dimensions in chunks)

const TILE_WIDTH = 16;
const TILE_LENGTH = 16;

const CHUNK_WIDTH = 32;
const CHUNK_LENGTH = 32;

const CLUSTER_WIDTH = 1023;
const CLUSTER_LENGTH = 1023;

const RENDER_DISTANCE = 1;

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

    generatorMap;
    chunks = [];
    prevChunk;

    constructor() {

        // load all assets for all biomes
        this.#loadAssets();
    };

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

        // put current time millis in a variable
        const time1 = Date.now();
        this.generatorMap = new MapGenerator(SEED, CLUSTER_WIDTH, CLUSTER_LENGTH).generate();
        console.log(`Generated map in ${Date.now() - time1}ms`);

            
        // allocate new array for the cluster
        this.chunk = new Array(CLUSTER_WIDTH);
        for (let i = 0; i < CLUSTER_WIDTH; i++) {
            this.chunk[i] = new Array(CLUSTER_LENGTH);
        }

        // generate chunks around the player
        const currChunk = LOCATION.getCurrentChunk();
        this.forChunks(currChunk.x, currChunk.y, (i, j) => {
            this.generateChunk(i, j);
        });
        this.prevChunk = currChunk;

    };

    generateChunk(i, j) {
        if (!this.generatorMap[i][j]) return;
        const chunk = new Chunk(
            i,
            j,
            Object.keys(this.generatorMap[i][j])[0],
            Object.values(this.generatorMap[i][j])[0]
        );
        chunk.generate();
        ENGINE.addChunk(this.chunk[i][j] = chunk);
    };

    update() {
        const currChunk = LOCATION.getCurrentChunk();

        this.forChunks(this.prevChunk.x, this.prevChunk.y, (i, j) => {
            if (currChunk.x + RENDER_DISTANCE < i ||
                currChunk.x - RENDER_DISTANCE > i ||
                currChunk.y + RENDER_DISTANCE < j ||
                currChunk.y - RENDER_DISTANCE > j)
            {
                if (!this.chunk[i][j]) return;
                ENGINE.removeChunk(this.chunk[i][j]);
                this.chunk[i][j] = undefined;
            }
        });

        this.forChunks(currChunk.x, currChunk.y, (i, j) => {
            if (currChunk.x + RENDER_DISTANCE < i ||
                currChunk.x - RENDER_DISTANCE > i ||
                currChunk.y + RENDER_DISTANCE < j ||
                currChunk.y - RENDER_DISTANCE > j) return;
            if (!this.chunk[i][j]) {
                this.generateChunk(i, j);
            }
        });
        this.prevChunk = currChunk;
    };

    forChunks(x, y, func) {
        for (let i = x - RENDER_DISTANCE; i <= x + RENDER_DISTANCE; i++) {
            for (let j = y - RENDER_DISTANCE; j <= y + RENDER_DISTANCE; j++) {
                func(i, j);
            }
        }
    }

}
