const dotenv = require("dotenv");
dotenv.config();

// const DATABASE_HOST = process.env.DATABASE_HOST;
// const DATABASE_PORT = process.env.DATABASE_PORT;
// const DATABASE_USER = process.env.DATABASE_USER;
// const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
// const DATABASE_NAME = process.env.DATABASE_NAME;


const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "root" ;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "root_password";
const DATABASE_NAME = process.env.DATABASE_NAME || "plataforma_db";


// DATABASE_HOST=localhost
// DATABASE_PORT=3306
// DATABASE_USER=root
// DATABASE_PASSWORD=root_password
// DATABASE_NAME=plataforma_db

const knexConfig = {
    client: "mysql",
    connection: {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    },
    seeds : {
        tableName: 'knex_seeds',
        directory: './seeds/'
    }
}

module.exports = knexConfig;