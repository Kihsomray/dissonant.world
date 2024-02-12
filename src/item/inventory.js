INVENTORY_TOOLS = 2;
INVENTORY_TOOLS_LOCATIONS = [[210, 10], [258, 10]];

INVENTORY_GENERAL = 4;
INVENTORY_GENERAL_LOCATIONS = [[10, 10], [58, 10], [106, 10], [154, 10]];

INVENTORY_ROWS = 3;
INVENTORY_COLUMNS = 4;

INVENTORY_SLOT_SIZE = [40, 40];

INVENTORY_ASSET_LOCATION = [547, 153];
INVENTORY_ASSET_SIZE = [204, 176];

HOTBAR_ASSET_LOCATION = [365, 537];
HOTBAR_ASSET_SIZE = [308, 60];

INVENTORY_SCALE = SCALE / 4;

class PlayerInventory {

    openedInventory = false;

    hotbar_tools = new Array(INVENTORY_TOOLS).fill(0);
    hotbar_general = new Array(INVENTORY_GENERAL).fill(0);

    inventory = new Array(INVENTORY_ROWS); // number of rows

    cursorItem = 0;

    constructor() {

        this.spritesheet = ASSET_MANAGER.getImage("i/*");

        // fill each row with an array of columns
        for (let i = 0; i < INVENTORY_ROWS; i++) {
            this.inventory[i] = new Array(INVENTORY_COLUMNS).fill(0);
        }
    
        window.addEventListener("keydown", event => {
            const key = event.key.toLowerCase();
            if (key === "e") {
                this.openedInventory = !this.openedInventory;
            } else if (key === "escape") {
                this.openedInventory = false;
            }
        });

        // testing values
        this.hotbar_tools[1] = 1;
        this.hotbar_tools[0] = 2;
        this.hotbar_general[0] = 3;
        this.hotbar_general[1] = 4;
        this.hotbar_general[2] = 5;
        this.hotbar_general[3] = 6;
        this.inventory[0][0] = 7;
        this.inventory[0][1] = 8;
        this.inventory[0][2] = 9;
        this.inventory[0][3] = 10;
        this.inventory[1][0] = 11;
        this.inventory[1][1] = 12;
        this.inventory[1][2] = 13;
        this.inventory[1][3] = 14;
        this.inventory[2][0] = 15;
        this.inventory[2][1] = 16;

        window.addEventListener("mousedown", (e) => {

            const m = ENGINE.mouseLocation;

            for (let i = 0; i < INVENTORY_TOOLS; i++) {
                const x = X_CENTER - HOTBAR_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + INVENTORY_TOOLS_LOCATIONS[i][0] * INVENTORY_SCALE;
                const y = Y_CENTER * 2 - HOTBAR_ASSET_SIZE[1] * INVENTORY_SCALE + INVENTORY_TOOLS_LOCATIONS[i][1] * INVENTORY_SCALE;
                if (m.x > x && m.x < x + INVENTORY_SLOT_SIZE[0] * INVENTORY_SCALE && m.y > y && m.y < y + INVENTORY_SLOT_SIZE[1] * INVENTORY_SCALE) {
                    
                    console.log("clicked on tool slot " + i);
                    if (this.hotbar_tools[i] == 0 && this.cursorItem == 0) return;

                    const temp1 = this.hotbar_tools[i];
                    this.hotbar_tools[i] = this.cursorItem;
                    this.cursorItem = temp1;

                }
            }

            for (let i = 0; i < INVENTORY_GENERAL; i++) {
                const x = X_CENTER - HOTBAR_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + INVENTORY_GENERAL_LOCATIONS[i][0] * INVENTORY_SCALE;
                const y = Y_CENTER * 2 - HOTBAR_ASSET_SIZE[1] * INVENTORY_SCALE + INVENTORY_GENERAL_LOCATIONS[i][1] * INVENTORY_SCALE;
                if (m.x > x && m.x < x + INVENTORY_SLOT_SIZE[0] * INVENTORY_SCALE && m.y > y && m.y < y + INVENTORY_SLOT_SIZE[1] * INVENTORY_SCALE) {
                    console.log("clicked on general slot " + i);
                    if (this.hotbar_general[i] == 0 && this.cursorItem == 0) return;

                    const temp1 = this.hotbar_general[i];
                    this.hotbar_general[i] = this.cursorItem;
                    this.cursorItem = temp1;

                }
            }

            if (!this.openedInventory) return;

            for (let i = 0; i < INVENTORY_ROWS; i++) {
                for (let j = 0; j < INVENTORY_COLUMNS; j++) {
                    const x = X_CENTER - INVENTORY_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + (10 + j * (INVENTORY_SLOT_SIZE[0] + 8)) * INVENTORY_SCALE;
                    const y = Y_CENTER - (INVENTORY_ASSET_SIZE[1] + HOTBAR_ASSET_SIZE[1]) / 2 * INVENTORY_SCALE + (34 + i * (INVENTORY_SLOT_SIZE[1] + 6)) * INVENTORY_SCALE;
                    if (m.x > x && m.x < x + INVENTORY_SLOT_SIZE[0] * INVENTORY_SCALE && m.y > y && m.y < y + INVENTORY_SLOT_SIZE[1] * INVENTORY_SCALE) {
                        console.log("clicked on inventory slot " + i + " " + j);
                        if (this.inventory[i][j] == 0 && this.cursorItem == 0) return;

                        const temp1 = this.inventory[i][j];
                        this.inventory[i][j] = this.cursorItem;
                        this.cursorItem = temp1;

                    }
                }
            }

        });







    }

    draw(ctx) {
        this.#drawHotbar(ctx);
        if (this.openedInventory) {
            this.#drawInventory(ctx);
        }
        this.#drawCursor(ctx);

    }

    #drawCursor(ctx) {
        const m = ENGINE.mouseLocation;
        const itemData = ITEMS[this.cursorItem];
        ctx.drawImage(
            this.spritesheet,
            itemData.location[0],
            itemData.location[1],
            itemData.size[0],
            itemData.size[1],
            m.x - itemData.size[0] / 2 * INVENTORY_SCALE,
            m.y - itemData.size[1] / 2 * INVENTORY_SCALE,
            itemData.size[0] * INVENTORY_SCALE,
            itemData.size[1] * INVENTORY_SCALE
        );
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

        

        for (let i = 0; i < INVENTORY_TOOLS; i++) {
            this.#drawHotbarSlot(this.hotbar_tools[i], INVENTORY_TOOLS_LOCATIONS[i][0], INVENTORY_TOOLS_LOCATIONS[i][1], ctx);
        }

        for (let i = 0; i < INVENTORY_GENERAL; i++) {
            this.#drawHotbarSlot(this.hotbar_general[i], INVENTORY_GENERAL_LOCATIONS[i][0], INVENTORY_GENERAL_LOCATIONS[i][1], ctx);
        }

    }

    #drawInventory(ctx) {
        ctx.drawImage(
            this.spritesheet,
            INVENTORY_ASSET_LOCATION[0],
            INVENTORY_ASSET_LOCATION[1],
            INVENTORY_ASSET_SIZE[0],
            INVENTORY_ASSET_SIZE[1],
            X_CENTER - INVENTORY_ASSET_SIZE[0] / 2 * INVENTORY_SCALE,
            Y_CENTER - (INVENTORY_ASSET_SIZE[1] + HOTBAR_ASSET_SIZE[1]) / 2 * INVENTORY_SCALE,
            INVENTORY_ASSET_SIZE[0] * INVENTORY_SCALE,
            INVENTORY_ASSET_SIZE[1] * INVENTORY_SCALE
        );

        for (let i = 0; i < INVENTORY_ROWS; i++) {
            for (let j = 0; j < INVENTORY_COLUMNS; j++) {
                this.#drawInventorySlot(this.inventory[i][j], 10 + j * (INVENTORY_SLOT_SIZE[0] + 8), 34 + i * (INVENTORY_SLOT_SIZE[1] + 6), ctx);
            }
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

    #drawInventorySlot(itemID, x, y, ctx) {
        const itemData = ITEMS[itemID];

        ctx.drawImage(
            this.spritesheet,
            itemData.location[0],
            itemData.location[1],
            itemData.size[0],
            itemData.size[1],
            X_CENTER - INVENTORY_ASSET_SIZE[0] / 2 * INVENTORY_SCALE + (x + INVENTORY_SLOT_SIZE[0] / 2 - itemData.size[0] / 2) * INVENTORY_SCALE,
            Y_CENTER - (INVENTORY_ASSET_SIZE[1] + HOTBAR_ASSET_SIZE[1]) / 2 * INVENTORY_SCALE + (y + INVENTORY_SLOT_SIZE[1] / 2 - itemData.size[1] / 2) * INVENTORY_SCALE,
            itemData.size[0] * INVENTORY_SCALE,
            itemData.size[1] * INVENTORY_SCALE
        );

    }



}