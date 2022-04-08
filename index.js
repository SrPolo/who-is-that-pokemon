import { getPokemons, getPokemonInfo } from "./service/pokemon.js";
import { getRandomPokemon } from "./utils/utils.js";

const opciones = document.querySelectorAll(".option");
const pokemonImageElement = document.getElementById("pokemon-image");
const pokemonNameElement = document.getElementById("pokemon-name");
const scoreElement = document.getElementById("score");

let pokemonName = "";
let score = 0;

function checkOption(event) {
  if (event.target.value === pokemonName) {
    pokemonNameElement.classList.remove("oculto");
    score++;
    scoreElement.innerText = score;
  } else {
    console.log("Intenta otra vez");
  }
}

async function setGame(pokemonOptions, pokemonToGuess) {
  pokemonNameElement.innerText = pokemonToGuess.name;
  pokemonName = pokemonToGuess.name;
  const pokemon = await getPokemonInfo(pokemonToGuess.url);
  pokemonImageElement.src =
    pokemon.sprites.other["official-artwork"].front_default;
  opciones.forEach((button, key) => {
    button.innerHTML = pokemonOptions[key].name;
    button.value = pokemonOptions[key].name;
    button.addEventListener("click", checkOption);
  });
}

async function newGame() {
  const { results: pokemonList } = await getPokemons();
  const pokemonOptions = getRandomPokemon(pokemonList, 4);
  const [pokemonToGuess] = getRandomPokemon(pokemonOptions, 1);
  setGame(pokemonOptions, pokemonToGuess);
}

newGame();
