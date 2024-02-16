class BiomeTile {
    
    animated_speed = 0.5;
    animated_frames = 4;
    animated_distance = 16 * 4;

    biome;
    type;
    direction;
    animated = false;
    tileX;
    tileY;

    holder;

    // bcw-ne: biome corner w/ water, northeast
    BIOME_TILESET = {

        "b-0": { x: 1, y: 1 },
        "b-1-0": { x: 9, y: 0 },
        "b-1-1": { x: 9, y: 1 },
        "b-1-2": { x: 9, y: 2 },
        "b-1-3": { x: 9, y: 3 },
        "b-1-4": { x: 10, y: 0 },
        "b-1-5": { x: 10, y: 1 },
        "b-1-6": { x: 10, y: 2 },
        "b-1-7": { x: 10, y: 3 },
        "b-2-0": { x: 7, y: 0 },
        "b-2-1": { x: 7, y: 1 },
        "b-2-2": { x: 8, y: 0 },
        "b-2-3": { x: 8, y: 1 },


        // biome-biome corner tiles
        "bcb:ne": { x: 0, y: 0 },
        "bcb:n": { x: 1, y: 0 },
        "bcb:nw": { x: 4, y: 0 },
        "bcb:e": { x: 0, y: 1 },
        "bcb:w": { x: 4, y: 1 },
        "bcb:se": { x: 0, y: 3 },
        "bcb:s": { x: 1, y: 3 },
        "bcb:sw": { x: 4, y: 3 },

        // biome-biome corner entrance tiles
        "bcb-e:ne": { x: 2, y: 0 },
        "bcb-e:nw": { x: 3, y: 0 },
        "bcb-e:se": { x: 2, y: 3 },
        "bcb-e:sw": { x: 3, y: 3 },

        // biome-biome edge tiles
        "beb:nw": { x: 5, y: 0 },
        "beb:n": { x: 6, y: 0 },
        "beb:ne": { x: 7, y: 0 },
        "beb:w": { x: 5, y: 1 },
        "beb:e": { x: 7, y: 1 },
        "beb:sw": { x: 5, y: 2 },
        "beb:s": { x: 6, y: 2 },
        "beb:se": { x: 7, y: 2 },

    };

    BIOME_TILESET_ANIMATED = {

        // biome-water corner tiles
        "bcw:ne": { x: 0, y: 4 },
        "bcw:n": { x: 1, y: 4 },
        "bcw:nw": {x: 2, y: 4 },
        "bcw:e": { x: 0, y: 5 },
        "bcw:w": { x: 2, y: 5 },
        "bcw:se": { x: 0, y: 6 },
        "bcw:s": { x: 1, y: 6 },
        "bcw:sw": { x: 2, y: 6 },

        // biome-water edge tiles
        "bew:ne": { x: 3, y: 4 },
        "bew:nw": { x: 4, y: 4 },
        "bew:se": { x: 3, y: 5 },
        "bew:sw": { x: 4, y: 5 }

    }

    BIOME_TRANSITION_TILES = {


        "bcb:ne": { x: -1, y: -1 },
        "bcb:n": { x: 0, y: -1 },
        "bcb:nw": { x: 1, y: -1 },
        "bcb:e": { x: -1, y: 0 },
        "bcb:w": { x: 1, y: 0 },
        "bcb:se": { x: -1, y: 1 },
        "bcb:s": { x: 0, y: 1 },
        "bcb:sw": { x: 1, y: 1 },

        "desert": {
            "forest": {
                x: 4,
                y: 0,
                reverse: false
            },
            "taiga": {
                x: 4,
                y: 1,
                reverse: false
            },
            "swamp": {
                x: 2,
                y: 1,
                reverse: false
            },
            "tundra": {
                x: 3,
                y: 0,
                reverse: false
            }
        },
        "forest": {
            "desert": {
                x: 4,
                y: 0,
                reverse: true
            },
            "taiga": {
                x: 3,
                y: 1,
                reverse: false
            },
            "swamp": {
                x: 1,
                y: 1,
                reverse: false
            },
            "tundra": {
                x: 2,
                y: 0,
                reverse: false
            }
        },
        "taiga": {
            "desert": {
                x: 4,
                y: 1,
                reverse: true
            },
            "forest": {
                x: 3,
                y: 1,
                reverse: true
            },
            "swamp": {
                x: 0,
                y: 1,
                reverse: false
            },
            "tundra": {
                x: 1,
                y: 0,
                reverse: false
            }
        },
        "swamp": {
            "desert": {
                x: 2,
                y: 1,
                reverse: true
            },
            "forest": {
                x: 1,
                y: 1,
                reverse: true
            },
            "taiga": {
                x: 0,
                y: 1,
                reverse: true
            },
            "tundra": {
                x: 0,
                y: 0,
                reverse: false
            }
        },
        "tundra": {
            "desert": {
                x: 3,
                y: 0,
                reverse: true
            },
            "forest": {
                x: 2,
                y: 0,
                reverse: true
            },
            "taiga": {
                x: 1,
                y: 0,
                reverse: true
            },
            "swamp": {
                x: 0,
                y: 0,
                reverse: true
            }
        }

    }

    constructor(biome, tileSeed, oneTenth, chunkX, chunkY, tileX, tileY) {

        this.biome = biome;
        this.tileSeed = tileSeed;
        this.chance = (oneTenth % 10) / 10;
        this.chunkX = chunkX;
        this.chunkY = chunkY;
        this.tileX = tileX;
        this.tileY = tileY;

        if (this.animated) {
            this.holder = new Animator(
                ASSET_MANAGER.getImage(`t/${biome}`),
                (this.BIOME_TILESET_ANIMATED[selection].x + 1) * 16,
                (this.BIOME_TILESET_ANIMATED[selection].y + 1) * 16,
                16,
                16,
                this.animated_frames,
                this.animated_speed,
                1,
                false,
                true
            );
            //this.holder.xOffset = this.animated_distance;
        } else {
            this.holder = ASSET_MANAGER.getImage(`t/${biome}`);
            //console.log(ASSET_MANAGER.getImage(`t/${biome}`));
        }

    }

    update() {
        // add logic for player location
    }

    draw(ctx) {

        const current = LOCATION.getCurrentChunk();

        if (
            current.x + RENDER_DISTANCE < this.chunkX ||
            current.x - RENDER_DISTANCE > this.chunkX ||
            current.y + RENDER_DISTANCE < this.chunkY ||
            current.y - RENDER_DISTANCE > this.chunkY
        ) return;

        if (this.animated) {
            this.holder.drawFrame(
                ENGINE.clockTick,
                ctx,
                this.tileX * 16 - LOCATION.x,
                this.tileY * 16 - LOCATION.y,
                1
            );
        } else {
            //console.log(this.holder + " " + this.selected + " " + this.chunkX + " " + this.chunkY + " " + this.tileX + " " + this.tileY + " " + LOCATION.x + " " + LOCATION.y + " " + env.X_OFFSET + " " + env.Y_OFFSET);

            ctx.drawImage(
                this.holder,
                (this.selected.x + 1) * TILE_WIDTH,
                (this.selected.y + 1) * TILE_LENGTH,
                TILE_WIDTH,
                TILE_LENGTH,
                this.chunkX * CHUNK_WIDTH * TILE_WIDTH + this.tileX * TILE_WIDTH - LOCATION.x - env.X_OFFSET,
                this.chunkY * CHUNK_LENGTH * TILE_LENGTH + this.tileY * TILE_LENGTH - LOCATION.y - env.Y_OFFSET,
                TILE_WIDTH,
                TILE_LENGTH
            );
        }
    }

    chance_regular = 0.7;
    chance_type_1 = 0.25;
    chance_type_2 = 0.05;

    setRandomized() {
        if (this.chance < this.chance_regular) {
            this.selected = this.BIOME_TILESET["b-0"];
        } else if (this.chance < this.chance_regular + this.chance_type_1) {
            this.selected = this.BIOME_TILESET[`b-1-${parseInt(this.tileSeed / 125)}`];
        } else this.selected = this.BIOME_TILESET[`b-2-${parseInt(this.tileSeed / 250)}`];
        this.holder = ASSET_MANAGER.getImage(`t/${this.biome}`);
    }

    setTransition(neighborBiome, direction) {
        neighborBiome = BIOMES[neighborBiome];
        //console.log(this.biome + " " + neighborBiome + " " + direction)
        if (this.biome == "cave" || neighborBiome == "cave" || this.biome == neighborBiome) return;
        const transitionSection = this.BIOME_TRANSITION_TILES[this.biome][neighborBiome];
        const transitionTile = this.BIOME_TRANSITION_TILES[`bcb:${direction}`];
        const rev = (this.BIOME_TRANSITION_TILES[this.biome][neighborBiome].reverse ? -1 : 1);  
        if (rev) this.biome = neighborBiome;   

        this.selected = {
            x: (1 + transitionSection.x * 3 + rev * transitionTile.x),
            y: (1 + transitionSection.y * 3 + rev * transitionTile.y)
        };
        this.holder = ASSET_MANAGER.getImage("t/transitions");

    }

}