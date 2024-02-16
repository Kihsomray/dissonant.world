ITEMS = {

    0: {
        display_name: "",
        name: "air",
        type: ["general"],
        location: [0, 0],
        size: [0, 0],
        droppable: false
    },

    1: {
        display_name: "Iron Sword",
        name: "iron_sword",
        type: ["weapon"],

        health: 200,

        attack_damage: 3.0,
        attack_cooldown: 0.8, // attack speed, seconds

        location: [1, 5],
        size: [16, 40]
    },

    2: {
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

    3: {
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

    4: {
        display_name: "Iron Pickaxe",
        name: "iron_pickaxe",
        type: ["weapon", "tool"],
        specialty: "mining",

        health: 185,

        attack_damage: 1.2,
        attack_cooldown: 0.9,

        break_damage: 3.0,
        break_cooldown: 1.0,

        location: [95, 5],
        size: [24, 40]
    },

    5: {
        display_name: "Upgraded Staff",
        name: "upgraded_staff",
        type: ["weapon"],

        health: 250,

        attack_damage: 4.0,
        attack_cooldown: 1.2,

        location: [73, 1],
        size: [16, 48]
    },

    6: {
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
    7: {
        display_name: "Iron Shovel",
        name: "iron_shovel",
        type: ["tool"],
        specialty: "digging",

        health: 150,

        break_damage: 5.0,
        break_cooldown: 0.5,

        location: [149, 1],
        size: [12, 48]
    },

    8: {
        display_name: "Knife",
        name: "knife",
        type: ["weapon"],

        health: 100,

        attack_damage: 2.0,
        attack_cooldown: 0.75,

        location: [175, 11],
        size: [8, 28]
    },

    9: {
        display_name: "Pirate Iron Sword",
        name: "pirate_iron_sword",
        type: ["weapon"],

        health: 200,

        attack_damage: 3.5,
        attack_cooldown: 1,

        location: [195, 5],
        size: [16, 40]
    },

    10: {
        display_name: "Shield",
        name: "shield",
        type: ["general"],

        health: 500,

        location: [219, 13],
        size: [16, 24]
    },

    11: {
        display_name: "Bow",
        name: "bow",
        type: ["weapon"],

        health: 200,

        location: [245, 5],
        size: [12, 40]
    },

    12: {
        display_name: "Arrow",
        name: "arrow",
        type: ["weapon"],

        health: 50,

        attack_damage: 2.25,
        attack_cooldown: 1.75,

        location: [271, 11],
        size: [8, 28]
    },

    13: {
        display_name: "Stick",
        name: "stick",
        type: ["general"],

        location: [295, 1],
        size: [8, 48]
    },

    14: {
        display_name: "Gold Sword",
        name: "gold_sword",
        type: ["weapon"],

        health: 150,

        attack_damage: 4.0,
        attack_cooldown: 0.9,

        location: [317, 5],
        size: [16, 40]
    },

    15: {
        display_name: "Staff",
        name: "staff",
        type: ["weapon"],

        health: 200,

        attack_damage: 3.0,
        attack_cooldown: 1.2,

        location: [341, 1],
        size: [12, 48]
    },

    16: {
        display_name: "Iron Labrys",
        name: "iron_labrys",
        type: ["weapon", "tool"],
        specialty: "chopping",

        health: 220,

        attack_damage: 2.8,
        attack_cooldown: 1.9,

        break_damage: 4.5,
        break_cooldown: 1.0,

        location: [467, 21],
        size: [24, 48]
    },



    20: {
        display_name: "Iron Ore",
        name: "iron_ore",
        type: ["ore"],

        location: [67, 97],
        size: [16, 20]
    },

    21: {
        display_name: "Gold Ore",
        name: "gold_ore",
        type: ["ore"],

        location: [99, 97],
        size: [16, 20]
    },
    22: {
        display_name: "Azurite Ore",
        name: "azurite_ore",
        type: ["ore"],

        location: [131, 97],
        size: [16, 20]
    },
    23: {
        display_name: "Diamond Ore",
        name: "diamond_ore",
        type: ["ore"],

        location: [323, 161],
        size: [16, 20]
    },



    24: {
        display_name: "Iron Ingot",
        name: "iron_ingot",
        type: ["ingot"],

        location: [161, 99],
        size: [20, 16]
    },
    25: {
        display_name: "Gold Ingot",
        name: "gold_ingot",
        type: ["ingot"],

        location: [193, 99],
        size: [20, 16]
    },
    26: {
        display_name: "Azurite Ingot",
        name: "azurite_ingot",
        type: ["ingot"],

        location: [225, 99],
        size: [20, 16]
    },
    27: {
        display_name: "Diamond",
        name: "diamond",
        type: ["gem"],

        location: [355, 161],
        size: [16, 20]
    },



    30: {
        display_name: "Maple Sapling",
        name: "maple_sapling",
        type: ["sapling"],

        location: [291, 95],
        size: [16, 24]
    },
    31: {
        display_name: "Orange Maple Sapling",
        name: "orange_maple_sapling",
        type: ["sapling"],

        location: [323, 95],
        size: [16, 24]
    },
    32: {
        display_name: "Redbud Sapling",
        name: "redbud_sapling",
        type: ["sapling"],

        location: [353, 95],
        size: [20, 24]
    },
    33: {
        display_name: "Cedar Sapling",
        name: "cedar_sapling",
        type: ["sapling"],

        location: [387, 95],
        size: [16, 24]
    }


}