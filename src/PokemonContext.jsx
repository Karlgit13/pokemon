import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// skapar pokemon context
const PokemonContext = createContext();

// exporterar pokemon contexten som usePokemon för att hämta den från
// andra komponenter enkelt med const { pokemon } = usePokemon();
export const usePokemon = () => useContext(PokemonContext);

// provider funktion
export const PokemonProvider = ({ children }) => {
  // state för lagra pokemons i array
  const [pokemon, setPokemon] = useState([]);

  // objekt med färger för bakgrund beroende vilken typ
  const typeToColor = {
    normal: "bg-gray-300",
    fire: "bg-red-300",
    water: "bg-blue-300",
    electric: "bg-yellow-300",
    grass: "bg-green-300",
    ice: "bg-blue-200",
    fighting: "bg-red-400",
    poison: "bg-purple-400",
    ground: "bg-yellow-400",
    flying: "bg-indigo-300",
    psychic: "bg-pink-300",
    bug: "bg-lime-300",
    rock: "bg-yellow-400",
    ghost: "bg-purple-400",
    dragon: "bg-indigo-400",
    dark: "bg-gray-400",
    steel: "bg-gray-300",
    fairy: "bg-pink-300",
  };

  // hämta pokemon med api
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((response) => {
        // hämta detaljer för varje pokemon
        return Promise.all(
          response.data.results.map((pokemon) => {
            return axios.get(pokemon.url);
          })
        );
      })
      .then((pokemonDetails) => {
        // skapa detaljerad lista för varje pokemon
        const detailedPokemons = pokemonDetails.map((detail) => detail.data);
        setPokemon(detailedPokemons);
        console.log(detailedPokemons);
      })
      .catch((error) => console.error(("error: ", error)));
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, typeToColor }}>
      {children}
    </PokemonContext.Provider>
  );
};