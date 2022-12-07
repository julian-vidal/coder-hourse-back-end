const TrainerService = require("../services/trainer")

const addTrainer = (req,res) => {
    const {name, age, city} = req.body

    if(!name || !age || !city){
        res.status(400).json({
            message: "name, age, and city are required"
        })
        return
    }
    const _result = TrainerService.save({name, age, city})
    res.json(_result)
}

const getTrainerById = (req,res) => {
    const {id} = req.params
    if(!id) {
        res.status(400).json({message: "Invalid ID"})
        return
    }
    const _result = TrainerService.getTrainerById(id)
    res.json(_result)
}

const addPokemon = (req,res) => {
    const {id} = req.params
    const {pokemonId} = req.body

    if(!id) {
        res.status(400).json({message: "Invalid trainer ID"})
        return
    }

    if(!pokemonId) {
        res.status(400).json({message: "Invalid pokemon ID"})
        return
    }
    const _result = TrainerService.addPokemon(id, pokemonId)
    res.json(_result)
}

module.exports = {
    addTrainer,
    getTrainerById,
    addPokemon
}