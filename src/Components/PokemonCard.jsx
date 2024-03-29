import React, { useEffect, useState } from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";
import { useLoadAllPokemons } from "./LoadAllPokemons";
import Loading from "./Loading";

const PokemonCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const loadAllPokemons = useLoadAllPokemons();
  const {
    pokemon,
    pokeDeck,
    addToDeck,
    shufflePokemon,
    activePokemon,
    handleCardClick,
    getTypeColor,
    getTypeIcon,
    getRandomDeck,
    isLoading,
  } = usePokemon();

  const handleSearchTerm = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filteredResults = pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPokemon(filteredResults);
    } else {
      setFilteredPokemon(pokemon);
    }
  };

  useEffect(() => {
    setFilteredPokemon(pokemon);
  }, [pokemon]);

  if (pokemon.length === 0 || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="POKEMONCARD w-full flex flex-col place-items-center">
        <div className="POKEMONCARDCONTROLS w-full grid grid-cols-2 max-w-xl gap-1 place-content-center text-white text-lg mb-8">
          <button
            onClick={shufflePokemon}
            className="bg-red-500 p-2 rounded-md shadow-xl"
          >
            Shuffle cards
          </button>
          <button
            onClick={getRandomDeck}
            className="bg-red-500 p-2 rounded-md shadow-xl"
          >
            Choose for me
          </button>
          {pokeDeck.length > 0 ? (
            <button className="bg-red-500 p-2 rounded-md shadow-xl w-full">
              <Link to={"/arena"}> Go To Arena</Link>
            </button>
          ) : (
            <button
              onClick={() =>
                alert("You must choose 6 pokemons or klick I don't want to.")
              }
              className="bg-red-500 p-2 rounded-md shadow-xl w-full"
            >
              Go to arena
            </button>
          )}

          <Link to="/">
            <button className="bg-red-500 p-2 rounded-md shadow-xl w-full">
              Back to meny
            </button>
          </Link>
          <button
            onClick={() => loadAllPokemons()}
            className="bg-red-500 p-2 rounded-md shadow-xl w-full col-span-2"
          >
            Load ALL pokemons
          </button>

          <input
            className="w-full col-span-2 p-2 border border-black rounded-md text-black"
            type="text"
            value={searchTerm}
            onChange={handleSearchTerm}
            placeholder="Search for Pokemons"
          />

          <div className="text-black col-span-2 w-full text-center">
            <h2>Currently showing {filteredPokemon.length} of 1302 Pokemons</h2>
          </div>
        </div>
        <div className="POKEMONCARDCARDS grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 2xl:text-sm gap-5 p-2 max-w-7xl w-full text-xs sm:text-base md:text-lg">
          {filteredPokemon.map((pokemon, index) => (
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
