class MapGenerator {

    seed;
    height;
    width;

    constructor(seed, height, width) {

        this.seed = seed;
        this.height = height;
        this.width = width;

    }

    generate() {

        let rng = random(seed);
        
        for (let i = 0; i < Math.round(rng() * 1000); i++) {
            rng();
        }
        
        let grid = new Array(this.height);
        
        for (let i = 0; i < this.height; i++) {
            grid[i] = new Array(this.width);
        }
        
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                grid[i][j] = Math.floor(rng() * 256);
            }
        }
        
        //Try smoothing the array
        grid = smooth(grid, this.height, this.width);
        grid = smooth(grid, this.height, this.width);
        grid = smooth(grid, this.height, this.width);
        grid = smooth(grid, this.height, this.width);
        grid = smooth(grid, this.height, this.width);
        
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                process.stdout.write(grid[i][j] + "\t");
            }
            console.log();
        }

        // Count up the different values
        let count = new Array(255);
        for (let i = 0; i < count.length; i++) {
            count[i] = 0;
        }
        for (let i = 1; i < this.height - 1; i++) {
            for (let j = 1; j < this.width - 1; j++) {
                count[grid[i][j]]++;
            }
        }
        
        for (let i = 0; i < count.length; i++) {
            console.log(i + " : " + count[i]);
        }
        
        
        let cave = 0;
        let desert = 0;
        let forest = 0;
        let swamp = 0;
        let taiga = 0;
        let tundra = 0;
        for (let i = 0; i < count.length; i++) {
        
            if (i < 110) {
                cave += count[i];
            } else if (i >= 110 && i < 120) {
                desert += count[i];
            } else if (i >= 120 && i < 130) {
                forest += count[i];
            } else if (i >= 130 && i < 140) {
                swamp += count[i];
            } else if (i >= 140 && i < 150) {
                taiga += count[i];
            } else if (i >= 150) {
                tundra += count[i];
            } else {
                console.log("something broke at " + i);
            }
        
        }

        console.log("cave : " + cave);
        console.log("desert : " + desert);
        console.log("forest : " + forest);
        console.log("swamp : " + swamp);
        console.log("taiga : " + taiga);
        console.log("tundra : " + tundra);
        
        
        exportedGrid = exportGrid(grid);
        
        for (let i = 0; i < this.height - 2; i++) {
            for (let j = 0; j < this.width - 2; j++) {
                console.log(exportedGrid[i][j]);
            }
        }


    }

    // Input a random seed from 1 to 4294967296, 2^32 - 1
    // Utilizing the Park-Millar random number generator
    // This function returns a random number from 0 to 1 exclusively(probably).
    random(seed) {
        // if (seed <= 0) {
        //     seed + ;
        // }
    
        let cur = seed % 4294967296; // This is the number inputted but made sure its with in the range
        if (cur <= 0) {
            cur = cur + 4294967295;
        }
    
        return () => {
            cur = cur * 48271 % 4294967296;
            return (cur - 1) / 4294967296;
        };
    }

    // Smooth the grid based off each 3x3 
    // This algorithm skips over the edges.
    smooth(grid) {
        // Copy the 2d array grid into a new smoothedgrid.
        let smoothedGrid = new Array(this.height);
    
        for (let i = 0; i < this.height; i++) {
            smoothedGrid[i] = new Array(this.width);
        }
    
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                smoothedGrid[i][j] = grid[i][j];
            }
        }
    
        for (let i = 1; i < this.height - 1; i++) {
            for (let j = 1; j < this.width - 1; j++) {
                let original = grid[i][j]; // Store the original value of the point
    
                // Get the average of the 3x3 with the center at the point.
                let total = grid[i - 1][j - 1] + grid[i - 1][j] + grid[i - 1][j + 1]
                    + grid[i][j - 1] + grid[i][j] + grid[i][j + 1]
                    + grid[i + 1][j - 1] + grid[i + 1][j] + grid[i + 1][j + 1];
    
                let average = Math.round(total / 9.0);
                let weightedAvg = Math.round((average + original + original) / 3.0);
    
                smoothedGrid[i][j] = weightedAvg;
    
            }
        }
        return smoothedGrid;
    }

    exportGrid(grid) {
        let outGrid = new Array(this.height - 2);
        for (let i = 0; i < this.height; i++) {
            outGrid[i] = new Array(this.width - 2);
        }
    
        for (let i = 1; i < this.height - 1; i++) {
            for (let j = 1; j < this.width - 1; j++) {
                let biome = getBiome(grid[i][j]);
                let map = {};
                map[biome] = [Math.floor(rng() * 1000)];
    
                outGrid[i - 1][j - 1] = map;
            }
        }
    
        return outGrid;
    
    }

    getBiome(num) {
    
        if (num < 110) {
            return 0; //"cave";
        } else if (num >= 110 && num < 120) {
            return 1; //"desert";
        } else if (num >= 120 && num < 130) {
            return 2; //"forest";
        } else if (num >= 130 && num < 140) {
            return 3; //"swamp";
        } else if (num >= 140 && num < 150) {
            return 4; //"taiga";
        } else if (num >= 150) {
            return 5; //"tundra";
        } else {
            console.log("something broke at " + i);
        }
    }
    
    // TODO
    // Make the grid more chaotic
    // This algorithm skips over the edges.
    volatile(grid) {
        // Copy the 2d array grid into a new smoothedgrid.
        let volatileGrid = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            smoothedGrid[i] = new Array(this.width);
        }
    
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                smoothedGrid[i][j] = grid[i][j];
            }
        }
    
        for (let i = 1; i < this.height - 1; i++) {
            for (let j = 1; j < this.width - 1; j++) {
                let original = grid[i][j]; // Store the original value of the point
    
                // Get the average of the 3x3 with the center at the point.
                let total = grid[i - 1][j - 1] + grid[i - 1][j] + grid[i - 1][j + 1]
                    + grid[i][j - 1] + grid[i][j] + grid[i][j + 1]
                    + grid[i + 1][j - 1] + grid[i + 1][j] + grid[i + 1][j + 1];
    
                let average = Math.round(total / 9.0);
                let weightedAvg = Math.round((average + original + original) / 3.0);
    
                smoothedGrid[i][j] = weightedAvg;
            }
        }
        return smoothedGrid;
    }

}