const {Router} = require("express");
const {faker} = require("@faker-js/faker");

const productTestRouter = Router();


productTestRouter.get("/", (req, res) => {
    try {
        let products =[]
        for (let i =1; i<6; i++) {
            products.push({
                id: i,
                name: faker.commerce.product(),
                image: faker.image.abstract(),
                price: parseFloat(faker.commerce.price()) 
            })
        }
        res.json({
            products
        })
    } catch(err) {
        res.json(err)
    }
})

module.exports = productTestRouter;