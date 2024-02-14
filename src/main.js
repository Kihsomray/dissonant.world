const ENGINE = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const MAP_MANAGER = new MapManager();

const LOCATION = new Location();

ASSET_MANAGER.queueDownload("e/player", "./res/player.png");
ASSET_MANAGER.queueDownload("i/*", "./res/item/items.png");
ASSET_MANAGER.queueDownload("e/player-male", "./res/player-male.png");
ASSET_MANAGER.queueDownload("e/player-female", "./res/player-female.png");
ASSET_MANAGER.queueDownload("e/goblin", "./res/goblin.png");
ASSET_MANAGER.queueDownload("e/orc", "./res/orc.png");
ASSET_MANAGER.queueDownload("e/oni", "./res/oni.png");
ASSET_MANAGER.queueDownload("e/hobgoblin", "./res/hobgoblin.png");
ASSET_MANAGER.queueDownload("e/knight", "./res/knight.png");

ASSET_MANAGER.downloadAll(() => {
	
	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");
	//ctx.scale(2, 2);

	ENGINE.addEntity(new PlayerCharacter());

	ENGINE.addEntity(new Enemy("goblin", 220, 0));
	ENGINE.addEntity(new Enemy("orc", 220, 220));
	ENGINE.addEntity(new Enemy("oni", 120, 110));
	ENGINE.addEntity(new Enemy("hobgoblin", 320, 110));
	ENGINE.addEntity(new followEnemy("knight", 0, 0));

	ENGINE.addEntity(LOCATION);
	MAP_MANAGER.init();


	ENGINE.init(ctx);
	ENGINE.start();

});
