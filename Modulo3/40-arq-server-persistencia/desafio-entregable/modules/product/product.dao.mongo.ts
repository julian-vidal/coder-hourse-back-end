import {model, Schema} from "mongoose"
import { MongoConnection } from "../../database"
import {DAOInterface} from "../dao.interface"
import { ProductDTO } from "./product.dto"


const ProductSchema = new Schema<ProductDTO>({
    id: {type: "Number"},
    name: {type: "String"},
    price: {type: "Number"},
    stock: {type: "Number"},
    picture: {type: "String"}
})

const ProductModel = model("Product", ProductSchema);

export class ProductDAOMongoImpl implements DAOInterface<ProductDTO, number>{
    private productModel;
    constructor(){
        MongoConnection.connect();
        this.productModel = ProductModel
    }

    async getAll() {
        return await this.productModel.find()
    }

    async getById(id: number) {
        try {
            const product = await this.productModel.findOne({id})
            return product    
        } catch (error) {
            return false
        }
        
    }

    async save(product: ProductDTO){

        try {
            const productExists = await this.getById(product.id)

            if(!productExists) {
                const _product = new this.productModel(product);
                _product.save()
                return product;
            }
        } catch(err) {
            return {"error": `There's already a product with ID ${product.id}`}
            // return err
        }
    }
    
    async update(id: number, product: ProductDTO) {
        try {
            await this.productModel.updateOne({id}, product)
            return product
        } catch (error) {
            return {"error": `No product with ID ${id}`}
        }
    }
    
    async delete(id: number) {
        try {
            await this.productModel.deleteOne({id})    
            return true
        } catch (error) {
            return false
        }
    }

    
}