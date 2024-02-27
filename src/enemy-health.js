class EnemyHealth {
    asset = ASSETS.getImage("i/*");
    location = [407, 441];
    size = [36, 6];
    scale = 0.5;

    constructor(enemy) {
        this.enemy = enemy;
    }

    update() {
        this.x = this.enemy.x;
        this.y = this.enemy.y;
    }

    draw() {
        const { x, y } = LOCATION.getTrueLocation(this.x, this.y);
        const scaledSize = [this.size[0] * this.scale, this.size[1] * this.scale];
        const scaledHealth = this.size[0] * (this.enemy.health / this.enemy.totalHealth) * this.scale;

        env.CTX.drawImage(
            this.asset,
            this.location[0] + (this.size[0] * (1 - this.enemy.health / this.enemy.totalHealth)),
            this.location[1],
            scaledHealth,
            scaledSize[1],
            x + 8,
            y,
            scaledHealth,
            scaledSize[1]
        );
    }
}