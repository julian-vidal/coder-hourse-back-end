// Server setup
const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})
server.on("error", err => console.log())

// Handlebars setup
const handlebars = require('express-handlebars');
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
// app.set("views", "./views");



// Class definition
class Container {
    constructor() {
        this.products = []
    }

    checkIfIdExists(id) {
        try {
            const positionId = this.products.findIndex(product => product.id === id);
            return positionId;
        } catch (err) {
            console.error(err)
        }
    }

}

const products = new Container();

// GET form to add a new product
app.get("/", (req,res) => {
    try {
        res.render("main")
    } catch(err) {
        res.json({error: err})
    }
    
})



// GET all products
app.get("/productos", (req,res) => {
    try {
        res.render("productos", {
            products: products.products,
        })
    } catch(err) {
        res.json({error: err})
    }
    
})



// POST a product
app.post("/productos", (req, res) => {
    try {
        const id = products.products.length + 1;
        const  product = req.body;
        product.price = parseInt(product.price)
        product.id = id;
        products.products.push(product)
        res.redirect("/")
    } catch (err) {
        res.json({error: err})
    }
})

