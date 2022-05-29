let allResults = [];
const containerPokemon = document.querySelector(".container-pokemon");
const buttonsType = document.querySelector(".types__selector");

const colorsMap = {
  fire: "#f27059",
  grass: "#74c69d",
  electric: "#FFFF33",
  water: "#6495ED	",
  ground: "#cd9777",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#DA70D6",
  bug: "#90EE90	",
  dragon: "#97b3e6",
  psychic: "#D8BFD8",
  flying: "#bde0fe",
  fighting: "#E9967A",
  normal: "#F5F5F5",
  ice: "##70d6ff",
  ghost: "9381ff",
};
const mainTypeColors = Object.keys(colorsMap);

const getPokes = async () => {
  for (let id = 1; id <= 151; id++) {
    await getPokesFromApi(id);
  }
  console.log(allResults);
  createPokemonCard(allResults);
};

const getPokesFromApi = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const value = await fetch(url);
  const pokemon = await value.json();

  allResults.push(pokemon);
};

const createPokemonCard = (pokemonPaint) => {
  const pokidex = document.querySelector(".container-pokemon");
  pokidex.innerHTML = ``;

  pokemonPaint.forEach((pokemon) => {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    containerPokemon.appendChild(flipCard);

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");
    cardContainer.appendChild(card);

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("container-image");
    card.appendChild(spriteContainer);

    const image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(image);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    card.appendChild(number);

    const name = document.createElement("h2");
    name.classList.add("name");
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    card.appendChild(name);

    const allTypes = document.createElement("p");
    allTypes.classList.add("types");
    allTypes.textContent = pokemon.types.map((type) => type.type.name).join(", ");
    const type = mainTypeColors.find((type) => allTypes.textContent.indexOf(type) > -1);
    const color = colorsMap[type];
    card.appendChild(allTypes);

    card.style.backgroundColor = color;

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardContainer.appendChild(cardBack);

    const spriteContainerBack = document.createElement("div");
    spriteContainerBack.classList.add("container-image-back");
    cardBack.appendChild(spriteContainerBack);

    const imageBack = document.createElement("img");
    imageBack.src = pokemon.sprites.back_default;
    cardBack.appendChild(imageBack);

    const textBack = document.createElement("p");
    textBack.classList.add("container-text-back");
    textBack.textContent = "Weight: " + pokemon.weight;
    cardBack.appendChild(textBack);

    const textSkills = document.createElement("p");
    textSkills.classList.add("container-text-back--stats");
    textSkills.textContent = pokemon.abilities.map((abilities) => abilities.ability.name).join(", ");
    cardBack.appendChild(textSkills);

    cardBack.style.backgroundColor = color;
  });
};

const filterPokemon = (event) => {
  const userInput = event.target.value.toLowerCase().trim();
  const filtered = allResults.filter((pokemon) => {
    const matchId = pokemon.id === Number(userInput);
    const matchName = pokemon.name.toLowerCase().includes(userInput);
    return matchId || matchName;
    
  });
createPokemonCard(filtered);
};

document.querySelectorAll(".types__selector").forEach((button) => {
  button.addEventListener("click", (event) => {
    filterPokemonsByType(event.target.classList[1]);
  });
});

document.getElementById("search-input").addEventListener("input", (event) => {
  filterPokemon(event);
});

const filterPokemonsByType = (type) => {
  if (type === "all") {
    return createPokemonCard(allResults);
  }

  const filteredByType = allResults.filter((pokemon) => {
    let matchFirstType = false;
    let matchSecondType = false;

    if (pokemon.types[1]) {
      matchSecondType = pokemon.types[1].type.name === type;
    }

    if (pokemon.types[0]) {
      matchFirstType = pokemon.types[0].type.name === type;
    }

    return matchFirstType || matchSecondType;
  });
  createPokemonCard(filteredByType);
};

getPokes();

