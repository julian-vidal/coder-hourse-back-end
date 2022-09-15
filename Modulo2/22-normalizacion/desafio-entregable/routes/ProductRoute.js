const {Router} = require('express');
const router = Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const database = knex(knexConfig);
const tableName = "products";


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


router.post("/productos", async (req,res) => {
    try {
        const body = req.body;
        if (body.name && body.image && body.price){
            await database(tableName).insert(body);
            res.redirect("/")
        }
    } catch(err) {
        res.json({error: err})
    }
})

module.exports = router;