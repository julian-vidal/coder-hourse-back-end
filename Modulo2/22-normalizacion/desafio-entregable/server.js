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

// Routes
const productRoutes = require('./routes/ProductRoute');
app.use("/", productRoutes);

const productTestRouter = require("./routes/ProductTestRoute");
app.use("/api/products-test", productTestRouter);

const MessageRoute = require("./routes/MessageRoute");
app.use("/api/messages", MessageRoute)


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





// Knex
const knex = require('knex');







// Socket 

socketServer.on("connection", async socket =>{
    console.log("New client connected");
    // const messages = await chatsDB(chatTable);
    let messages = await fetch("http://localhost:8080/api/messages")
    messages = await messages.json()

    // console.log(`message type: typeof ${messages}`)
    // console.log(messages)


    // Normalizr
    const {normalize, schema} = require("normalizr");
    const authorSchema = new schema.Entity("author", {}, {idAttribute: "email"})
    const messageSchema = new schema.Entity("messages", {
        author: authorSchema
    })

    const messagesArray = new schema.Array(messageSchema);
    const normalized = normalize(messages, messagesArray);

    console.log(normalized)
    
    // We just need to send "entities" to the client
    const {entities} = normalized
    
    socketServer.emit(events.UPDATE_MESSAGES, entities);


    socket.on(events.POST_MESSAGE, async msg => {
        msg.date = Date.now();
        // messages.push(msg);

        await chatsDB(chatTable).insert(msg);

        

        console.log(`msg: ${msg}`);
        const messages = await chatsDB(chatTable);
        socketServer.sockets.emit(events.UPDATE_MESSAGES, messages)
    })
})