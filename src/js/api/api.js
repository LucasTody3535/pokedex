const ls = window.localStorage;
const fetchData = {
    method: "GET",
    cache: "force-cache",
    mode: "cors"
};
let url = "https://pokeapi.co/api/v2/pokemon/?limit=20";

function filter(value, mainUrl) {
    let model = {
        art: value.sprites.other["official-artwork"].front_default,
        types: value.types,
        url: mainUrl,
        abilities: value.abilities,
        moves: value.moves.slice(0, 5),
        name: value.name
    };
    return model;
}

export async function requestData(value, callback) {
    await fetch(value.url, fetchData)
        .then((data) => {
            data.json()
                .then(jsonfiedData => {
                    let d = filter(jsonfiedData, value.url);
                    callback(d);
                });
        });
}

// Requisição
export async function getPokemons(callback) {
    fetch(url, fetchData).then((res) => {
            res.json().then(async data => {
                const pokemons = data.results;
                url = data.next;
                for(let pokemon of pokemons) {
                    await requestData(pokemon, callback);
                } 
            });
    });
}
