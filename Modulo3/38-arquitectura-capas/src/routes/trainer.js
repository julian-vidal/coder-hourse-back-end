const express = require("express")
const TrainerRouter = express.Router()

const {addTrainer, getTrainerById, addPokemon} = require("../controllers/trainer")

TrainerRouter.post("/", addTrainer)
TrainerRouter.get("/:id", getTrainerById)
TrainerRouter.post("/:id/addPokemon", addPokemon)

module.exports = TrainerRouter