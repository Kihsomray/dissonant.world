const engine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const biome = [
	"cave",
	"desert",
	"forest",
	"swamp",
	"taiga",
	"tundra"
];

const type = [
	"bridgeAnimatedTiles",
	"bridgeHorizontal",
	"bridgeVertical",
	"fencesAndWalls",
	"fountain",
	"resources"
];

const extra = [
	["cave", "railway"],
	["desert", "path"],
	["desert", "quickSand"],
	["swamp", "puddle"],
	["taiga", "path"],
	["tundra", "ice"],
	["tundra", "igloo"],
	["tundra", "path"]
];


ASSET_MANAGER.queueDownload("e/cat", "./res/cat.png");

for (let i = 0; i < biome.length; i++) {
	for (let j = 0; j < type.length; j++) {
		ASSET_MANAGER.queueDownload(`t/${biome[i]}/${type[j]}`, `./res/tile/${biome[i]}_/${biome[i]}_ [${type[j]}].png`);
	}
	ASSET_MANAGER.queueDownload(`t/${biome[i]}}`, `./res/tile/${biome[i]}_/${biome[i]}_.png`);
}

for (let i = 0; i < extra.length; i++) {
	ASSET_MANAGER.queueDownload(`t/${extra[i][0]}/${extra[i][1]}`, `./res/tile/${extra[i][0]}_/${extra[i][1]}_.png`)
}

ASSET_MANAGER.downloadAll(() => {
	
	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

	engine.addEntity(new Cat(engine));
	engine.init(ctx);
	engine.start();

});
