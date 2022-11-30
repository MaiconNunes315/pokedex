import { useState, useEffect, useMemo } from 'react'
import Home from './components/Home'
import "./styles/app.css"
import axios from 'axios'
import loading from './img/loading.svg'

type PokemonType = {
  url:string
}

type PokemonDetailType = {
  name: string
  id: number
  photo: string
  types: [{type:{name:string}}]
}


function App() {

  const [pokemon, setPokemon] = useState<PokemonType[]>([])
  const [ pokemonDetail, setPokemonDetail] = useState<PokemonDetailType[]>([])
  const [isLoad, setIsLoad] = useState(false) 
  const [offsetState, setOffsetState] = useState(0)

  useEffect(() => {

    
    async function returnPokemons() {

      let pokemonDetail:PokemonDetailType[] = []

      const searchPokemonList = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offsetState}&limit=${30}`)
      const resultPokemonList = searchPokemonList.data

      setPokemon(resultPokemonList.results)
      
      const searchDetailPokemon = pokemon.map(async pokemonDetail => {
        const searchDataPokemonDetail = await axios.get(pokemonDetail.url)
        const resDataPokemonDetail = searchDataPokemonDetail.data
        return resDataPokemonDetail
      })

      Promise.all(searchDetailPokemon).then(res => {
        
        res.forEach(element => {

          let pokemonData: PokemonDetailType = {
            name: element.name,
            id: element.id,
            photo: element.sprites.other.home.front_default,
            types: element.types
          }

          pokemonDetail.push(pokemonData)

        })

        setPokemonDetail(pokemonDetail)
        setIsLoad(true)
        
      })    
    }

      returnPokemons() 

    
  }, [isLoad, offsetState])
  
  function increment() {
    setIsLoad(false)
    setOffsetState(offsetState + 30)
  }

  function decrement() {
    setIsLoad(false)
    setOffsetState(offsetState - 30) 
  }


  return (

        <div className="app">
        <h1>Pokedex</h1>

      

      {isLoad ? (
        <div className={`container-pokemon`}>

          {pokemonDetail.map((pokemon, index) => (
          
            <Home key={pokemon.id} name={pokemon.name} type={pokemon.types} image={pokemon.photo} classType={pokemon.types[0].type.name} />
      
         
          ))}
        </div> 
      )
      :
      (
        <div className='spinner'></div>
      )
       }  
      
      
      <div>

        <button disabled={offsetState===0?true:false} onClick={decrement} className="button left">
          Anterior
        </button>

        <button onClick={increment} className="button right">
          Próximo
        </button>
      </div>
        </div>
        
  )
        

}

export default App
