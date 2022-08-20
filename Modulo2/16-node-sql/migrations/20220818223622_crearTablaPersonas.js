/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('personas', table => {
    // Estas son las columnas
    table.increments("id").primary().notNullable(); 
    table.string("nombre", 255).notNullable();
    table.integer("edad").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("personas");
};
