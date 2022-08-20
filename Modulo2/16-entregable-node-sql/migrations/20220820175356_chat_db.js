/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const tableName = "chats";

exports.up = function(knex) {
  return knex.schema.createTable(tableName, table => {
    table.increments("id").primary().notNullable();
    table.string("email").notNullable();
    table.string("message").notNullable();
    table.integer("date").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
};

// npx knex migrate:up 20220820175356_chat_db.js --knexfile=knexfile-sqlite3.js
// npx knex seed:run --specific=chats.js --knexfile=knexfile-sqlite3.js


// npx knex migrate:down 20220820175356_chat_db.js --knexfile=knexfile-sqlite3.js