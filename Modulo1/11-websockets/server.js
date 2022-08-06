const express = require('express');
const {Server: HTTPServer} = require('http'); // se importa la clase server y se renombra a HTTPServer, esto se hacer porque socket.io tiene una clase llamada Server
const {Server: SocketServer} = require('socket.io'); // Se importa la clase server y se renombra a SocketServer
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HTTPServer(app); // es un wrapper que sirve como listener de eventos
const socketServer = new SocketServer(httpServer);

const messages = []

// app.use("/public", express.static("public"))
app.use(express.static("public"))

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// Listener para cuando hay una conexión nueva, socket es el evento
socketServer.on("connection", socket => {
    console.log('Nuevo cliente conectado'); //se muestra en el server

    socketServer.emit("INIT", messages); // Envia los mensajes cuando un cliente se conecta por primera vez

    // Listen sockets from the client
    socket.on("POST_MESSAGE", msg => {
        const _msg = {...msg, id: socket.id}
        messages.push(_msg);
        console.log(_msg);
        socketServer.sockets.emit("NEW_MESSAGE", _msg) //para emitir a todos los clientes conectados
    })
})

// Arranca el servidor
httpServer.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})

