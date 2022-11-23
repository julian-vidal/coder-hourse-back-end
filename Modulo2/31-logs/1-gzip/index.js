const express = require("express");
const compresison = require("compression")
const gzipMiddleware = compresison()



const PORT = 8080
const app = express()

const generateString = () => {
    return Array(1000).fill("Hola que tal").join("")
}

const str = generateString()

app.get("/saludo", (req,res) => {
    res.send(str)
})


app.get("/saludogzip", gzipMiddleware,  (req,res) => {
    res.send(str)
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})