import chai from "chai"
import supertest from "supertest"
import { BASE_URL } from "../config"
import { CreateProductDTO, UpdateProductDTO } from "../modules/product/product.dto"


const {expect } = chai

const agent = supertest(BASE_URL)

describe("Test product endpoints", () => {

    before(async () => {
        // Make sure that product with ID 1 exists
        const prod1 = await agent.get("/1")
        if(prod1.status !== 200 ){
            const product1 : CreateProductDTO = {
                id: 1,
                name: "Test1",
                price: 11,
                stock: 11,
                picture: "https://via.placeholder.com/111"
            }
            const res = await agent.post("").send(product1)
        }

        // Make sure that product with ID 3 doesn't exist
        const prod3 = await agent.get("/3")
        if(prod3.status === 200) {
            const res = await agent.delete("/3")
        }

        // Make sure that product with ID 4 exists
        const prod4 = await agent.get("/4")
        if(prod4.status !== 200 ){
            const product4 : CreateProductDTO = {
                id: 4,
                name: "Test4",
                price: 44,
                stock: 44,
                picture: "https://via.placeholder.com/444"
            }
            const res = await agent.post("").send(product4)
        }
    })

    it("Get all products", async () => {
        const res = await agent.get("")
        expect(res.status).to.eql(200)
    })

    it("Get one product", async() => {
        const id = 1
        const res = await agent.get(`/${id}`)
        expect(res.status).to.eql(200)
        expect(res.body.id).to.eql(id)
    })

    it("Create a product", async() => {
        const newProduct : CreateProductDTO = {
            id: 3,
            name: "Test3",
            price: 33,
            stock: 33,
            picture: "https://via.placeholder.com/333"
        }

        const res = await agent.post("").send(newProduct)
        const {body} = res

        expect(res.status).to.eql(200)
        expect(body).to.include.keys(["name", "price", "stock", "picture"])
        expect(body.name).to.eql(newProduct.name)
    })

    it("Update a product", async() => {
        const id = 1
        const updatedProduct: UpdateProductDTO = {
            name: "Test1!"
        }
        const res = await agent.put(`/${id}`).send(updatedProduct)
        expect(res.status).to.eql(200)
    })

    it("Delete a product", async() => {
        const id = 4
        const res = await agent.delete(`/${id}`)
        expect(res.status).to.eql(200)
    })
})