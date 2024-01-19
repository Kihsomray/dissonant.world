class Cat {
    constructor(game) {

        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getImage("e/cat"), 0, 0, 551, 244, 11, 0.12, true, true);

        this.x = 0;
        this.y = 374;
        this.speed = 180;
        this.counter = 0;
        this.pause = false;

    }

    update() {
        console.log("yes")
        if (this.counter++ % 10 == 0) this.pause = !this.pause;
        const location = this.game.clockTick * (this.speed + (this.pause ? 50 : -50));
        this.x += location;
        if (this.x > 1024) this.x = -200;
    }

    draw(context) {
        this.animator.drawFrame(this.game.clockTick, context, this.x, this.y, 0.2);
        //context.drawImage(ASSET_MANAGER.getAsset("./cat.png"), 0, 0);
    }

}