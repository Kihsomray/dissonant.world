INVENTORY_TOOLS = 2;
INVENTORY_TOOLS_LOCATIONS = [[210, 10], [258, 10]];

INVENTORY_GENERAL = 4;
INVENTORY_GENERAL_LOCATIONS = [[10, 10], [58, 10], [106, 10], [154, 10]];

INVENTORY_ROWS = 3;
INVENTORY_COLUMNS = 9;

INVENTORY_SLOT_SIZE = [32, 32];

INVENTORY_ASSET_LOCATION = [547, 153];
INVENTORY_ASSET_SIZE = [204, 176];

HOTBAR_ASSET_LOCATION = [365, 537];
HOTBAR_ASSET_SIZE = [308, 60];

INVENTORY_SCALE = SCALE / 3;

console.log("hi");

class PlayerInventory {

    openedInventory = false;

    hotbar_tools = new Array(INVENTORY_TOOLS);
    hotbar_general = new Array(INVENTORY_GENERAL);

    inventory = new Array(INVENTORY_ROWS); // number of rows

    constructor() {

        this.spritesheet = ASSET_MANAGER.getImage("i/*");

        // fill each row with an array of columns
        for (let i = 0; i < INVENTORY_ROWS; i++) {
            this.inventory[i] = new Array(INVENTORY_COLUMNS);
        }
    
        window.addEventListener("keydown", event => {
            if (event.key.toLowerCase() === "e") {
                this.openedInventory = !this.openedInventory;
            }
        });

    }

    draw(ctx) {
        this.#drawHotbar(ctx);
        if (this.openedInventory) {
            this.#drawInventory(ctx);
        }

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

        

        for (let i = 0; i < INVENTORY_ROWS; i++) {
            for (let j = 0; j < INVENTORY_COLUMNS; j++) {
                
            }
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
    }


    #drawSlot(itemID, x, y, ctx) {
        const itemData = ITEMS[itemID];

        ctx.drawImage(
            this.spritesheet,
            itemData.location[0],
            itemData.location[1],
            itemData.size[0],
            itemData.size[1],
            x + INVENTORY_SLOT_SIZE[0] / 2 - itemData.size[0] / 2 * INVENTORY_SCALE,
            y + INVENTORY_SLOT_SIZE[1] / 2 - itemData.size[1] / 2 * INVENTORY_SCALE,
            itemData.size[0] * INVENTORY_SCALE,
            itemData.size[0] * INVENTORY_SCALE
        );

    }



}