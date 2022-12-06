const productSchema = require("../dao/product.schema")

const getAllProducts = async (req,res) => {
    try {
        const products = await productSchema.find();
        return res.json(products)
    } catch (err) {
        return res
            .status(400)
            .json({err})
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await productSchema.findOne(req.params.id)
        return res.json(product)
    } catch (err) {
        return res
            .status(400)
            .json({err})

    }
}

const insertProduct = async (req, res) => {
    try {
        const product = await productSchema.insert(req.body)
        return res.redirect("/")
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await productSchema.update(req.params.id, req.body)
        return res.json(product)
    } catch (err) {
        return res
            .status(400)
            .json({err})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productSchema.remove(req.params.id)
        return res.json(product)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct
}