class Location {

    speed = 2;
    corner_speed = Math.sqrt(this.speed * this.speed / 2);

    multiplier = 1.5;

    constructor() {
        this.x = 0;
        this.y = 0;
    }


    update() {
        const boost = ENGINE.keyClick["shift"] ? this.multiplier : 1;

        if (ENGINE.keyClick["w"] && ENGINE.keyClick["d"]) {
            this.y -= this.corner_speed * boost;
            this.x += this.corner_speed * boost;
        }
        else if (ENGINE.keyClick["w"] && ENGINE.keyClick["a"]) {
            this.y -= this.corner_speed * boost;
            this.x -= this.corner_speed * boost;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["d"]) {
            this.y += this.corner_speed * boost;
            this.x += this.corner_speed * boost;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["a"]) {
            this.y += this.corner_speed * boost;
            this.x -= this.corner_speed * boost;
        }

        else if (ENGINE.keyClick["w"]) this.y -= this.speed * boost;
        else if (ENGINE.keyClick["d"]) this.x += this.speed * boost;
        else if (ENGINE.keyClick["s"]) this.y += this.speed * boost;
        else if (ENGINE.keyClick["a"]) this.x -= this.speed * boost;
    }

    draw(ctx) {

    }


}