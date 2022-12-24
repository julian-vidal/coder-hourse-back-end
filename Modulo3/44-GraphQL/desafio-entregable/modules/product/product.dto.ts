import { buildSchema } from "graphql"

export interface ProductDTO {
    id: number,
    name: string,
    price: number,
    stock: number,
    picture: string,
    _id?: string
}

export interface CreateProductDTO extends Omit<ProductDTO, "_id"> {}

export interface UpdateProduct extends Partial<CreateProductDTO> {}

export interface UpdateProductDTO extends Omit<UpdateProduct, "id"> {}

export const GraphQLSchema = buildSchema(`
type Product {
    id: ID!
    name: String
    price: Int
    stock: Int
    picture: String
    _id: String
}

input ProductInput {
    id: ID!
    name: String
    price: Int
    stock: Int
    picture: String
}

input UpdateProduct {
    name: String
    price: Int
    stock: Int
    picture: String
}

type Query {
    getProduct(id: ID!): Product
    getProducts: [Product]
}

type Mutation {
    createProduct(product: ProductInput): Product
    updateProduct(id: ID!, product: UpdateProduct): Product
    deleteProduct(id: ID!): String
}
`)