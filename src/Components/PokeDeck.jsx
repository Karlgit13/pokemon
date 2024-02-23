import React from "react";
import { usePokemon } from "./PokemonContext";

const PokeDeck = () => {
  const { pokeDeck } = usePokemon();

  return (
    <div className="POKEDECK flex flex-col w-full place-items-center text-center text-sm sm:text-base md:text-2xl">
      <div className="p-4 text-center">
        <p className="font-bold">Choose 6 pokemons and head over to The Arena!</p>
        {pokeDeck.length > 0 ? <h1 className=" font-bold mt-5">Your Deck</h1> : ""}
      </div>
      <div className="POKEDECKGRID grid grid-cols-3 md:grid-cols-6 grid-rows-2 md:grid-rows-1 w-full p-4 place-items-center max-w-7xl">
        
        {pokeDeck.map((pokemon) => (
          <div key={pokemon.id} className="font-bold">
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeDeck;
