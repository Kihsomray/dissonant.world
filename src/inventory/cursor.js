class PlayerCursor {
    cursorItem = { id: 0, amount: 0 };
    hoveringInventory = [0, 0];

    constructor() {

        window.addEventListener("mousemove", (e) => {
            const m = ENGINE.mouseLocation;
            if (!this.openedInventory) return;
            for (let i = 0; i < INVENTORY_ROWS; i++) {
                for (let j = 0; j < INVENTORY_COLUMNS; j++) {
                    const x = X_CENTER - INVENTORY_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + (10 + j * (INVENTORY_SLOT_SIZE[0] + 8)) * INVENTORY_SCALE;
                    const y = Y_CENTER - (INVENTORY_ASSET_SIZE[1] + HOTBAR_ASSET_SIZE[1]) / 2 * INVENTORY_SCALE + (34 + i * (INVENTORY_SLOT_SIZE[1] + 6)) * INVENTORY_SCALE;
                    if (m.x > x && m.x < x + INVENTORY_SLOT_SIZE[0] * INVENTORY_SCALE && m.y > y && m.y < y + INVENTORY_SLOT_SIZE[1] * INVENTORY_SCALE) {
                        this.hoveringInventory = [i, j];
                    }
                }
            }
        });

    }

    swapItems(hotbar, index) {
        console.log(`clicked on slot ${index}`);
        if (hotbar[index] == 0 && this.cursorItem == 0) return this.cursorItem;

        const temp = hotbar[index];
        hotbar[index] = this.cursorItem;
        this.cursorItem = temp;
    }

}