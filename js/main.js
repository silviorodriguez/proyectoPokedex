const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}
document.getElementById("formulario").addEventListener("submit", buscar,);


function buscar(evt){
    evt.preventDefault();
    let cadenaBuscar = document.getElementById("busqueda").value;
  
  
   const aux = mostrarPokemon.filter((pokemonya)=>{
      return mostrarPokemon.name.toLowerCase().includes(cadenaBuscar.toLowerCase())
      
      
    });
    
    mostrarPokemon(poke)
  
  
  
  
  }

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${poke.sprites.other["official-artwork"].front_default}"  class="card-img-top" alt="Pokemon">
    <div class="card-body">
      <center><h2 class="card-title">${poke.name}</h2></center>
      <center><p class="card-text">${pokeId}</p></center>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${tipos}</li>
      <center><li class="list-group-item">Height: <h2> ${poke.height}</h2></li>
      <li class="list-group-item"> Weight: <h2>${poke.weight}<h2> </li> </center>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))