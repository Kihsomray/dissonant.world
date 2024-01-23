class Location {

    speed = 4.25;
    corner_speed = Math.sqrt(this.speed * this.speed / 2);

    multiplier = 1.4;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update() {
        const boost = ENGINE.keyClick["shift"] ? this.multiplier : 1;

        const corner = Math.round(this.corner_speed * boost * 2) / 2;
        const straight = Math.round(this.speed * boost * 2) / 2;

        if (ENGINE.keyClick["w"] && ENGINE.keyClick["d"]) {
            this.y -= corner;
            this.x += corner;
        }
        else if (ENGINE.keyClick["w"] && ENGINE.keyClick["a"]) {
            this.y -= corner;
            this.x -= corner;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["d"]) {
            this.y += corner;
            this.x += corner;
        }
        else if (ENGINE.keyClick["s"] && ENGINE.keyClick["a"]) {
            this.y += corner;
            this.x -= corner;
        }

        else if (ENGINE.keyClick["w"]) this.y -= straight;
        else if (ENGINE.keyClick["d"]) this.x += straight;
        else if (ENGINE.keyClick["s"]) this.y += straight;
        else if (ENGINE.keyClick["a"]) this.x -= straight;
    }

    draw(_) {

    }


}