const {Router} = require("express")

const {insertProduct} = require("../controllers/ProductController")


const routerProducts = Router()

routerProducts.post("/", insertProduct)


module.exports = routerProducts