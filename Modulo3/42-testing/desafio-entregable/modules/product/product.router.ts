import { Router } from "express";

import { getAllProducts, getOneProduct, insertProduct, updateProduct, deleteProduct } from "./product.controller"

const productRouter = Router()

// GET requests
productRouter.get("/", getAllProducts)
productRouter.get("/:id", getOneProduct)

// POST request
productRouter.post("/", insertProduct)

// PUT request
productRouter.put("/:id", updateProduct)

// DELETE request
productRouter.delete("/:id", deleteProduct)

export default productRouter