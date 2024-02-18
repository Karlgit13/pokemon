import React from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";

const PokemonCard = () => {
  const {
    pokemon,
    typeToColor,
    typeToPng,
    addToDeck,
    shufflePokemon,
    activePokemon,
    handleCardClick,
    getTypeColor,
    getTypeIcon,
  } = usePokemon();

  if (pokemon.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="APP">
        <div className="CONTROLS w-full flex flex-row gap-2 place-content-center text-white text-lg">
          <button
            onClick={shufflePokemon}
            className="bg-red-500 p-2 rounded-md"
          >
            Shuffle Cards
          </button>
          <Link to="/">
            <button className="bg-red-500 p-2 rounded-md">Back To Meny</button>
          </Link>
          <Link to={"/arena"}>
            <button className="bg-red-500 p-2 rounded-md">Go To Arena</button>
          </Link>
        </div>
        <div className="CARDS grid grid-cols-4 gap-5 p-2">
          {pokemon.map((pokemon, index) => (
            <div
              key={index}
              className={`flex flex-col place-items-center p-2 border border-black rounded-sm
            ${getTypeColor(pokemon.types)}
            ${activePokemon === index ? "z-10 scale-110 shadow-lg" : ""}`}
              onClick={() => handleCardClick(index)}
              style={{ transition: "transform 0.3s ease" }}
            >
              <div className="flex flex-row justify-evenly w-full place-items-center">
                <h2 className="text-2xl">{pokemon.name.toUpperCase()}</h2>
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
              <p>
                Abilities:{" "}
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>Height: {pokemon.height / 10} m</p>
              <div className="statsDiv">
                <h2>Stats</h2>
                <ul>
                  <li>
                    {pokemon.stats[0].stat.name} - {pokemon.stats[0].base_stat}
                  </li>
                  <li>
                    {pokemon.stats[1].stat.name} - {pokemon.stats[1].base_stat}
                  </li>
                  <li>
                    {pokemon.stats[2].stat.name} - {pokemon.stats[2].base_stat}
                  </li>
                </ul>
              </div>
              <button
                onClick={() => addToDeck(pokemon)}
                className="bg-blue-400 p-2"
              >
                Choose
              </button>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default PokemonCard;
