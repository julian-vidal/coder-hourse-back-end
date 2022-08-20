# Notes

1. Knex transforma nuestro codigo JS en consultas SQL
2. Revisar: [DBeaver](https://dbeaver.io/), una herramienta para BD
3. [knex cheat sheet](https://devhints.io/knex)

# Install and setup
1. `npm init --y`
2. `npm i dotenv express knex mysql socket.io`
3. `npm i -D nodemon`
4. Create a DB: 
`
CREATE DATABASE IF NOT EXISTS plataforma_db;

USE plataforma_db;

SHOW TABLES
`
5. Crear un archivo *.env* cons los datos de la conexion a la DB:

`
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=root_password
DATABASE_NAME=plataforma_db
`
6. Include *.env* to the *gitignore* file

7. Setup knex files:

```
const dotenv = require("dotenv");
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const knexConfig = {
    client: "mysql",
    connention: {
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
        directory: './seeds'
    }
}

module.exports = knexConfig;
```

## Migration
8. Migracion para definir las estructutras de las BD para futuras modificaciones. `npx knex migrate:make <nombre_migracion>` -> crear un archivo en la carpeta *migrations* con 2 funciones: up y down (para hacer rollbacks: de atrás hacia delante)

9. Dentro del archivo creado, en la funcion up, se definen las tablas y columnas de la DB:

```
exports.up = function(knex) {
  return knex.schema.createTable('personas', table => {
    // Estas son las columnas
    table.increments("id").primary().notNullable(); 
    table.string("nombre", 255).notNullable();
    table.integer("edad").notNullable();
  })
};

```

10. En la función down, se corre:
```
exports.down = function(knex) {
  return knex.schema.dropTable('provincias');
};
```

11.  Se crea la ultima migracion creada: `npx knex migrate:latest`. Para una especifica `npx knex migrate:up 001_migration_name.js`

12. Ahora, si corremos `SELECT * FROM <table_name>;`, nos deberia mostrar las columnas de la tabla que se crearon.

### Get
13. El equivalente a *GET* en db en *SELECT*. Para leer data de una DB debemos hacer estos imports (en el .js de la ruta):

```
const knex = require('knex');
const knexConfig = require('../knexfile');
const database = knex(knexConfig);
const tableName = "personas";
```

14. Ahora creamos el endpoint que lea data de la DB:

```
router.get("/", async (req,res) => {
    try {
        const products = await database(tableName);
        res.render("main", {
            products: products
        })
    } catch(err) {
        res.json({error: err})
    }
    
})
```

### Post
15. El equivalente a *POST* en DB es *INSERT*, entonces:

```
router.post("/productos", async (req,res) => {
    try {
        const body = req.body;
        if (body.name && body.image && body.price){
            await database(tableName).insert(body);
            // res.send({...body, id:})
            res.redirect("/")
        }
    } catch(err) {
        res.json({error: err})
    }
})
```
OJO: Las key del req.body deben considir con los nombres de las columnas de la tabla



## Seeds 

Seed -> define la data incial que van a tener las tablas. `npx seed:make <nombre_seed>`


1. NOTA: Siempre correr primero la migracion y luego el seed o va a lanzar error!
2. 
3.  Crear un seed: `npx knex seed:run` (runs all seeds) `knex seed:run --specific=seed-filename.js` (Runs a specific seed file)
