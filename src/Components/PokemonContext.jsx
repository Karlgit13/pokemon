import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// create and use Context
const PokemonContext = createContext();
export const usePokemon = () => useContext(PokemonContext);

// provider function
export const PokemonProvider = ({ children }) => {
  // states
  const [pokemon, setPokemon] = useState([]);
  const [pokeDeck, setPokeDeck] = useState([]);
  const [botDeck, setBotDeck] = useState([]);
  const [activePokemon, setActivePokemon] = useState(null);

  // functions

  const getRandomDeck = () => {
    const shuffledArray = shuffleArray([...pokemon]);
    const sixRandomPokes = shuffledArray.slice(0, 6);
    setPokeDeck(sixRandomPokes);
  };

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

  const addToDeck = (pokemon) => {
    if (pokeDeck.length < 6) {
      setPokeDeck((currentDeck) => {
        return currentDeck.find((poke) => poke.id === pokemon.id)
          ? currentDeck
          : [...currentDeck, pokemon];
      });
    } else {
      alert("You have already selected 6 pokemons!");
    }
  };

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

  // objects
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

  // effects
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
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
        console.log("Detailed pokemons:", detailedPokemons);
      })
      .catch((error) => console.error(("error: ", error)));
  }, []);

  useEffect(() => {
    const createBotDeck = () => {
      const shuffledPokemon = shuffleArray([...pokemon]);
      const selectedForBot = shuffledPokemon.slice(0, 6);
      setBotDeck(selectedForBot);
    };

    if (pokemon.length > 0) {
      createBotDeck();
    }
  }, [pokemon]);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
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
        getRandomDeck,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
