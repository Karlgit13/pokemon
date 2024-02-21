import React, { useEffect, useMemo, useState } from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";
import Fight from "./Fight";

const Arena = () => {
  const { pokeDeck, botDeck, getTypeColor, getTypeIcon } = usePokemon();
  const [playerHealth, setPlayerHealth] = useState(500);
  const [botHealth, setBotHealth] = useState(500);

  useEffect(() => {
    const scrollToFightSection = () => {
      const fightSection = document.querySelector(".FIGHT");
      if (fightSection) {
        fightSection.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToFightSection();
  }, []);

  // pokeDeck stats
  const totalPokeDeckStats = useMemo(() => {
    return pokeDeck.reduce((totals, pokemon) => {
      pokemon.stats.forEach((stat) => {
        const statName = stat.stat.name;
        totals[statName] = (totals[statName] || 0) + stat.base_stat;
      });
      return totals;
    }, {});
  }, [pokeDeck]);

  useEffect(() => {
    setPlayerHealth(500 + (totalPokeDeckStats.hp || 0));
  }, [totalPokeDeckStats.hp]);

  // BOTDeck stats
  const totalBotDeckStats = useMemo(() => {
    return botDeck.reduce((totals, pokemon) => {
      pokemon.stats.forEach((stat) => {
        totals[stat.stat.name] = (totals[stat.stat.name] || 0) + stat.base_stat;
      });
      return totals;
    }, {});
  }, [botDeck]);

  useEffect(() => {
    setBotHealth(500 + (totalBotDeckStats.hp || 0));
  }, [totalBotDeckStats.hp]);

  return (
    <div className="ARENA w-full flex flex-col place-items-left text-xs sm:text-base md:text-xl">
      <div className="ARENA-CONTROLS">
        <Link to={"/main"}>
          <button className="bg-red-500 p-2 rounded-md shadow-xl">
            Back To Deck
          </button>
        </Link>
      </div>
      {/* player deck */}
      <div className="PLAYER-DECK  flex flex-col w-full place-items-center">
        <div className="DECK grid grid-cols-2 md:grid-cols-3 gap-5 p-2 max-w-7xl">
          {pokeDeck.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}`}
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
              <div className="statsDiv grid grid-cols-3 w-full place-items-center -mt-2 font-bold">
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

      <Fight
        playerHealth={playerHealth}
        setPlayerHealth={setPlayerHealth}
        botHealth={botHealth}
        setBotHealth={setBotHealth}
        totalPokeDeckStats={totalPokeDeckStats}
        totalBotDeckStats={totalBotDeckStats}
      />

      {/* bot deck */}
      <div className="BOT-DECK flex flex-col w-full place-items-center">
        <div className="DECK grid grid-cols-2 md:grid-cols-3 gap-5 p-2">
          {botDeck.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`flex flex-col place-items-center my-3 relative p-2 border border-black rounded-sm hover:scale-105 hover:shadow-2xl
            ${getTypeColor(pokemon.types)}`}
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
              <div className="statsDiv grid grid-cols-3 w-full place-items-center -mt-2 font-bold">
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
