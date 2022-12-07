const Container = require("../database/utils/contenedor-archivo")
const container = new Container(__dirname + "/../database/pokemon.json")

const parseId = Id => {
    if(Id < 10) {
        return `00${Id}`
    } else if (Id <100){
        return `0${Id}`
    } else if(Id < 1000) {
        return Id
    } else {
        return ""
    }
}

class PokemonService {
    static readAll(){
        return container.getAll();
    }

    static getById(id){
        return container.getById(id)
    }

    static save(pokemon){
        pokemon.image = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${parseId(pokemon.id)}.png`;
        container.save(pokemon) 
        return pokemon
    }

    static updateById(id, pokemon){
        return container.updateById(id, pokemon)   
    }

    static deleteById(id){
        return container.deleteById(id)
    }
}

module.exports = PokemonService