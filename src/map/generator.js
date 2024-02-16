class MapGenerator {

    seed;
    height;
    width;
    rng;

    constructor(seed, height, width) {

        this.seed = seed;
        this.height = height + 2;
        this.width = width + 2;
        this.rng = this.random(this.seed);

    }

    generate() {
        
        for (let i = 0; i < Math.round(this.rng() * 1000); i++) {
            this.rng();
        }
        
        let grid = new Array(this.height);
        
        for (let i = 0; i < this.height; i++) {
            grid[i] = new Array(this.width);
        }
        
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                grid[i][j] = Math.floor(this.rng() * 256);
            }
        }
        
        //Try smoothing the array
        grid = this.smooth(grid, this.height, this.width);
        grid = this.smooth(grid, this.height, this.width);
        grid = this.smooth(grid, this.height, this.width);
        grid = this.smooth(grid, this.height, this.width);
        grid = this.smooth(grid, this.height, this.width);
        
        // for (let i = 0; i < this.height; i++) {
        //     for (let j = 0; j < this.width; j++) {
        //         console.log(grid[i][j], "");
        //     }
        //     console.log();
        // }

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
        
        // for (let i = 0; i < count.length; i++) {
        //     console.log(i + " : " + count[i]);
        // }
        
        
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
        
        
        const exportedGrid = this.exportGrid(grid);
        
        // for (let i = 0; i < this.height - 2; i++) {
        //     for (let j = 0; j < this.width - 2; j++) {
        //         console.log(exportedGrid[i][j]);
        //     }
        // }

        return exportedGrid;

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
                let biome = this.getBiome(grid[i][j]);
                let map = {};
                map[biome] = [Math.floor(this.rng() * 1000)]; // Having this wrapped in brackets is really ugly but idk how to fix it
                //console.log(map[biome]);
                //map = this.getEnemies(map);
                //console.log(map[biome]);
                outGrid[i - 1][j - 1] = map;
                
            }
        }
    
        return outGrid;
    }

    getEnemies(map) {
        let newMap = {};
        let biome = Object.keys(map)[0];

        let randomNum = Object.values(map[biome]);
        let randGen = this.random(randomNum);

        let numOfEnemies = Math.floor(10 * randGen()); // Generate a random number for the number of enemies in a chunk from 0 to 9

        let taken = new Set(); // Create a set of coords that are already taken

        
        newMap[biome] = Object.values(map);
        let next = newMap[biome];
        //next.push(21);
        
        for (let i = 0; i < numOfEnemies; i++) { // Each chunk is 32 by 32 so set all of the enemies into random tiles on the chunk x = (0-31), y = (0,31)
            let x; let y; let hash;
            
            do { // Generate a random coordinate but also make sure it doesn't exist yet 
                x = Math.floor(32 * randGen());
                y = Math.floor(32 * randGen());
                hash = x + y * 100;
            } while (taken.has(hash)) 
            taken.add(hash);

            next.push({"enemy" : [x, y]});
            //newMap[biome].push({"enemy" : [x, y]});
        }
        newMap[biome] = next;
        return newMap;  
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

}
