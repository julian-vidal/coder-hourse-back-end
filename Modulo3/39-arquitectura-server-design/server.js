const express = require("express")
const cors = require("cors")
const app = express()

const {PORT = 8080} = require("./src/config") // We set 8080 as default in case it's undefined

// Views
app.set("view engine", "ejs");
app.set("views", "./src/views/");

// Routers
const PokemonRouter = require("./src/routes/pokemon")
const TrainerRouter = require("./src/routes/trainer")
const MiscRouter = require("./src/routes/misc")

// Midlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// Routes
app.use("/pokemon", PokemonRouter)
app.use("/trainer", TrainerRouter)
app.use("/misc", MiscRouter)





//
const server = app.listen(PORT, () => {
    console.log(`Server is up in port ${PORT}`)
})

server.on("error", err => console.log())