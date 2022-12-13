import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [pokemons, setPokemons] = useState([])

  const getAllPokemons = async() => {
    const url = "http://localhost:8080/pokemon"
    const config = {
      url,
      method: "get"
    }

    const res = await axios(config)
    setPokemons(res.data)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className="App">
      <h1>Pokemon list</h1>
      <ul className='pokemonList'>
        {pokemons.map(pokemon => (
          <li>
            <ul>
              <li> Name: {pokemon.name} </li>
              <li> HP: {pokemon.HP} </li>
              <li> Type: {pokemon.type} </li>
              <li> Image: {pokemon.image} </li>
            </ul>
          </li > 
        ))}
      </ul>
    </div>
  )
}

export default App
