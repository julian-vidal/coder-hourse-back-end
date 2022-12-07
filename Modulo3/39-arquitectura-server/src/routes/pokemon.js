const express = require("express")
const PokemonRouter = express.Router()

const {getAllPokemons, addNewPokemon, getPokemonById, updatePokemonById, deletePokemonById} = require("../controllers/pokemon")
const { isAuth } = require("../middlewares")

PokemonRouter.get("/", getAllPokemons)
PokemonRouter.get("/:id", getPokemonById)
PokemonRouter.post("/", isAuth,  addNewPokemon)
PokemonRouter.put("/:id", updatePokemonById)
PokemonRouter.delete("/:id", deletePokemonById)

module.exports = PokemonRouter