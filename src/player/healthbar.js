class PlayerHealthbar {

    asset = ASSETS.getImage("i/*");

    assetLocation = {
        x: 138,
        y: 352
    };

    size = 20;


    asset;
    health = 20;

    constructor() {

    }

    draw() {

        const cornerX = GAME.player.hotbarGeneral.x + 5;
        const cornerY = GAME.player.hotbarGeneral.y - 25;

        for (let i = 0; i < Math.floor(this.health / 2); i++) {

            env.CTX.drawImage(
                this.asset,
                this.assetLocation.x,
                this.assetLocation.y,
                this.size,
                this.size / 2,
                cornerX + i * (this.size + this.size / 2 + 10),
                cornerY,
                this.size,
                this.size / 2
            );
        }
        for (let i = 0; i < Math.ceil(this.health / 2); i++) {
            env.CTX.drawImage(
                this.asset,
                this.assetLocation.x,
                this.assetLocation.y,
                this.size,
                this.size,
                0,
                0,
                this.size * this.health,
                this.size
            );
        }

    }


}