const PokemonService = require("../services/pokemon")

const getAllPokemons = (req,res) => {
    const _result = PokemonService.readAll()
    res.json(_result)
}

const getPokemonById = (req,res) => {
    const {id} = req.params
    
    if (!id) {
        res.status(400).json({message: "ID is required"})
        return
    }

    const _result = PokemonService.getById(id)

    if(!_result){
        res.status(404).json({"message": "Invalid ID"})
    }
    res.json(_result)
}


const addNewPokemon = (req,res) => {
    const {id, name, HP = 10, type="Normal"} = req.body

    if (!id || !name) {
        res.status(400).json({
                message: "Name and ID are required"
        })
        return
    }
    const _result = PokemonService.save({id, name, type, HP})
    res.json(_result)
}

const updatePokemonById = (req,res) => {
    const {id} = req.params
    const {name, HP = 10, type="Normal"} = req.body
    
    if (!id) {
        res.status(400).json({message: "ID is required"})
        return
    }

    const _result = PokemonService.updateById(id, {name, HP, type})
    res.json(_result)
}

const deletePokemonById = (req,res) => {
    const {id} = req.params
    
    if (!id) {
        res.status(400).json({message: "ID is required"})
        return
    }

    const _result = PokemonService.deleteById(id)
    res.json(_result)
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    addNewPokemon,
    updatePokemonById,
    deletePokemonById
}