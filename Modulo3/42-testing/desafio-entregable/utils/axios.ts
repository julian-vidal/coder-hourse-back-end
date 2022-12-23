import axios from "axios";
import { BASE_URL } from "../config";
import { ProductDTO, UpdateProductDTO } from "../modules/product/product.dto"

export const getAllProducts = async() => {
    const config = {
        method: "get",
        url: BASE_URL,
    }
    const res = await axios(config)
    console.log(res.data)
    return res.data
}

export const getOneProduct = async (id: number) => {
    const config = {
        method: "get",
        url: `${BASE_URL}/${id}`,
    }
    const res = await axios(config)
    console.log(res.data)
    return res.data
}

export const insertProduct = async (product: ProductDTO ) => {
    const config = {
        method: "post",
        url: BASE_URL,
        data: product
    }
    const res = await axios(config)
    console.log(res.data)
    return res.data
}

export const updateProduct = async(id: number, product: UpdateProductDTO) => {
    const config = {
        method: "put",
        url: `${BASE_URL}/${id}`,
        data: product
    }
    const res = await axios(config)
    console.log(res.data)
    return res.data
}

export const deleteProduct = async(id: number) => {
    const config = {
        method: "delete",
        url: `${BASE_URL}/${id}`
    }
    const res = await axios(config)
    console.log(res.data)
    return res.data
}

getAllProducts()

// getOneProduct(1)

// insertProduct({ 
//     id: 3,
//     name: "Test3",
//     price: 33,
//     stock: 33,
//     picture: "https://via.placeholder.com/333"
// })

// updateProduct(1,{ 
//     name: "Test1",
//     price: 1,
//     stock: 1,
//     picture: "https://via.placeholder.com/111"
// })

// deleteProduct(3)