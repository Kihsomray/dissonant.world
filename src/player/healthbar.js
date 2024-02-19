class PlayerHealthbar {

    asset = ASSETS.getImage("i/*")

    assetLocation = {
        x: 138,
        y: 352
    };

    size = 20;
    health = 12;

    constructor() {

    }

    draw() {

        const cornerX = GAME.player.hotbarGeneral.x + 5;
        const cornerY = GAME.player.hotbarGeneral.y - 15;

        for (let i = 0; i < Math.ceil(this.health / 2); i++) {

            env.CTX.drawImage(
                this.asset,
                this.assetLocation.x,
                this.assetLocation.y,
                this.size / 2,
                this.size,
                cornerX + i * (this.size / 3 + 7),
                cornerY,
                this.size / 3,
                this.size / 1.5,
            );
        }
        for (let i = 0; i < Math.floor(this.health / 2); i++) {
            env.CTX.drawImage(
                this.asset,
                this.assetLocation.x + this.size / 2,
                this.assetLocation.y,
                this.size / 2,
                this.size,
                cornerX + i * (this.size / 3 + 7) + this.size / 3,
                cornerY,
                this.size / 3,
                this.size / 1.5,
            );
        }

    }


}