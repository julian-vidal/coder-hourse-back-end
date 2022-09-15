/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const tableName = "products";
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tableName).del()
  await knex(tableName).insert([
    {
      name: "Test1",
      image: "https://via.placeholder.com/150",
      price: 10
    }
  ]);
};
