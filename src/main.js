const GAME = new GameEngine();
const ASSETS = new AssetManager();
const MAP = new MapManager();
const LOCATION = new Location();

ASSETS.queueDownload("i/*", "./res/item/items.png");
ASSETS.queueDownload("e/player-male", "./res/player-male.png");
ASSETS.queueDownload("e/player-female", "./res/player-female.png");
ASSETS.queueDownload("e/sword", "./res/sword.png");
ASSETS.queueDownload("e/goblin", "./res/goblin.png");
ASSETS.queueDownload("e/orc", "./res/orc.png");
ASSETS.queueDownload("e/oni", "./res/oni.png");
ASSETS.queueDownload("e/hobgoblin", "./res/hobgoblin.png");
ASSETS.queueDownload("e/knight", "./res/knight.png");
ASSETS.queueDownload("e/daemon", "./res/daemon.png");
ASSETS.queueDownload("b/endscreen", "./res/background/end_screen.png");

ASSETS.downloadAll(() => {

	GAME.addEntity(new EndScreen());
  
	GAME.addEntity(GAME.player = new PlayerCharacter());

	GAME.addEntity(new Enemy("goblin", -220, 0, 0, 15));
	GAME.addEntity(new Enemy("orc", 220, 220, 0, 15));
	GAME.addEntity(new Enemy("oni", -120, 110, 0, 15));
	GAME.addEntity(new Enemy("hobgoblin", 320, 110, 0, 15));
	GAME.addEntity(new Enemy("knight", 50, 250));

	MAP.init();

	GAME.init();
	GAME.start();

});
