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

ASSETS.downloadAll(() => {

	GAME.addEntity(new Enemy("goblin", 220, 0));
	GAME.addEntity(new Enemy("orc", 220, 220));
	GAME.addEntity(new Enemy("oni", 120, 110));
	GAME.addEntity(new Enemy("hobgoblin", 320, 110));
	GAME.addEntity(new FollowEnemy("knight", 0, 0));

	GAME.addEntity(GAME.player = new PlayerCharacter());

	MAP.init();

	GAME.init();
	GAME.start();

	unblurCanvas();

});
