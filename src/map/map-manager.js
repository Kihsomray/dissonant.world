class MapManager{

    tiles = [];

    tileScale = 1;
    tileWidth = 32;
    tileLength = 18;

    biome = [
        "cave",
        "desert",
        "forest",
        "swamp",
        "taiga",
        "tundra"
    ];
    
    type = [
        "bridgeAnimatedTiles",
        "bridgeHorizontal",
        "bridgeVertical",
        "fencesAndWalls",
        "fountain",
        "resources"
    ];
    
    extra = [
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

    constructor() {
        this.#loadAssets();
    }

    #loadAssets() {
        for (let i = 0; i < this.biome.length; i++) {

            for (let j = 0; j < this.type.length; j++) {
                ASSET_MANAGER.queueDownload(
                    `t/${this.biome[i]}/${this.type[j]}`,
                    `./res/tile/${this.biome[i]}_/${this.biome[i]}_ [${this.type[j]}].png`
                );
            }

            ASSET_MANAGER.queueDownload(
                `t/${this.biome[i]}`,
                `./res/tile/${this.biome[i]}_/${this.biome[i]}_.png`
            );
        }
        
        for (let i = 0; i < this.extra.length; i++) {

            ASSET_MANAGER.queueDownload(
                `t/${this.extra[i][0]}/${this.extra[i][1]}`,
                `./res/tile/${this.extra[i][0]}_/${this.extra[i][1]}_.png`
            );

        }
    }

    init() {
        for (let i = 0; i < this.tileWidth; i++) {
            const arr = []
            for (let j = 0; j < this.tileLength; j++) {
                const tile = new BiomeTile(this.biome[4], BiomeTile.randomize(), i, j);
                arr.push(tile);
                ENGINE.addEntity(tile);
            }
            this.tiles.push(arr);
        }
        return this;
    }

    update() {

    }

    draw(ctx) {

        for (let i = 0; i < this.tileWidth; i++) {
            for (let j = 0; j < this.tileLength; j++) {
                this.tiles[i][j].drawFrame(
                    ENGINE.clockTick,
                    ctx,
                    i * 16 * this.tileScale,
                    j * 16 * this.tileScale,
                    this.tileScale
                );
            }
        }
    }

    forAllTiles(func) {
        for (let i = 0; i < this.tileWidth; i++) {
            for (let j = 0; j < this.tileLength; j++) {
                func(i, j);
            }
        }
    }


}