class BreakBlock {

    breaking;
    spritesheet;
    animation;
    counter;
    frame;

    constructor() {
        this.breaking = false;
        this.spritesheet = ASSETS.getImage("t/block/break");
        this.counter = 0;
        this.frame = 0;
    }

    update(ctx, speed) {
        if (!this.breaking && GAME.mouseClick[0]) {
            this.animation = this.newAnimation(speed);
            this.counter = 0;
            this.frame = 0;
        }

        this.breaking = GAME.mouseClick[0];

        if (this.breaking) {
            this.counter += GAME.clockTick;
            this.animation.drawFrame(GAME.clockTick, ctx, env.CENTER.x, env.CENTER.y, env.SCALE);
            return this.animation.isDone();
        }
        return false;
    }

    newAnimation(speed) {
        // console.log(this.spritesheet, 0, 0, 16, 16, 10, speed / 10, 1, false, false)
        return new Animator(this.spritesheet, 0, 0, 16, 16, 10, speed / 10, 1, false, false);
    }

}