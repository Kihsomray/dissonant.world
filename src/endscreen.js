class EndScreen {

    deathBuffer;
    asset = ASSETS.getImage("b/endscreen");

    constructor() {

        this.deathBuffer = 250;

    }

    update() {

        if (GAME.player.health.health <= 0) this.deathBuffer--;

    }

    draw() {

        if (GAME.player.health.health > 0 || GAME.player.win) return;
        if (this.deathBuffer > 0) {
            this.deathBuffer--;
            return;
        }
        env.CTX.drawImage(
            this.asset,
            0,
            0,
            2500,
            1250,
            0,
            0,
            env.CENTER.x * 2,
            env.CENTER.y * 2
        );
        
    }

}