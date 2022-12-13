const express = require("express")
const TrainerRouter = express.Router()
const {isAuth} = require("../middlewares")

const {addTrainer, getTrainerById, addPokemon} = require("../controllers/trainer")

TrainerRouter.post("/", isAuth, addTrainer)
TrainerRouter.get("/:id", getTrainerById)
TrainerRouter.post("/:id/addPokemon", isAuth, addPokemon)

module.exports = TrainerRouter