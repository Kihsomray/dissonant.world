const GAME = new GameEngine();
const ASSETS = new AssetManager();
const MAP = new MapManager();
const LOCATION = new Location();

ASSETS.queueDownload("i/*", "./res/item/items.png");
ASSETS.queueDownload("e/player-male", "./res/player-male.png");
ASSETS.queueDownload("e/player-female", "./res/player-female.png");
ASSETS.queueDownload("e/goblin", "./res/goblin.png");
ASSETS.queueDownload("e/orc", "./res/orc.png");
ASSETS.queueDownload("e/oni", "./res/oni.png");
ASSETS.queueDownload("e/hobgoblin", "./res/hobgoblin.png");
ASSETS.queueDownload("e/knight", "./res/knight.png");
ASSETS.queueDownload("e/daemon", "./res/daemon.png");

ASSETS.downloadAll(() => {

	// GAME.addEntity(new Enemy("goblin", 220, 0, 4, 15));
	GAME.addEntity(new Enemy("daemon", 100, 100, 4, 15));
	// GAME.addEntity(new Enemy("orc", 220, 220, 4, 15));
	// GAME.addEntity(new Enemy("oni", 120, 110, 4, 15));
	// GAME.addEntity(new Enemy("hobgoblin", 320, 110, 4, 15));
	// GAME.addEntity(new Enemy("knight", 0, 0));

	GAME.addEntity(GAME.player = new PlayerCharacter());

	MAP.init();

	GAME.init();
	GAME.start();

});
