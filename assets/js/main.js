function convertPokemonToLi(pokemon){
    console.log(pokemon)
    return `
        <li class="pokemon ${pokemon.type}">
            
            <h2 class="name">${pokemon.name}</h2>
        
            
            <div class="detail">
                <ol class="type">
                    ${pokemon.types.map(type =>`<li>${type}</li>`).join('')}
                </ol>
                <img class="photo" src=${pokemon.photo} alt=${pokemon.name}/>
            </div>

        </li>
    `
}

const pokemonList = document.getElementById('pokemonsList')

pokeApi.getPokemons().then((pokemons = []) =>{
    const newHTML = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML = newHTML
})