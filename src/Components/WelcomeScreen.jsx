import React from "react";
import { Link } from "react-router-dom";
// import { usePokemon } from "./PokemonContext";

const WelcomeScreen = () => {
  // const { shufflePokemon } = usePokemon();
  return (
    <>
      <div className="text-2xl p-5 flex flex-col text-center gap-2">
        <h1 className="">Welcome to PokeBattle</h1>
        <Link to="/main">
          <button>Contine to game</button>
        </Link>

        {/* <h2>Choose 5 Pokemons!</h2> */}
        {/* <button onClick={shufflePokemon} className="bg-red-400 p-2">
          Shuffle
        </button> */}
      </div>
    </>
  );
};

export default WelcomeScreen;
