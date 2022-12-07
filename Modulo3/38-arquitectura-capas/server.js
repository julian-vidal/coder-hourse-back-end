const express = require("express")
require("dotenv").config()

const app = express()

const {PORT} = process.env || "8080"


// Routers
const PokemonRouter = require("./src/routes/pokemon")
const TrainerRouter = require("./src/routes/trainer")


// Midlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/pokemon", PokemonRouter)
app.use("/trainer", TrainerRouter)



// Routes
const server = app.listen(PORT, () => {
    console.log(`Server is up in port ${PORT}`)
})

server.on("error", err => console.log())