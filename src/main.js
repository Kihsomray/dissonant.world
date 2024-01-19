const engine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("e/cat", "./res/cat.png");

ASSET_MANAGER.downloadAll(() => {
	
	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

	engine.addEntity(new Cat(engine));
	engine.init(ctx);
	engine.start();

});
