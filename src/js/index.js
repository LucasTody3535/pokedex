import { getPokemons } from "./api/api.js";
import { makePokemonCard } from "./construct/pokemon-card/pokemon.card.js";

document.getElementById("fetchMore")
    .addEventListener("click", () => {
        getPokemons(makePokemonCard);        
    });

getPokemons(makePokemonCard);
