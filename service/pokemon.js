const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemons() {
  const url = new URL(POKEMON_URL);
  url.searchParams.append("limit", 721);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getPokemonInfo(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
