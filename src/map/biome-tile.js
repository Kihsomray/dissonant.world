class BiomeTile {
    
    animated_speed = 0.5;
    animated_frames = 4;
    animated_distance = 16 * 4;

    biome;
    type;
    direction;
    animated;
    tileX;
    tileY;

    holder;

    // bcw-ne: biome corner w/ water, northeast
    BIOME_TILESET = {

        "b-0": { x: 1, y: 1 },
        "b-1-1": { x: 9, y: 0 },
        "b-1-2": { x: 9, y: 1 },
        "b-1-3": { x: 9, y: 2 },
        "b-1-4": { x: 9, y: 3 },
        "b-1-5": { x: 10, y: 0 },
        "b-1-6": { x: 10, y: 1 },
        "b-1-7": { x: 10, y: 2 },
        "b-1-8": { x: 10, y: 3 },
        "b-2-1": { x: 7, y: 0 },
        "b-2-2": { x: 7, y: 1 },
        "b-2-3": { x: 8, y: 0 },
        "b-2-4": { x: 8, y: 1 },


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

    constructor(biome, selection, chunkX, chunkY, tileX, tileY) {

        this.biome = biome;
        this.selected = selection;
        this.animated = selection.charAt(2) == "w";
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
            this.holder.xOffset = this.animated_distance;
        } else {
            this.holder = ASSET_MANAGER.getImage(`t/${biome}`);
        }

    }

    update() {
        // add logic for player location
    }

    draw(ctx) {
        if (this.animated) {
            this.holder.drawFrame(
                ENGINE.clockTick,
                ctx,
                this.tileX * 16 - LOCATION.x,
                this.tileY * 16 - LOCATION.y,
                1
            );
        } else {
            ctx.drawImage(
                this.holder,
                (this.BIOME_TILESET[this.selected].x + 1) * 16,
                (this.BIOME_TILESET[this.selected].y + 1) * 16,
                16,
                16,
                this.chunkX * 32 * 16 + this.tileX * 16 - LOCATION.x,
                this.chunkY * 32 * 16 + this.tileY * 16 - LOCATION.y,
                16,
                16
            );
        }
    }

    static chance_regular = 0.7;
    static chance_type_1 = 0.25;
    static chance_type_2 = 0.05;

    static randomize(num) {
        if (num < this.chance_regular) {
            return "b-0";
        }
        if (num < this.chance_regular + this.chance_type_1) {
            return "b-1-" + (Math.floor(Math.random() * 8) + 1);
        }
        return "b-2-" + (Math.floor(Math.random() * 4) + 1);
    }

}