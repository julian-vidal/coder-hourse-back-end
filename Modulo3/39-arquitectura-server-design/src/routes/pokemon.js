const express = require("express")
const PokemonRouter = express.Router()

const {getAllPokemons, addNewPokemon, getPokemonById, updatePokemonById, deletePokemonById, showAllPokemons} = require("../controllers/pokemon")
const { isAuth } = require("../middlewares")

PokemonRouter.get("/", getAllPokemons)
PokemonRouter.get("/view", showAllPokemons)
PokemonRouter.get("/:id", getPokemonById)
PokemonRouter.post("/", isAuth,  addNewPokemon)
PokemonRouter.put("/:id", isAuth, updatePokemonById)
PokemonRouter.delete("/:id", isAuth, deletePokemonById)



module.exports = PokemonRouter