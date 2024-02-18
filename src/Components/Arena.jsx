import React from "react";
import { usePokemon } from "./PokemonContext";
import { Link } from "react-router-dom";

const Arena = () => {
  const { pokemon, pokeDeck, botDeck } = usePokemon();

  return (
    <div>
      <div className="CONTROLS">
        <Link to={"/main"}>
          <button>Back To Deck</button>
        </Link>
      </div>
      <div className="COMPUTER-DECK">
        {botDeck.map((pokemon) => (
          <div>
            <h1>{pokemon.name}</h1>
          </div>
        ))}
      </div>
      <div className="YOUR-DECK"></div>
    </div>
  );
};

export default Arena;
