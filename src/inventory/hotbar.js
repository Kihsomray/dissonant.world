HOTBAR_TOOLS = 2;
HOTBAR_TOOLS_LOCATIONS = [[210, 10], [258, 10]];

HOTBAR_GENERAL = 4;
HOTBAR_GENERAL_LOCATIONS = [[10, 10], [58, 10], [106, 10], [154, 10]];

HOTBAR_ASSET_LOCATION = [365, 537];
HOTBAR_ASSET_SIZE = [308, 60];

class Hotbar {
    openedInventory = false;
    hotbar_tools = new Array(HOTBAR_TOOLS).fill(0);
    hotbar_general = new Array(HOTBAR_GENERAL).fill(0);
    cursorItem = 0;

    constructor() {
        this.spritesheet = ASSET_MANAGER.getImage("i/*");

        // testing values
        this.hotbar_tools[1] = 1;
        this.hotbar_tools[0] = 2;
        this.hotbar_general[0] = 3;
        this.hotbar_general[1] = 4;
        this.hotbar_general[2] = 5;
        this.hotbar_general[3] = 6;

        window.addEventListener("mousedown", (e) => {
            const m = ENGINE.mouseLocation;

            for (let i = 0; i < HOTBAR_TOOLS; i++) {
                const { x, y } = this.getHotbarSlotCoordinates(HOTBAR_TOOLS_LOCATIONS, i);
                if (m.x > x && m.x < x + INVENTORY_SLOT_SIZE[0] * INVENTORY_SCALE && m.y > y && m.y < y + INVENTORY_SLOT_SIZE[1] * INVENTORY_SCALE) {
                    this.cursorItem = swapItems(this.hotbar_tools, i, this.cursorItem);
                }
            }

            for (let i = 0; i < HOTBAR_GENERAL; i++) {
                const { x, y } = this.getHotbarSlotCoordinates(HOTBAR_GENERAL_LOCATIONS, i);
                if (m.x > x && m.x < x + INVENTORY_SLOT_SIZE[0] * INVENTORY_SCALE && m.y > y && m.y < y + INVENTORY_SLOT_SIZE[1] * INVENTORY_SCALE) {
                    this.cursorItem = swapItems(this.hotbar_general, i, this.cursorItem);
                }
            }
        });
    }

    draw(ctx) {
        this.#drawHotbar(ctx);
    }

    #drawHotbar(ctx) {
        ctx.drawImage(
            this.spritesheet,
            HOTBAR_ASSET_LOCATION[0],
            HOTBAR_ASSET_LOCATION[1],
            HOTBAR_ASSET_SIZE[0],
            HOTBAR_ASSET_SIZE[1],
            X_CENTER - HOTBAR_ASSET_SIZE[0] / 2 * INVENTORY_SCALE,
            Y_CENTER * 2 - HOTBAR_ASSET_SIZE[1] * INVENTORY_SCALE,
            HOTBAR_ASSET_SIZE[0] * INVENTORY_SCALE,
            HOTBAR_ASSET_SIZE[1] * INVENTORY_SCALE
        );

        for (let i = 0; i < HOTBAR_TOOLS; i++) {
            this.#drawHotbarSlot(this.hotbar_tools[i], HOTBAR_TOOLS_LOCATIONS[i][0], HOTBAR_TOOLS_LOCATIONS[i][1], ctx);
        }

        for (let i = 0; i < HOTBAR_GENERAL; i++) {
            this.#drawHotbarSlot(this.hotbar_general[i], HOTBAR_GENERAL_LOCATIONS[i][0], HOTBAR_GENERAL_LOCATIONS[i][1], ctx);
        }
    }

    #drawHotbarSlot(itemID, x, y, ctx) {
        const itemData = ITEMS[itemID];

        ctx.drawImage(
            this.spritesheet,
            itemData.location[0],
            itemData.location[1],
            itemData.size[0],
            itemData.size[1],
            X_CENTER - HOTBAR_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + (x + INVENTORY_SLOT_SIZE[0] / 2 - itemData.size[0] / 2) * INVENTORY_SCALE,
            Y_CENTER * 2 - HOTBAR_ASSET_SIZE[1] * INVENTORY_SCALE + (y + INVENTORY_SLOT_SIZE[1] / 2 - itemData.size[1] / 2) * INVENTORY_SCALE,
            itemData.size[0] * INVENTORY_SCALE,
            itemData.size[1] * INVENTORY_SCALE
        );
    }

    getHotbarSlotCoordinates(hotbarLocation, index) {
        const x = X_CENTER - HOTBAR_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + hotbarLocation[index][0] * INVENTORY_SCALE;
        const y = Y_CENTER * 2 - HOTBAR_ASSET_SIZE[1] * INVENTORY_SCALE + hotbarLocation[index][1] * INVENTORY_SCALE;
        return { x, y };
    }

}