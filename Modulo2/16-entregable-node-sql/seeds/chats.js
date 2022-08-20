/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const tableName = "chats"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tableName).del()
  await knex(tableName).insert([
    {
      email: "example@example.com",
      message: "This is sample message",
      date: Date.now()
    }
  ]);
};
