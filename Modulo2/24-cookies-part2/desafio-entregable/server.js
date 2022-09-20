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


// Sessions setup
const dotenv = require("dotenv");
dotenv.config()
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ttl = 60 //seconds

app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URL,
        ttl, //seconds
        retries: 0
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))


// ejs setup
app.set("view engine", "ejs");
app.set("views", "./views");



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

// LOGIN form 
app.post("/login", (req,res) => {
    try {
        req.session.name = req.body.name
        req.session.cookie.maxAge = ttl * 1000 // ms
        return res.redirect("..")
    } catch (err) {
        console.log(err)
    }
})

app.get("/login", (req,res) => {
    return res.redirect("..")
})

// LOGOUT

app.get("/logout", (req,res) => {

    if (req.session.name) {
        res.render("pages/logout", {
            name: req.session.name
        })
    
        req.session.destroy(err => {
            if(err) {
                res.send("Error to logout")
            } 
        })
    } else {
        res.redirect("..")
    }
})


// GET form to add a new product
app.get("/", (req,res) => {
    
    try {
        if(req.session.name) {
            console.log(req.session)
            res.render("pages/index", {
                products: products.products,
                name: req.session.name,
                expirationDate: req.session.cookie._expires
            })
        } else {
            res.render("pages/login")
        }
    } catch(err) {
        res.json({error: err})
    }
    
})



// GET all products
app.get("/productos", (req,res) => {
    try {
        res.render("pages/products", {
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

