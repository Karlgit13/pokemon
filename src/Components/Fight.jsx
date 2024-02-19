import React from "react";

const Fight = ({
  playerHealth,
  botHealth,
  totalPokeDeckStats,
  totalBotDeckStats,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-3 w-full place-items-center max-w-7xl">
        <div className="PLAYER-TOTAL-STATS">
          <h1 className="font-bold text-xl">YOUR DECK</h1>
          <h1>Total Health: {playerHealth + (totalPokeDeckStats.hp || 0)}</h1>
          <h2>Deck Stats:</h2>
          <p>Defense: {totalPokeDeckStats.defense}</p>
          <p>Attack: {totalPokeDeckStats.attack}</p>
          <p>HP: {totalPokeDeckStats.hp}</p>
        </div>
        <div className="FIGHT flex w-full justify-center my-10 col-start-2">
          <button className="bg-red-500 p-2 rounded-md shadow-xl">
            ATTACK
          </button>
        </div>
        <div className="BOT-TOTAL-STATS col-start-3">
          <h1 className="font-bold text-xl">BOT DECK</h1>
          <h1>Total Health: {botHealth + (totalBotDeckStats.hp || 0)}</h1>
          <h2>Deck Stats:</h2>
          <p>Defense: {totalBotDeckStats.defense}</p>
          <p>Attack: {totalBotDeckStats.attack}</p>
          <p>HP: {totalBotDeckStats.hp}</p>
        </div>
      </div>
    </div>
  );
};

export default Fight;
