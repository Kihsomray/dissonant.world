class EndScreen {

    asset = ASSETS.getImage("b/endscreen");

    constructor() {

    }

    update() {

    }

    draw() {
        if (GAME.player.health.health != 0) return;
        console.log("end screen")
        env.CTX.drawImage(
            this.asset,
            0,
            0,
            1200,
            1200,
            0,
            0,
            env.CENTER.x * 2,
            env.CENTER.y * 2
        );
    }

}