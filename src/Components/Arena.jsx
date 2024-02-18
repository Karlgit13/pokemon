import React from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";

const Arena = () => {
  const { pokeDeck, botDeck, getTypeColor, getTypeIcon } = usePokemon();

  return (
    <div className="ARENA">
      <div className="CONTROLS">
        <Link to={"/main"}>
          <button>Back To Deck</button>
        </Link>
      </div>
      <div className="COMPUTER-DECK">
        <div className="DECK grid grid-cols-5 gap-5 p-2">
          {pokeDeck.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}`}
            >
              <div className="flex flex-row justify-evenly w-full place-items-center">
                <h2 className="text-xl font-bold">
                  {pokemon.name.toUpperCase()}
                </h2>
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
              <div className="statsDiv grid grid-cols-3 w-full place-items-center text-lg -mt-2 font-bold">
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
            </div>
          ))}
        </div>
      </div>
      <div className="YOUR-DECK">
      <div className="DECK grid grid-cols-5 gap-5 p-2">
          {botDeck.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}`}
            >
              <div className="flex flex-row justify-evenly w-full place-items-center">
                <h2 className="text-xl font-bold">
                  {pokemon.name.toUpperCase()}
                </h2>
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
              <div className="statsDiv grid grid-cols-3 w-full place-items-center text-lg -mt-2 font-bold">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arena;
