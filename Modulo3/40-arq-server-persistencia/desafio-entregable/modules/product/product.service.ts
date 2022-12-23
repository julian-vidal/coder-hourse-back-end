import { ProductDTO } from "./product.dto";
import { ProductRepository } from "./product.repository";

export default class ProductService {
    static repo: ProductRepository;

    static initRepo() {
        ProductService.repo = new ProductRepository()
    }

    static async getAll() {
        ProductService.initRepo()
        return await ProductService.repo.getAll()
    }

    static async getById(id: number) {
        ProductService.initRepo()
        return await ProductService.repo.getById(id)
    }

    static async save(product: ProductDTO) {
        ProductService.initRepo()
        return await ProductService.repo.save(product)
    }

    static async delete(id:number) {
        ProductService.initRepo()
        return await ProductService.repo.delete(id)
    }

    static async update(id: number, product: ProductDTO) {
        ProductService.initRepo()
        return await ProductService.repo.update(id, product)
    }
}