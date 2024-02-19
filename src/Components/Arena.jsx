import React, { useMemo } from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";

const Arena = () => {
  const { pokeDeck, botDeck, getTypeColor, getTypeIcon } = usePokemon();

  // pokeDeck stats
  const totalPokeDeckStats = useMemo(() => {
    return pokeDeck.reduce((totals, pokemon) => {
      pokemon.stats.forEach((stat) => {
        totals[stat.stat.name] = (totals[stat.stat.name] || 0) + stat.base_stat;
      });
      return totals;
    }, {});
  }, [pokeDeck]);

  // BOTDeck stats
  const totalBotDeckStats = useMemo(() => {
    return botDeck.reduce((totals, pokemon) => {
      pokemon.stats.forEach((stat) => {
        totals[stat.stat.name] = (totals[stat.stat.name] || 0) + stat.base_stat;
      });
      return totals;
    }, {});
  }, [botDeck]);

  return (
    <div className="ARENA w-full flex flex-col place-items-left">
      <div className="CONTROLS">
        <Link to={"/main"}>
          <button className="bg-red-500 p-2 rounded-md shadow-xl">
            Back To Deck
          </button>
        </Link>
      </div>
      <div className="YOUR-DECK max-w-7xl">
        <div className="TOTAL-STATS">
          <h1 className="font-bold text-xl text-center">YOUR DECK</h1>
          <h2>Your Deck Total Stats:</h2>
          <p>Defense: {totalPokeDeckStats.defense}</p>
          <p>Attack: {totalPokeDeckStats.attack}</p>
          <p>HP: {totalPokeDeckStats.hp}</p>
        </div>
        <div className="DECK grid grid-cols-5 gap-5 p-2">
          {pokeDeck.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}`}
            >
              <div className="flex flex-row justify-evenly w-full place-items-center">
                <h2 className="text-lg font-bold">
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
      <div className="FIGHT">
        <div>
          <button className="bg-red-500 p-2 rounded-md shadow-xl">
            ATTACK
          </button>
        </div>
      </div>
      <div className="BOT-DECK max-w-7xl">
        <div className="TOTAL-STATS">
          <h1 className="font-bold text-xl text-center">BOT DECK</h1>
          <h2>BOT Deck Total Stats:</h2>
          <p>Defense: {totalBotDeckStats.defense}</p>
          <p>Attack: {totalBotDeckStats.attack}</p>
          <p>HP: {totalBotDeckStats.hp}</p>
        </div>
        <div className="DECK grid grid-cols-5 gap-5 p-2">
          {botDeck.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}`}
            >
              <div className="flex flex-row justify-evenly w-full place-items-center">
                <h2 className="text-lg font-bold">
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
