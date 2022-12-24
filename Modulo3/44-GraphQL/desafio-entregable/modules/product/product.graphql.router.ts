import { graphqlHTTP } from "express-graphql";
import {getProduct, getProducts, createProduct, updateProduct, deleteProduct} from "./product.graphql.controller"
import {GraphQLSchema} from "./product.dto"

// GRAPHQL
const graphql = graphqlHTTP({
    schema: GraphQLSchema,
    rootValue: {
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    },
    graphiql: true
})

export default graphql