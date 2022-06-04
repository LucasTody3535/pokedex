const list = document.getElementById("pokelist");
const info = document.getElementById("pokemonInfo");

const colors = {
    poison: '#781892',
    grass: '#9bcc50',
    fire: '#fd7d24',
    flying: '#40bce2e8',
    water: '#002df5',
    bug: '#01830c',
    normal: '#6e401afa',
    electric: '#ffff00e3',
    ground: '#462306',
    fairy: '#942f76',
    fighting: '#d3671f',
    psychic: '#b700ffcb',
    rock: '#ff9900',
    steel: '#646464',
    ice: '#00eeffd7',
    ghost: '#8c00ffcb',
    dragon: '#d61010'
};

function setupPokemonGradientByType(types, container) {
    let listOfColors = [];

    if(types.length > 1) {
        for(let t of types) {
            let type = t.type.name;
            if(colors[type]) listOfColors.push(colors[type]);
        }
        container.style.background = `linear-gradient(to right, ${listOfColors.toString()})`;
    } else {
        let type = types[0].type.name;
        container.style.backgroundColor = colors[type];
    }
}

function setupDetailedInfo(pokemon) {
    info.innerHTML = "";
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    img.src = pokemon.art;
    figcaption.innerText = pokemon.name;

    figure.append(img, figcaption);

    let details = document.createElement("details");
    let sum = document.createElement("summary");
    let ul = document.createElement("ul");
    let item;

    details.id = "types";
    sum.innerText = "Types";

    for(let type of pokemon.types) {
        item = document.createElement("li");
        item.innerText = type.type.name;
        ul.appendChild(item);
    }
    details.append(sum, ul);
    info.append(figure, details)

    //----------------------------------------------------------
    
    details = document.createElement("details");
    sum = document.createElement("summary");
    
    details.id = "moves";
    sum.innerText = "Moves";

    ul = document.createElement("ul");

    for(let move of pokemon.moves) {
        item = document.createElement("li");
        item.innerText = move.move.name;
        ul.appendChild(item);
    }
    details.append(sum, ul);
    info.append(details)

    //----------------------------------------------------------

    details = document.createElement("details");
    sum = document.createElement("summary");

    details.id = "abilities";
    sum.innerText = "Abilities";

    ul = document.createElement("ul");

    for(let ability of pokemon.abilities) {
        item = document.createElement("li");
        item.innerText = ability.ability.name;
        ul.appendChild(item);
    }
    details.append(sum, ul);
    info.append(details)
}

function makePokemonDOMElement( { art, types, moves, abilities, name } ) {
    let div = document.createElement("div");
    let figureContainer = document.createElement("figure");
    let image = document.createElement("img");

    div.classList.add("poke-card");
    figureContainer.classList.add("poke-img");

    setupPokemonGradientByType(types, div);

    let pokemon = {
        types: types,
        moves: moves,
        abilities: abilities,
        name: name,
        art: art
    };

    div.addEventListener("click", () => {
        setupDetailedInfo(pokemon);
    });

    image.src = art;

    figureContainer.appendChild(image);
    div.appendChild(figureContainer);

    list.appendChild(div);
}

function makeInfoDOMElement(pokemon) {

}

export function makePokemonCard(pokemon) {
    makePokemonDOMElement(pokemon);
}