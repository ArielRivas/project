
const containerPokemon = document.querySelector(".container-pokemon");
const allResults = [];
const colorsMap = {
	fire: '#f27059',
	grass: '#74c69d',
	electric: '#FFFF33',
	water: '#6495ED	',
	ground: '#cd9777',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#DA70D6',
	bug: '#90EE90	',
	dragon: '#97b3e6',
	psychic: '#D8BFD8',
	flying: '#bde0fe',
	fighting: '#E9967A',
	normal: '#F5F5F5'
};
const mainTypeColors = Object.keys(colorsMap);

const getPokes = async () => {
	for (let iD = 1; iD <= 151; iD++) {
		await getPokesFromApi(iD);
	}
};

const getPokesFromApi = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const value = await fetch(url);
	const pokemon = await value.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  flipCard.appendChild(cardContainer);

  
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("container-image");
  
  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(image);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const allTypes = document.createElement("p");
  name.classList.add("types");
  allTypes.textContent = pokemon.types.map(type => type.type.name);
  const type = mainTypeColors.find(type => allTypes.textContent.indexOf(type) > -1);
  const color = colorsMap[type];
	
card.style.backgroundColor = color;



  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(allTypes);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  cardBack.appendChild(progressBars(pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  containerPokemon.appendChild(flipCard);
  cardBack.style.backgroundColor = color;
}

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    
    progressBar.style.width = statPercent;
    progressBar.textContent = stat.base_stat;
    
    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);
    statsContainer.appendChild(statContainer);
    
  }

  return statsContainer;
}

document.getElementById("input").addEventListener("input", (event) => {
	const userInput = event.target.value.toLowerCase().trim();
	const filtered = allResults.filter(pokemon => {
		return pokemon.name.toLowerCase().includes(userInput);
	})
	createPokemonCard(filtered);
 });
getPokes();