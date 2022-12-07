const Container = require("../database/utils/contenedor-archivo")
const container = new Container(__dirname + "/../database/trainer.json")
const pokemonContainer = new Container(__dirname + "/../database/pokemon.json")

class TrainerService {
    static save(trainer){
        return container.save(trainer)
    }

    static getTrainerById(id) {
        const trainer = container.getById(id)

        
        const pokemons = trainer.pokemon.map(pokemonId => pokemonContainer.getById(pokemonId))
        trainer.pokemon = pokemons
        return trainer
    }

    static addPokemon(id, pokemonId){
        const trainer = container.getById(id)
        trainer.pokemon = [...trainer.pokemon, pokemonId]
        const _result = container.updateById(id, trainer)
        return _result
    }
}

module.exports = TrainerService