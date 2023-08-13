/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// The exported up function migrates the database
// to the next state.
const up = async function(knex) {
  // Creates a table for the application's carts
  // containing a username column and an id column
  // that autoincrementss
  await knex.schema.createTable("carts", table => {
    table.increments("id");
    table.string("username");
  })

  // Creates a carts_items table that will keep
  // track of the items in each cart
  await knex.schema.createTable("carts_items", table => {
    // Creates a cartId column that references a cart's
    // id in the carts table
    table.integer("cartId").references("carts.id");
    table.string("itemName");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// The exported down function migrates the database
// to the previous state, deleting the carts and 
// carts_items tables
const down = async function(knex) {
  await knex.schema.dropTable("carts");
  await knex.schema.dropTable("carts_items");
};

export { up, down }