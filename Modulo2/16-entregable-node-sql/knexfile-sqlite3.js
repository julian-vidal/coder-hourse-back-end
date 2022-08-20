const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "chat_db.sqlite"
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds: {
        tableName: 'knex_seeds',
        directory: './seeds/'
    }
}

module.exports = knexConfig;