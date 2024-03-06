class WinScreen {

    winBuffer;
    asset = ASSETS.getImage("b/winscreen");

    constructor() {

        this.winBuffer = 250;

    }

    update() {
        if (GAME.player.win) {
            this.winBuffer--;
            GAME.player.state = 0;
        }
    }

    draw() {

        if (this.winBuffer > 0) return;
        GAME.player.state = 0;

        env.CTX.drawImage(
            this.asset,
            0,
            0,
            3200,
            2800,
            0,
            0,
            env.CENTER.x * 2.5,
            env.CENTER.y * 4.5
        );
        
    }

}