import { logger } from "../../utils/logger_config"
import {ProductRepository} from "./product.repository"

const repo = new ProductRepository()

// Resolutions
export const getProducts = async () => {
    const products = await repo.getAll() 
    return products
}

export const getProduct = async ({id}) => {
    try {
        const product = await repo.getById(parseInt(id))
        return product
    } catch (error) {
        logger.log("error", error)
    }
}

export const createProduct = async({product}) => {
    const newProduct = await repo.save(product)
    return newProduct
}

export const updateProduct = async({id, product}) => {
    await repo.update(id, product)
    const updatedProduct = await getProduct({id})
    return updatedProduct
}

export const deleteProduct =  async({id}) => {
    const deletedProduct = await repo.delete(id)
    return `Product ID ${id} deleted: ${deletedProduct}`
}