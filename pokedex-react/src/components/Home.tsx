import "../styles/main.css"

type HomeProps = {
  name: string
  types: []
  image:string
}

export default function Home({ name, types, image }:HomeProps) {

    



  return (
    <div className="container-main">

        <div className='pokemons'>
              
          <h2 translate="no">{name}</h2>
              
          <div className='parts-pokemon'>
            
            <div className='type-pokemon' >
  
              {types.map((typer: { type: { name: string } }, index: number) => (
                        <span translate='no' key={index}>{typer.type.name}</span> 
              ))}
                       
            </div>  
              <img src={image} alt="pokemon"/>
        </div>
              
        </div>

    </div>
  )
}
