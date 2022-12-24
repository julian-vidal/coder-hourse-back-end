import { DAOInterface } from "../dao.interface";
import { ProductDTO } from "./product.dto";
import { ProductDAOFactory } from "./product.factory";

export class ProductRepository implements DAOInterface<ProductDTO, number>{
    private productDAO: DAOInterface<ProductDTO, number>

    constructor() {
        const productFactory = new ProductDAOFactory();
        this.productDAO = productFactory.getDAO()
    }

    async getAll() : Promise<ProductDTO[]> {
        return await this.productDAO.getAll()
    }

    async getById(id: number): Promise<ProductDTO> {
        return await this.productDAO.getById(id)
    }

    async save(product: ProductDTO): Promise<ProductDTO> {
        return await this.productDAO.save(product)
    }

    async update(id: number, product: ProductDTO): Promise<ProductDTO> {
        return await this.productDAO.update(id, product)
    }

    async delete(id: number): Promise<boolean> {
        return await this.productDAO.delete(id)
    }
}