const GAME = new GameEngine();
const ASSETS = new AssetManager();
const MAP = new MapManager();
const LOCATION = new Location();

ASSETS.queueDownload("i/*", "./res/item/items.png");
ASSETS.queueDownload("e/player-male", "./res/player-male.png");
ASSETS.queueDownload("e/player-female", "./res/player-female.png");
ASSETS.queueDownload("e/player-male-dodge", "./res/player-male-dodge.png");
ASSETS.queueDownload("e/player-female-dodge", "./res/player-female-dodge.png");
ASSETS.queueDownload("e/goblin", "./res/goblin.png");
ASSETS.queueDownload("e/orc", "./res/orc.png");
ASSETS.queueDownload("e/oni", "./res/oni.png");
ASSETS.queueDownload("e/hobgoblin", "./res/hobgoblin.png");
ASSETS.queueDownload("e/knight", "./res/knight.png");
ASSETS.queueDownload("e/daemon", "./res/daemon.png");
ASSETS.queueDownload("b/endscreen", "./res/background/end_screen.png");
ASSETS.queueDownload("b/winscreen", "./res/background/winscreen.png");
ASSETS.queueDownload("i/sword", "./res/item/sword.png");
ASSETS.queueDownload("i/hammer", "./res/item/hammer.png");
ASSETS.queueDownload("i/excalibur", "./res/item/excalibur.png");
ASSETS.queueDownload("i/staff", "./res/item/staff.png");
ASSETS.queueDownload("i/machete", "./res/item/machete.png");
ASSETS.queueDownload("i/pickaxe", "./res/item/pickaxe.png");

ASSETS.downloadAll(() => {

	GAME.addEntity(new WinScreen());
	GAME.addEntity(new EndScreen());
  
	GAME.addEntity(GAME.player = new PlayerCharacter());
	GAME.player.init();

	// GAME.addEntity(new Enemy("hobgoblin", -320, -110, 0, 15));
	// GAME.addEntity(new Enemy("goblin", -250, 400, 0, 15));
	// GAME.addEntity(new Enemy("orc", -220, -220, 0, 15));
	// GAME.addEntity(new Enemy("goblin", -250, 0, 0, 15));
	// GAME.addEntity(new Enemy("orc", 220, 220, 0, 15));
	// GAME.addEntity(new Enemy("oni", -280, 110, 0, 15));
	// GAME.addEntity(new Enemy("hobgoblin", 320, 110, 0, 15));
	// GAME.addEntity(new Enemy("knight", 150, 250, 0, 15));
	// GAME.addEntity(new Enemy("daemon", 1000, 1000, 0, 1000));

	MAP.init();

	GAME.init();
	GAME.start();

});
