const ProductSchema = require("../dao/product.schema")

const getAllProducts = () => {
    return ProductSchema.find()
}

module.exports = {
    getAllProducts
}