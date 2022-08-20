/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments("id").primary().notNullable();
        table.string("name", 255).notNullable();
        table.string("image", 255).notNullable();
        table.float("price").notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("products")
};


