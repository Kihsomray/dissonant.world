class Inventory {
    
    asset;
    assetX;
    assetY;
    assetWidth;
    assetHeight;
    slotsX;
    slotsY;
    slotInitialGapX;
    slotInitialGapY;
    slotWidth;
    slotHeight;
    slotGapX;
    slotGapY;
    locationFunction;
    scale;
    visible;
    
    inventory;
    clickedSlot;

    constructor(
        asset,
        assetX,
        assetY,
        assetWidth,
        assetHeight,
        slotsX,
        slotsY,
        slotInitialGapX,
        slotInitialGapY,
        slotWidth,
        slotHeight,
        slotGapX,
        slotGapY,
        locationFunction,
        filterFunction,
        scale,
        visible
    ) {
        this.x = 0;
        this.y = 0;
        Object.assign(this, {asset, assetX, assetY, assetWidth, assetHeight, slotInitialGapX, slotInitialGapY, slotsX, slotsY, slotWidth, slotHeight, slotGapX, slotGapY, locationFunction, filterFunction, scale, visible});
        console.log("x: " + slotGapX)
        this.inventory = new Array(slotsX);
        for (let i = 0; i < slotsX; i++) {
            this.inventory[i] = new Array(slotsY).fill(null);
        }
        this.clickedSlot = null;
    }

    init() {
        this.update();
        this.draw();
    }

    update() {
        const {x, y} = this.locationFunction(this.assetX, this.assetY);
        //console.log("x: " + x + " y: " + y)
        this.x = x;
        this.y = y;

        if (GAME.keyClick['e']) {
            this.visible = !this.visible;

        } else if (GAME.keyClick['Escape']) {
            this.visible = false;

        }

        // reset the clicked slot
        this.clickedSlot = null;

        if (this.visible  && this.inArea(GAME.mouseLocation.x, GAME.mouseLocation.y)) { 
            console.log("in area")
            // loop through all the slots
            for (let i = 0; i < this.slotsX; i++) {
                for (let j = 0; j < this.slotsY; j++) {
                    if (this.inventory[i][j].inArea(GAME.mouseLocation.x, GAME.mouseLocation.y)) {
                        this.clickedSlot = { i, j };
                    }
                }
            }
        }

    }

    draw() {

        if (!this.visible) return;

        env.CTX.drawImage(
            this.asset,
            this.assetX,
            this.assetY,
            this.assetWidth,
            this.assetHeight,
            this.x,
            this.y,
            this.assetWidth,
            this.assetHeight
        );

        let x = 0;
        let y = this.y + this.slotInitialGapY;


        for (let i = 0; i < this.slotsX; i++) {

            // reset to the start of the row
            x = this.x + this.slotInitialGapX;

            // draw the row
            for (let j = 0; j < this.slotsY; j++) {
                if (this.inventory[i][j] !== null) {

                    const item = this.inventory[i][j];

                    item.draw(x, y, this.slotWidth, this.slotHeight, this.scale);
                }

                x += this.slotWidth + this.slotGapX;
                y += this.slotHeight + this.slotGapY;
            }

            // move to the next row
            x += this.slotWidth + this.slotGapX;
            y += this.slotHeight + this.slotGapY;
        }

    }

    addItem(item) {
        if (item === null) return;

        // assure it is allowed.
        if (!this.filterFunction(item)) return;

        let found = null;
        for (let i = 0; i < this.slotsX; i++) {
            for (let j = 0; j < this.slotsY; j++) {
                if (this.inventory[i][j] === null) {
                    if (found === null) {
                        found = {i, j};

                    }

                } else {
                    if (this.inventory[i][j].insert(item)) return;

                }
            }
        }
        if (found !== null) {
            this.inventory[found.i][found.j] = item;
        }
    }

    inArea(x, y) {
        return x >= this.x && x <= this.x + this.assetWidth * this.scale && y >= this.y && y <= this.y + this.assetHeight * this.scale;
    }

    swap(otherInventory, tI, tJ, oI, oJ) {
        if (filterFunction(this.inventory[tI][tJ]) || otherInventory.filterFunction(otherInventory.inventory[oI][oJ])) return;
        const temp = this.inventory[tI][tJ];
        this.inventory[tI][tJ] = otherInventory.inventory[oI][oJ];
        otherInventory.inventory[oI][oJ] = temp;
    }


}