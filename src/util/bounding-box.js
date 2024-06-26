class BoundingBox {

    constructor(x, y, width, height) {
        Object.assign(this, {x, y, width, height});

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        return this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top;
    };

    draw(theX = 8, theY = 7) {
        theX = theX || this.x + 8;
        theY = theY || this.y + 7;

        // Draw the bb
        env.CTX.strokeStyle = "red";
        env.CTX.strokeRect(theX, theY, 20, 28);
    }

}
