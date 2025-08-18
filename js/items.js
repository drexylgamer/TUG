const TEAPOT = new Item("./assets/item/teapot.png", 10, 100, 100, 45, 2) // Teapot
const SWORD_IN_THE_STONE = new Item("./assets/item/sword_in_the_stone.png", 30, 500, 1000, 5, 1.5) // Sword in the Stone
const EMPTY_ITEM = new Item("./assets/item/empty.png", 0, 0, 0, 0, 1) // Empty item slot
const SWITCH = new Item("./assets/item/switch.png", 100, 100, 5000, 360, 0.5) // Switch
const BRICK = new Item("./assets/item/brick.png", 1, 250, 50, 45, 2, 50) // Brick


// Ground Items
const BURGER = new GroundItem("./assets/item/borgor.png", null, null, 0, 50, 0, 0, 1, 1); // Burger
const POISONOUS_GRAPE = new GroundItem("./assets/item/poisonous_grape.png", null, null, 0, -10, 0, 0, 10, 1); // Poisonous Grape
const BOLT = new GroundItem("./assets/item/bolt.png", null, null, 0, 0, 10, 10, 0, 0.25); // Bolt
const PILE_OF_RUSTY_SH_T = new GroundItem("./assets/item/pile of rusty sh-t.png", null, null, 0, -50, 100, 100, 100, 0.075, 0.25); // Pile of Rusty Sh*t
const MAX_GROUND_ITEMS = 10; // Maximum number of ground items on the map