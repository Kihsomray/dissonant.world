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
    togglable = false;
    
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
        //console.log("x: " + slotGapX)
        this.inventory = new Array(slotsX);
        for (let i = 0; i < slotsX; i++) {
            this.inventory[i] = new Array(slotsY).fill(null);
            for (let j = 0; j < slotsY; j++) {
                this.inventory[i][j] = new Item(env.ITEMS[0]);
            }
        }
        this.clickedSlot = null;
    }

    init() {
        this.update();
        this.draw();
    }

    update() {
        const { x, y } = this.locationFunction(this.assetWidth * env.UI.SCALE, this.assetHeight * env.UI.SCALE);
        this.x = x;
        this.y = y;

        if (this.togglable) {
            if (GAME.keyClick['e']) {
                this.visible = !this.visible;
                ASSETS.playAudio("a/inventory-click");
                
            } else if (GAME.keyClick['escape']) {
                this.visible = false;

            }
        }

        // reset the clicked slot
        this.clickedSlot = null;

        const inArea = this.visible && GAME.mouseClick[0] && this.inArea(GAME.mouseLocation.x, GAME.mouseLocation.y);

        for (let i = 0; i < this.slotsX; i++) {
            for (let j = 0; j < this.slotsY; j++) {
                if (inArea && this.inItemArea(GAME.mouseLocation.x, GAME.mouseLocation.y, i, j)) {
                    this.clickedSlot = { i, j };
                }
                if (this.inventory[i][j] !== null) {
                    this.inventory[i][j].update(
                        this.x + (this.slotInitialGapX + (this.slotWidth + this.slotGapX) * i) * env.UI.SCALE,
                        this.y + (this.slotInitialGapY + (this.slotHeight + this.slotGapY) * j) * env.UI.SCALE,
                        this.slotWidth * env.UI.SCALE,
                        this.slotHeight * env.UI.SCALE,
                        env.UI.SCALE
                    );
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
            this.assetWidth * env.UI.SCALE,
            this.assetHeight * env.UI.SCALE
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

                    item.draw();
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

    inArea(oX, oY) {
        const { x, y } = this.locationFunction(this.assetWidth * env.UI.SCALE, this.assetHeight * env.UI.SCALE);
        return (
            oX >= x &&
            oX <= x + this.assetWidth * env.UI.SCALE &&
            oY >= y &&
            oY <= y + this.assetHeight * env.UI.SCALE
        );
    }

    inItemArea(oX, oY, itemX, itemY) {

        const { x, y } = this.locationFunction(this.assetWidth * env.UI.SCALE, this.assetHeight * env.UI.SCALE);
        return (
            oX >= x + (this.slotInitialGapX + (this.slotWidth + this.slotGapX) * itemX) * env.UI.SCALE &&
            oX <= x + (this.slotInitialGapX + (this.slotWidth + this.slotGapX) * itemX + this.slotWidth) * env.UI.SCALE &&
            oY >= y + (this.slotInitialGapY + (this.slotHeight + this.slotGapY) * itemY) * env.UI.SCALE &&
            oY <= y + (this.slotInitialGapY + (this.slotHeight + this.slotGapY) * itemY + this.slotHeight) * env.UI.SCALE
        );

    }

    swap(otherInventory, tI, tJ, oI, oJ) {

        console.log("swapping " + tI + ", " + tJ + " with " + oI + ", " + oJ)
        console.log(" ---> " + JSON.stringify(this.inventory[tI][tJ].itemData.type) + " <--- " + JSON.stringify(otherInventory.inventory[oI][oJ].itemData.type))
        if (!this.filterFunction(otherInventory.inventory[oI][oJ]) || !otherInventory.filterFunction(this.inventory[tI][tJ])) return;
        if (!this.visible || !otherInventory.visible) return;
        console.log("swapping " + tI + ", " + tJ + " with " + oI + ", " + oJ)
        const temp = this.inventory[tI][tJ];
        this.inventory[tI][tJ] = otherInventory.inventory[oI][oJ];
        otherInventory.inventory[oI][oJ] = temp;
    }


}