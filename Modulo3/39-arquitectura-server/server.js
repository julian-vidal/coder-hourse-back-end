const express = require("express")

const app = express()

const {PORT = 8080} = require("./src/config") // We set 8080 as default in case it's undefined


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