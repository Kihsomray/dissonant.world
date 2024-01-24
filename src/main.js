const ENGINE = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const MAP_MANAGER = new MapManager();

const LOCATION = new Location();

ASSET_MANAGER.queueDownload("e/player", "./res/player.png");

ASSET_MANAGER.downloadAll(() => {
	
	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");
	//ctx.scale(2, 2);
	
	ENGINE.addEntity(new PlayerCharacter());
	ENGINE.addEntity(LOCATION);
	MAP_MANAGER.init();


	ENGINE.init(ctx);
	ENGINE.start();

});
