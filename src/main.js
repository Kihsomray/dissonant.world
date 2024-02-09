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

	ENGINE.addEntity(new Enemy(220, 0));
	ENGINE.addEntity(new Enemy(220, 220));
	ENGINE.addEntity(new Enemy(120, 110));
	ENGINE.addEntity(new Enemy(360, 110));

	ENGINE.addEntity(new followEnemy(0, 0));

	ENGINE.addEntity(LOCATION);
	MAP_MANAGER.init();


	ENGINE.init(ctx);
	ENGINE.start();

});
