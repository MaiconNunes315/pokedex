import "../styles/main.css"


type HomeProps = {
  name: string
  type: [{type:{name:string}}]
  image: string
  classType: string
}

export default function Home({ name, type, image, classType }:HomeProps) {

    



  return (
    <div className="container-main">

      <div className={`pokemons ${classType}`}>
              
          <h2 translate="no">{name}</h2>
              
          <div className='parts-pokemon'>
            
          <div className='type-pokemon' >
          
  
              {type.map((types, index) => (
                        <span translate='no' key={index}>{types.type.name}</span> 
              ))}
                       
            </div>  
              <img src={image} alt="pokemon"/>
        </div>
              
        </div>
                
    </div>
  )
}
