
const pokeApi = {}

function convertPokeApiDetailsToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const types = pokeDetail.types.map(typeSlot=> typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
    .then(res=> res.json())
    .then(convertPokeApiDetailsToPokemon)
}


pokeApi.getPokemons = (offset, limit) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then(res=>res.json())
    .then(jsonBody=> jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonsDetails => pokemonsDetails)
    .catch(error=>console.error(error))
}

