class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(that) {
        return (this.right > that.left && this.left < that.right && this.top < that.bottom && this.bottom > that.top);
    };
};
