class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };

    drawFrame(tick, ctx, x, y, scaleBy) {

        this.elapsedTime += tick;

        if (this.isDone() && !this.loop) return;
        if (this.elapsedTime > this.totalTime) this.elapsedTime = this.elapsedTime % this.totalTime;

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(
            this.spritesheet,
            this.xStart + this.width * frame,
            this.yStart, this.width,
            this.height,
            x,
            y,
            this.width * scaleBy,
            this.height * scaleBy
        );
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return this.elapsedTime >= this.totalTime;
    };

}