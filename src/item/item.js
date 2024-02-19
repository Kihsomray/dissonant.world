class Item {

    maxStack = 16;
    asset;
    itemData;
    health;
    amount;
    dropped;

    constructor(itemData, amount = 1, dropped = false, asset = ASSETS.getImage("i/*")) {
        this.asset = asset;
        this.itemData = itemData;
        this.amount = amount;
        this.dropped = dropped;
        this.health = itemData.health ? itemData.health : null;
    }

    // all passed in data should already be scaled.
    update(x, y, areaWidth, areaHeight, scale, dropped = false) {
        this.x = x;
        this.y = y;
        this.areaWidth = areaWidth;
        this.areaHeight = areaHeight;
        this.scale = scale;
        this.dropped = dropped;
    }

    draw() {
        const data = this.itemData;
        env.CTX.drawImage(
            this.asset,
            data.location[0],
            data.location[1],
            data.size[0],
            data.size[1],
            this.x + (this.areaWidth - data.size[0]) / 2,
            this.y + (this.areaHeight - data.size[1]) / 2,
            data.size[0],
            data.size[1]
        );

        // TODO add highlight code
    }

    // if the given x and y are within the area of the item.
    inArea(x, y) {
        return x >= this.x && x <= this.x + this.areaWidth && y >= this.y && y <= this.y + this.areaHeight;
    }

    // returns true if inserted.
    // false if failed.
    insert(item) {
        if (item === null) return false;
        if (this.health !== item.health) return false;
        if (this.amount + item.amount > this.maxStack) return false;
        if (this.itemData.name === item.itemData.name) return false;
        this.amount += item.amount;
        return true;
    }

    // returns new item if successful.
    // null if failed.
    remove(amount) {
        if (this.amount - amount < 0) return null;
        this.amount -= amount;

        // clone and return
        const clone = { ...this };
        clone.amount = amount;
        return clone;
    }

}