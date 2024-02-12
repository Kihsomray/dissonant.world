INVENTORY_TOOLS = 2;
INVENTORY_GENERAL = 4;

INVENTORY_ROWS = 3;
INVENTORY_COLUMNS = 9;

ITEM_PX = 24;

ITEMS = {

    0: {
        display_name: "Iron Sword",
        name: "iron_sword",
        type: ["weapon"],

        health: 200,

        attack_damage: 3.0,
        attack_cooldown: 0.8, // attack speed, seconds

        break_damage: 0.5, // if 1, do not need to specify
        break_cooldown: 1.0, // if 1, do not need to specify

        location: [1, 5],
        size: [16, 40]
    },

    1: {
        display_name: "Iron Hammer",
        name: "iron_hammer",
        type: ["weapon", "tool"],
        specialty: "smashing",

        health: 150,

        attack_damage: 6.0,
        attack_cooldown: 2.0,

        break_damage: 3.0,
        break_cooldown: 2.0,

        location: [23, 5],
        size: [20, 40]
    },

    2: {
        display_name: "Iron Axe",
        name: "iron_axe",
        type: ["weapon", "tool"],
        specialty: "chopping",

        health: 180,

        attack_damage: 1.8,
        attack_cooldown: 1.4,

        break_damage: 3.5,
        break_cooldown: 0.85,

        location: [51, 5],
        size: [18, 40]
    },

    3: {
        display_name: "Iron Pickaxe",
        name: "iron_pickaxe",
        type: ["weapon", "tool"],
        specialty: "mining",

        health: 185,

        attack_damage: 1.2,
        attack_cooldown: 0.9,

        break_damage: 3.0,
        break_cooldown: 1.0,

        location: [140, 5],
        size: [20, 40]
    },

    4: {
        display_name: "Upgraded Staff",
        name: "upgraded_staff",
        type: ["weapon"],

        health: 250,

        attack_damage: 4.0,
        attack_cooldown: 1.0,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [73, 1],
        size: [16, 48]
    },

    5: {
        display_name: "Kanabo",
        name: "kanabo",
        type: ["weapon"],

        health: 300,

        attack_damage: 7.0,
        attack_cooldown: 2.5, 

        break_damage: 1.5,
        break_cooldown: 1.5,

        location: [123, 5],
        size: [16, 40]
    },

    // need to update coordinates on the following:
    6: {
        display_name: "Iron Shovel",
        name: "iron_shovel",
        type: ["tool"],

        health: 150,

        attack_damage: 2.0,
        attack_cooldown: 1.0,

        break_damage: 2.0,
        break_cooldown: 1.0,

        location: [149, 1],
        size: [12, 48]
    },

    7: {
        display_name: "Knife",
        name: "knife",
        type: ["weapon"],

        health: 100,

        attack_damage: 2.0,
        attack_cooldown: 0.75,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [175, 11],
        size: [8, 28]
    },

    8: {
        display_name: "Pirate Iron Sword",
        name: "pirate_iron_sword",
        type: ["weapon"],

        health: 200,

        attack_damage: 3.5,
        attack_cooldown: 1,

        break_damage: 0.5,
        break_cooldown: 1.0,

        location: [195, 5],
        size: [16, 40]
    },

    9: {
        display_name: "Shield",
        name: "shield",
        type: ["general"],

        health: 300,

        attack_damage: 0.5,
        attack_cooldown: 1.0,

        break_damage: 0.5,
        break_cooldown: 1.0,

        location: [219, 13],
        size: [16, 24]
    },

    10: {
        display_name: "Bow",
        name: "bow",
        type: ["weapon"],

        health: 100,

        attack_damage: 1.0,
        attack_cooldown: 1.0,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [245, 5],
        size: [12, 40]
    },

    11: {
        display_name: "Arrow",
        name: "arrow",
        type: ["weapon"],

        health: 50,

        attack_damage: 2.25,
        attack_cooldown: 1.75,

        break_damage: 0.5,
        break_cooldown: 0.5,

        location: [271, 11],
        size: [8, 28]
    },

    12: {
        display_name: "Stick",
        name: "stick",
        type: ["general"],

        health: 50,

        attack_damage: 1.0,
        attack_cooldown: 1.0,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [295, 1],
        size: [8, 48]
    },

    13: {
        display_name: "Gold Sword",
        name: "gold_sword",
        type: ["weapon"],

        health: 150,

        attack_damage: 4.0,
        attack_cooldown: 0.9,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [317, 5],
        size: [16, 40]
    },

    14: {
        display_name: "Staff",
        name: "staff",
        type: ["weapon"],

        health: 200,

        attack_damage: 3.0,
        attack_cooldown: 1.2,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [341, 1],
        size: [12, 48]
    },

    20: {
        display_name: "Iron Ore",
        name: "iron_ore",
        type: ["ore"],

        health: 100,

        break_damage: 1.0,
        break_cooldown: 1.0,

        location: [260, 5],
        size: [20, 40]
    },
    
    21: {
        display_name: "Gold Ore",
        name: "gold_ore",
        type: ["ore"],
        health: 100,
        break_damage: 2.0,
        break_cooldown: 1.0,
        location: [290, 5],
        size: [20, 40]
    },
    22: {
        display_name: "Azurite Ore",
        name: "azurite_ore",
        type: ["ore"],
        health: 120,
        break_damage: 2.5,
        break_cooldown: 1.2,
        location: [320, 5],
        size: [20, 40]
    },
    23: {
        display_name: "Iron Ingot",
        name: "iron_ingot",
        type: ["ingot"],
        health: 100,
        break_damage: 2.0,
        break_cooldown: 1.0,
        location: [350, 5],
        size: [20, 40]
    },
    24: {
        display_name: "Gold Ingot",
        name: "gold_ingot",
        type: ["ingot"],
        health: 100,
        break_damage: 2.0,
        break_cooldown: 1.0,
        location: [380, 5],
        size: [20, 40]
    },
    25: {
        display_name: "Azurite Ingot",
        name: "azurite_ingot",
        type: ["ingot"],
        health: 120,
        break_damage: 2.5,
        break_cooldown: 1.2,
        location: [410, 5],
        size: [20, 40]
    },

    30: {
        display_name: "Oak Sapling",
        name: "oak_sapling",
        type: ["sapling"],
        health: 50,
        break_damage: 0.5,
        break_cooldown: 0.5,
        location: [320, 5],
        size: [20, 40]
    },
    31: {
        display_name: "Orange Sapling",
        name: "orange_sapling",
        type: ["sapling"],
        health: 50,
        break_damage: 0.5,
        break_cooldown: 0.5,
        location: [350, 5],
        size: [20, 40]
    },
    32: {
        display_name: "Orange Sapling",
        name: "orange_sapling",
        type: ["sapling"],
        health: 50,
        break_damage: 0.5,
        break_cooldown: 0.5,
        location: [380, 5],
        size: [20, 40]
    },
    33: {
        display_name: "Pink Sapling",
        name: "pink_sapling",
        type: ["sapling"],
        health: 50,
        break_damage: 0.5,
        break_cooldown: 0.5,
        location: [410, 5],
        size: [20, 40]
    },
    34: {
        display_name: "Spruce Sapling",
        name: "spruce_sapling",
        type: ["sapling"],
        health: 50,
        break_damage: 0.5,
        break_cooldown: 0.5,
        location: [440, 5],
        size: [20, 40]
    }


}

class PlayerInventory {

    hotbar_tools = new Array(INVENTORY_TOOLS);
    hotbar_general = new Array(INVENTORY_GENERAL);

    inventory = new Array(INVENTORY_ROWS); // number of rows

    constructor() {

        // fill each row with an array of columns
        for (let i = 0; i < INVENTORY_ROWS; i++) {
            this.inventory[i] = new Array(INVENTORY_COLUMNS);
        }

    }

    // add item to inventory



}