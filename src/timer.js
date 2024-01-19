class Timer {

    static #maxStep = 0.05;

    constructor() {
        this.gameTime = 0;
        this.lastTimestamp = 0;
    };

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, Timer.#maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};