import React, { useEffect, useState } from "react";

const Fight = ({
  playerHealth,
  setPlayerHealth,
  botHealth,
  setBotHealth,
  totalPokeDeckStats,
  totalBotDeckStats,
}) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (botHealth <= 0 || playerHealth <= 0) {
      const winnerName = playerHealth > botHealth ? "Player" : "Bot";
      setWinner(winnerName);
    }
  }, [playerHealth, botHealth]);

  const attack = () => {
    if (winner !== null) {
      return;
    }

    const playerBaseAttackValue = 200;
    const botBaseAttackValue = 200;
    const playerAttackValue =
      playerBaseAttackValue + (totalPokeDeckStats.attack || 0);
    const playerDefense = totalPokeDeckStats.defense || 0;

    const botAttackValue = botBaseAttackValue + (totalBotDeckStats.attack || 0);
    const botDefense = totalBotDeckStats.defense || 0;

    const damageToBot = Math.max(playerAttackValue - botDefense, 0);
    const damageToPlayer = Math.max(botAttackValue - playerDefense, 0);

    setPlayerHealth((prevHealth) => Math.max(prevHealth - damageToPlayer, 0));
    setBotHealth((prevHealth) => Math.max(prevHealth - damageToBot, 0));
  };

  return (
    <div className="FIGHT flex w-full justify-center text-xs sm:text-base md:text-xl">
      <div className="FIGHT-GRID grid grid-cols-3 w-full place-items-center max-w-[800px]">
        <div className="PLAYER-TOTAL-STATS">
          <h1 className="font-bold ">YOUR DECK</h1>
          <h1>Total Health: {playerHealth}</h1>
          <h2>Deck Stats:</h2>
          <p>Defense: {totalPokeDeckStats.defense}</p>
          <p>Attack: {totalPokeDeckStats.attack}</p>
          <p>HP: {totalPokeDeckStats.hp}</p>
        </div>
        <div className="FIGHT flex flex-col w-full justify-center my-10 col-start-2">
          <button
            onClick={attack}
            className="bg-red-500 p-2 rounded-md shadow-xl"
          >
            ATTACK
          </button>
          {winner && (
            <div className=" p-5 font-bold">
              <h1>Congrats {winner} wins!</h1>
            </div>
          )}
        </div>
        <div className="BOT-TOTAL-STATS col-start-3">
          <h1 className="font-bold ">BOT DECK</h1>
          <h1>Total Health: {botHealth}</h1>
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
