import React from "react";
import { Link } from "react-router-dom";
import welcomeBG from "../assets/pokeArenaBG.png"

const WelcomeScreen = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${welcomeBG})`}}
        className="WELCOMESCREEN text-2xl p-5 flex flex-col text-center gap-2 w-screen h-screen bg-cover"
      >
        <h1 className="font-bold text-white text-shadow">Welcome to Karl's pokemån</h1>
        <Link to="/main">
          <button className="bg-red-500 p-2 rounded-md text-white text-shadow border border-black">
            Contine to game
          </button>
        </Link>
      </div>
    </>
  );
};

export default WelcomeScreen;
