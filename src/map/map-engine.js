const SEED = 0;

// terminology:
// tile: a tile containing data (dimensions in pixels)
// chunk: a 2D array of tiles (dimensions in tiles)
// cluster: a 2D array of chunks (dimensions in chunks)

const TILE_WIDTH = 16;
const TILE_LENGTH = 16;

const CHUNK_WIDTH = 32;
const CHUNK_LENGTH = 32;

const CLUSTER_WIDTH = 1024 / 2 - 1;
const CLUSTER_LENGTH = 1024 / 2 - 1;

const RENDER_DISTANCE = 2;

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
    breakBlock;

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
                ASSETS.queueDownload(
                    `t/${BIOMES[i]}/${BIOME_TYPES[j]}`,
                    `./res/tile/${BIOMES[i]}_/${BIOMES[i]}_ [${BIOME_TYPES[j]}].png`
                );

            }

            // queue generic tile set for the biome
            ASSETS.queueDownload(
                `t/${BIOMES[i]}`,
                `./res/tile/${BIOMES[i]}_/${BIOMES[i]}_.png`
            );
        }
        
        // loop through all extra biome types
        for (let i = 0; i < BIOME_TYPES_EXTRA.length; i++) {

            // queue download for each extra biome type
            ASSETS.queueDownload(
                `t/${BIOME_TYPES_EXTRA[i][0]}/${BIOME_TYPES_EXTRA[i][1]}`,
                `./res/tile/${BIOME_TYPES_EXTRA[i][0]}_/${BIOME_TYPES_EXTRA[i][1]}_.png`
            );

        }

        ASSETS.queueDownload(`t/transitions`, `./res/tile/transition.png`);
        ASSETS.queueDownload(`t/block/break`, `./res/tile/break-block.png`);

    };

    init() {

        // put current time millis in a variable
        const time1 = Date.now();
        this.generator = new MapGenerator(SEED, CLUSTER_WIDTH, CLUSTER_LENGTH);
        this.generatorMap = this.generator.generate();
        console.log(`Generated map in ${Date.now() - time1}ms`);

            
        // allocate new array for the cluster
        this.chunk = new Array(CLUSTER_WIDTH);
        for (let i = 0; i < CLUSTER_WIDTH; i++) {
            this.chunk[i] = new Array(CLUSTER_LENGTH);
        }

        // generate chunks around the player
        const currChunk = getCurrentChunk(GAME.player.x, GAME.player.y);
        this.forChunks(currChunk.x, currChunk.y, (i, j) => {
            this.generateChunk(i, j);
        });

        this.prevChunk = currChunk;

        this.breakBlock = new BreakBlock();

        this.update();
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
        GAME.addChunk(this.chunk[i][j] = chunk);
    };

    update() {
        const currChunk = getCurrentChunk(GAME.player.x, GAME.player.y);

        this.forChunks(this.prevChunk.x, this.prevChunk.y, (i, j) => {
            if (currChunk.x + RENDER_DISTANCE < i ||
                currChunk.x - RENDER_DISTANCE > i ||
                currChunk.y + RENDER_DISTANCE < j ||
                currChunk.y - RENDER_DISTANCE > j)
            {
                if (!this.chunk[i][j]) return;
                GAME.removeChunk(this.chunk[i][j]);
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

        for (let i = currChunk.x - RENDER_DISTANCE; i <= currChunk.x + RENDER_DISTANCE; i++) {
            for (let j = currChunk.y - RENDER_DISTANCE; j <= currChunk.y + RENDER_DISTANCE; j++) {
                if (currChunk.x + RENDER_DISTANCE < i ||
                    currChunk.x - RENDER_DISTANCE > i ||
                    currChunk.y + RENDER_DISTANCE < j ||
                    currChunk.y - RENDER_DISTANCE > j) continue;
                //console.log("ChunkSSS ---> " + this.chunk[i + 1][j] + " " + this.chunk[i][j + 1] + " val: " + val.offsetWest + " " + val.offsetNorth);
                this.chunk[i][j].smoothen(this.chunk[i + 1][j], this.chunk[i][j + 1]);
                //console.log("POSTSSS ---> val: " + val.offsetWest + " " + val.offsetNorth);
            }
        }
        this.prevChunk = currChunk;

        this.breakBlock.update(3);

    };

    forChunks(x, y, func) {
        for (let i = x - RENDER_DISTANCE; i <= x + RENDER_DISTANCE; i++) {
            for (let j = y - RENDER_DISTANCE; j <= y + RENDER_DISTANCE; j++) {
                func(i, j);
            }
        }
    }

}
