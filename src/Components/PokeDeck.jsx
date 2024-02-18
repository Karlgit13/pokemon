import React from "react";
import { usePokemon } from "./PokemonContext";

const PokeDeck = () => {
  const { pokeDeck } = usePokemon();

  return (
    <div className="flex flex-col w-full place-items-center">
      <div className="p-4">
        <h1>You have choosen</h1>
      </div>
      <div className="grid grid-cols-5 w-full p-4">
        {pokeDeck.map((pokemon) => (
          <div key={pokemon.id}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeDeck;
