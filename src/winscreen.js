class WinScreen {

    winBuffer;
    asset = ASSETS.getImage("b/winscreen");

    constructor() {

        this.winBuffer = 240;

    }

    update() {

        if (GAME.player.win) {
            this.winBuffer--;
        }
        
    }

    draw() {

        if (this.winBuffer > 0) return;

        console.log("WON")
        env.CTX.drawImage(
            this.asset,
            0,
            0,
            1200,
            1200,
            0,
            0,
            env.CENTER.x * 2.5,
            env.CENTER.y * 4.5
        );
        
    }

}