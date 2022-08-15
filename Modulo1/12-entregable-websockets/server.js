// Server setup
const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/public', express.static("public"))

// Websocket
const {Server: HTTPServer} = require('http')
const {Server: SocketServer} = require('socket.io');
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const events = require("./utils/socket_events");

httpServer.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})


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

// Initialize arrays of products and messages
const products = new Container();
const messages = [];


socketServer.on("connection", socket =>{
    console.log("New client connected");
    socketServer.emit(events.UPDATE_MESSAGES, messages);


    socket.on(events.POST_MESSAGE, msg => {
        msg.date = Date.now();
        messages.push(msg);
        console.log(`msg: ${msg}`);

        socketServer.sockets.emit(events.UPDATE_MESSAGES, messages)
    })
})



// GET form to add a new product
app.get("/", (req,res) => {
    try {
        res.render("main", {
            products: products.products
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

