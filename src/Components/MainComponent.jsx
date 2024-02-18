import React from "react";
import PokemonCard from "./PokemonCard";
import PokeDeck from "./PokeDeck";

const MainComponent = () => {
  return (
    <div>
      <div>
        <PokeDeck />
      </div>
      <div>
        <PokemonCard />
      </div>
    </div>
  );
};

export default MainComponent;
