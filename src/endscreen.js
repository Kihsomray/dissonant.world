class EndScreen {

    deathBuffer;
    asset = ASSETS.getImage("b/endscreen");

    constructor() {

        this.deathBuffer = 170;

    }

    update() {

        if (GAME.player.health.health <= 0) this.deathBuffer--;

    }

    draw() {

        if (GAME.player.health.health > 0) return;
        if (this.deathBuffer > 0) {
            this.deathBuffer--;
            return;
        }
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