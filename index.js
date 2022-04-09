import { getPokemons, getPokemonInfo } from "./service/pokemon.js";
import { getRandomPokemon } from "./utils/utils.js";

const opciones = document.querySelectorAll(".option");
const pokemonImageElement = document.getElementById("pokemon-image");
const pokemonNameElement = document.getElementById("pokemon-name");
const scoreElement = document.getElementById("score");

let success = new Audio("../assets/success-sound.mp3");
let wrong = new Audio("../assets/wrong-sound.mp3");

let pokemonName = "";
let score = 0;
let pokemonList = [];
let pokemonOptions = [];
let pokemonToGuess = {};

function checkOption(event) {
  if (event.target.value === pokemonName) {
    success.play();
    pokemonNameElement.classList.remove("oculto");
    pokemonImageElement.classList.remove("hide-pokemon");
    score++;
    scoreElement.innerText = score;
    opciones.forEach((button, key) => {
      button.disabled = true;
    });
    setTimeout(() => {
      newGame();
    }, 2000);
  } else {
    wrong.play();
    pokemonImageElement.classList.add("wrong-answer");
    setTimeout(() => {
      pokemonImageElement.classList.remove("wrong-answer");
    }, 700);
  }
}

async function newGame() {
  pokemonOptions = getRandomPokemon(pokemonList, 4);
  [pokemonToGuess] = getRandomPokemon(pokemonOptions, 1);
  const pokemon = await getPokemonInfo(pokemonToGuess.url);

  pokemonName = pokemonToGuess.name;
  pokemonNameElement.classList.add("oculto");
  pokemonImageElement.classList.add("hide-pokemon");
  pokemonNameElement.innerText = pokemonName;
  pokemonImageElement.src =
    pokemon.sprites.other["official-artwork"].front_default;

  opciones.forEach((button, key) => {
    button.innerHTML = pokemonOptions[key].name;
    button.value = pokemonOptions[key].name;
    button.disabled = false;
    button.addEventListener("click", checkOption);
  });
}

async function fetchData() {
  const { results } = await getPokemons();
  pokemonList = results;
  newGame();
}

fetchData();
