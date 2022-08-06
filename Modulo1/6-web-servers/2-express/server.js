const express = require("express");

const app = express();
const PORT = 8080;

let visitas = 0;
let date = new Date();

app.get('/', (req, res) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>")
})


app.get('/visitas', (req,res) => {
    visitas++;
    res.send(`Haz hecho ${visitas} visitas en esta sesión`)
})

app.get('/fyh', (req, res) => {
    res.send(`La fecha y hora actual es ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
})

const server = app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})

server.on("error", err => console.log())