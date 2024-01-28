class Timer {

    static #maxStep = 0.05;

    constructor() {
        this.gameTime = 0;
        this.lastTimestamp = 0;
        this.ticks = [];
    };

    tick() {
        /* STATEMENT BELOW DRAWS THE FPS COUNTER:
            context.fillText(`FPS ${this.gameTime.timer.ticks.length}`, 12.5, 2.5);
        */
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, Timer.#maxStep);
        this.gameTime += gameDelta;

        this.ticks.push(delta);
        
        let index = this.ticks.length - 1;
        let sum = 0;
        while (sum <= 1 && index >= 0) {
            sum += this.ticks[index--];
        }
        index++;

        this.ticks.splice(0, index);

        return gameDelta;
    };
};