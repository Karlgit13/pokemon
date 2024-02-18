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
  // state lagra uhm deck över komponenter
  const [pokeDeck, setPokeDeck] = useState([]);
  // state bot deck
  const [botDeck, setBotDeck] = useState([]);

  const [activePokemon, setActivePokemon] = useState(null);

  const handleCardClick = (index) => {
    setActivePokemon(index === activePokemon ? null : index);
  };

  const getTypeColor = (types) => {
    const primaryType = types[0].type.name;
    return typeToColor[primaryType] || "bg-gray-300";
  };

  const getTypeIcon = (types) => {
    const icon = types[0].type.name;
    return typeToPng[icon] || null;
  };

  // lagra pokemon i state
  const addToDeck = (pokemon) => {
    setPokeDeck((currentDeck) => {
      return currentDeck.find((poke) => poke.id === pokemon.id)
        ? currentDeck
        : [...currentDeck, pokemon];
    });
  };

  useEffect(() => {
    const createBotDeck = () => {
      const shuffledPokemon = shuffleArray([...pokemon]);
      const selectedForBot = shuffledPokemon.slice(0, 5);
      setBotDeck(selectedForBot);
    };

    if (pokemon.length > 0) {
      createBotDeck();
    }
  }, [pokemon]);

  // shuffle funktion
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
    }
    return array;
  };

  const shufflePokemon = () => {
    setPokemon((prevPokemon) => [...shuffleArray(prevPokemon)]);
  };

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

  const typeToPng = {
    normal: require("../assets/normal.png"),
    fire: require("../assets/fire.png"),
    water: require("../assets/water.png"),
    electric: require("../assets/electric.png"),
    grass: require("../assets/grass.png"),
    ice: require("../assets/ice.png"),
    fighting: require("../assets/fighting.png"),
    poison: require("../assets/poison.png"),
    ground: require("../assets/ground.png"),
    flying: require("../assets/flying.png"),
    psychic: require("../assets/psychic.png"),
    bug: require("../assets/bug.png"),
    rock: require("../assets/rock.png"),
    ghost: require("../assets/ghost.png"),
    dragon: require("../assets/dragon.png"),
    dark: require("../assets/dark.png"),
    steel: require("../assets/steel.png"),
    fairy: require("../assets/fairy.png"),
  };

  // hämta pokemon med api
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
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
    <PokemonContext.Provider
      value={{
        pokemon,
        typeToColor,
        typeToPng,
        shufflePokemon,
        pokeDeck,
        addToDeck,
        botDeck,
        activePokemon,
        handleCardClick,
        getTypeColor,
        getTypeIcon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
