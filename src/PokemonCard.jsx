import React from "react";
import { usePokemon } from "./PokemonContext";

const PokemonCard = () => {
  const { pokemon, typeToColor, typeToPng } = usePokemon();

  const getTypeColor = (types) => {
    const primaryType = types[0].type.name;
    return typeToColor[primaryType] || "bg-gray-300";
  };

  const getTypeIcon = (types) => {
    const icon = types[0].type.name;
    return typeToPng[icon] || null;
  };

  if (pokemon.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {pokemon.map((pokemon, index) => (
          <div
            key={index}
            className={`flex flex-col place-items-center p-2 ${getTypeColor(
              pokemon.types
            )}`}
          >
            <h2>{pokemon.name}</h2>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-36"
            />
            <p>Type: {pokemon.types[0].type.name}</p>
            <img className="w-24" src={getTypeIcon(pokemon.types)} alt="" />
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
          </div>
        ))}
      </div>
    </>
  );
};

export default PokemonCard;
