import React from "react";
import PokemonCard from "./PokemonCard";
import PokeDeck from "./PokeDeck";

const MainComponent = () => {
  return (
    <div className="MAINCOMPONENT">
      <div className="POKEDECK">
        <PokeDeck />
      </div>
      <div className="POKEMONCARD">
        <PokemonCard />
      </div>
    </div>
  );
};

export default MainComponent;
