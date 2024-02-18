import React from "react";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <>
      <div className="text-2xl p-5 flex flex-col text-center gap-2">
        <h1 className="">Welcome to PokeBattle</h1>
        <Link to="/main">
          <button className="bg-red-500 p-2 rounded-md text-white">Contine to game</button>
        </Link>
      </div>
    </>
  );
};

export default WelcomeScreen;
