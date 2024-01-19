class Location {

    constructor() {
        this.x = 0;
        this.y = 0;
    }


    update() {
        if (ENGINE.keyClick["w"]) this.y -= 2;
        if (ENGINE.keyClick["d"]) this.x += 2;
        if (ENGINE.keyClick["s"]) this.y += 2;
        if (ENGINE.keyClick["a"]) this.x -= 2;
    }

    draw(ctx) {

    }


}