import React from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";
import { useLoadAllPokemons } from "./LoadAllPokemons";

const PokemonCard = () => {
  const loadAllPokemons = useLoadAllPokemons();
  const {
    pokemon,
    addToDeck,
    shufflePokemon,
    activePokemon,
    handleCardClick,
    getTypeColor,
    getTypeIcon,
    getRandomDeck,
  } = usePokemon();

  if (pokemon.length === 0) {
    return (
      <div className="flex w-screen h-screen justify-center place-items-center">
        <div className="text-lg font-semibold text-gray-500 flex flex-row">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="POKEMONCARD w-full flex flex-col place-items-center">
        <div className="POKEMONCARDCONTROLS w-full grid grid-cols-2 max-w-xl gap-1 place-content-center text-white text-lg mb-8">
          <button
            onClick={shufflePokemon}
            className="bg-red-500 p-2 rounded-md shadow-xl"
          >
            Shuffle Cards
          </button>
          <button
            onClick={getRandomDeck}
            className="bg-red-500 p-2 rounded-md shadow-xl"
          >
            I don't want to
          </button>
          <Link to={"/arena"}>
            <button className="bg-red-500 p-2 rounded-md shadow-xl w-full">
              Go To Arena
            </button>
          </Link>
          <Link to="/">
            <button className="bg-red-500 p-2 rounded-md shadow-xl w-full">
              Back To Meny
            </button>
          </Link>
          <button
            onClick={() => loadAllPokemons()}
            className="bg-red-500 p-2 rounded-md shadow-xl w-full col-span-2"
          >
            Load all 1302 Pokemons
          </button>
          <div className="text-black col-span-2 w-full text-center">
            <h2>Currently showing </h2>
          </div>
        </div>
        <div className="POKEMONCARDCARDS grid grid-cols-2 md:grid-cols-4 gap-5 p-2 max-w-5xl w-full text-xs sm:text-base md:text-lg">
          {pokemon.map((pokemon, index) => (
            <div
              key={index}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}
            ${activePokemon === index ? "z-10 scale-100 shadow-lg" : ""}`}
              onClick={() => handleCardClick(index)}
              style={{ transition: "transform 0.3s ease" }}
            >
              <div className="flex flex-row justify-evenly w-full place-items-center">
                <h2 className=" font-bold">{pokemon.name.toUpperCase()}</h2>
                <img
                  className="w-11"
                  src={getTypeIcon(pokemon.types)}
                  alt={pokemon.types[0].type.name}
                />
              </div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full"
              />
              <div className="STATS grid grid-cols-3 w-full place-items-center -mt-2 font-bold">
                <div>{pokemon.stats[2].stat.name}</div>
                <div>{pokemon.stats[1].stat.name}</div>
                <div>{pokemon.stats[0].stat.name}</div>
                <div>{pokemon.stats[2].base_stat}</div>
                <div>{pokemon.stats[1].base_stat}</div>
                <div>{pokemon.stats[0].base_stat}</div>
              </div>
              <div className="flex flex-col place-items-center w-full font-bold">
                <h2>Abilities: </h2>
                {pokemon.abilities.map((ability, index) => (
                  <div key={index} className="font-bold">
                    {ability.ability.name}
                  </div>
                ))}
              </div>
              <p className="font-bold">Weight: {pokemon.weight / 10} kg</p>
              <p className="font-bold">Height: {pokemon.height / 10} m</p>
              <div className="mt-9">
                <button
                  onClick={() => addToDeck(pokemon)}
                  className="bg-black p-2 absolute bottom-0 right-0 left-0 mt-20 text-white font-bold"
                >
                  Choose
                </button>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default PokemonCard;
