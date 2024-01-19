const ENGINE = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const MAP_MANAGER = new MapManager();

ASSET_MANAGER.queueDownload("e/cat", "./res/cat.png");

ASSET_MANAGER.downloadAll(() => {
	
	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.scale(2, 2);

	ENGINE.addEntity(new Cat());
	ENGINE.addEntity(MAP_MANAGER.init())

	ENGINE.init(ctx);
	ENGINE.start();

});
