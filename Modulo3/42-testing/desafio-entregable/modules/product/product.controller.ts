import { ProductRepository } from "./product.repository";
import { Request, Response } from "express";

const repo = new ProductRepository()

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await repo.getAll()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const getOneProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const product = await repo.getById(id)
        return res.status(200).json(product)
    } catch (err) {
        return res
            .status(400)
            .json({err})

    }
}

export const insertProduct = async (req: Request, res: Response) => {
    try {
        const product = await repo.save(req.body)
        return res.status(200).json(product)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const product = await repo.update(id, req.body)
        return res.status(200).json(product)
    } catch (err) {
        return res
            .status(400)
            .json({err})
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const product = await repo.delete(id)
        return res.status(200).json(product)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}