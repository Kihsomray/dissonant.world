class PlayerHealthbar {

    asset = ASSETS.getImage("i/*")

    assetLocation = {
        x: 138,
        y: 352
    };

    size = 20;
    health = 20;

    constructor() {

    }

    draw() {

        const cornerX = GAME.player.hotbarGeneral.x + 3 * env.UI.SCALE;
        const cornerY = GAME.player.hotbarGeneral.y - 22 * env.UI.SCALE;

        for (let i = 0; i < Math.ceil(this.health / 2); i++) {

            env.CTX.drawImage(
                this.asset,
                this.assetLocation.x,
                this.assetLocation.y,
                this.size / 2,
                this.size,
                cornerX + i * (this.size * env.UI.SCALE / 2 + 10 * env.UI.SCALE),
                cornerY,
                this.size * env.UI.SCALE / 2,
                this.size * env.UI.SCALE,
            );
        }
        for (let i = 0; i < Math.floor(this.health / 2); i++) {
            env.CTX.drawImage(
                this.asset,
                this.assetLocation.x + this.size / 2,
                this.assetLocation.y,
                this.size / 2,
                this.size,
                cornerX + i * (this.size * env.UI.SCALE / 2 + 10 * env.UI.SCALE) + this.size * env.UI.SCALE / 2,
                cornerY,
                this.size * env.UI.SCALE / 2,
                this.size * env.UI.SCALE,
            );
        }

    }


}