import axios from "axios";
import { usePokemon } from "./PokemonContext";

// custom hook

export const useLoadAllPokemons = () => {
  const { setPokemon } = usePokemon();

  const loadAllPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((response) => {
        console.log("Response received:", response.data);
        return Promise.all(
          response.data.results.map((pokemon) => {
            return axios.get(pokemon.url);
          })
        );
      })
      .then((pokemonDetails) => {
        const detailedPokemons = pokemonDetails.map((detail) => detail.data);
        setPokemon(detailedPokemons);
        console.log("Detailed pokemons:", detailedPokemons);
      })
      .catch((error) => console.error(("error: ", error)));
  };
  return loadAllPokemons;
};
