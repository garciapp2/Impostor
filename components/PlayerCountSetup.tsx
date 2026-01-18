
import React from 'react';

interface PlayerCountSetupProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const PlayerCountSetup: React.FC<PlayerCountSetupProps> = ({ playerCount, setPlayerCount, onNext, onBack }) => {
  const handleIncrement = () => {
    if (playerCount < 20) setPlayerCount(playerCount + 1);
  };
  const handleDecrement = () => {
    if (playerCount > 3) setPlayerCount(playerCount - 1);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full text-center p-4">
      <h2 className="text-6xl text-sky-500 drop-shadow-sm">Jogadores</h2>
      
      <div className="flex items-center justify-center w-full my-8">
        <button 
            onClick={handleDecrement} 
            disabled={playerCount <= 3}
            className="w-24 h-24 rounded-full text-white text-6xl flex items-center justify-center shadow-lg active:scale-95 transition-transform bg-gradient-to-br from-sky-400 to-sky-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed">
            -
        </button>

        <div className="mx-8 text-center">
            <p className="text-9xl text-pink-500 drop-shadow-md">{playerCount}</p>
        </div>

        <button 
            onClick={handleIncrement} 
            disabled={playerCount >= 20}
            className="w-24 h-24 rounded-full text-white text-6xl flex items-center justify-center shadow-lg active:scale-95 transition-transform bg-gradient-to-br from-pink-500 to-red-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed">
            +
        </button>
      </div>

      <div className="w-full flex justify-between items-center">
        <button
            onClick={onBack}
            className="text-3xl bg-gray-400 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-500 active:scale-95 transform transition-transform duration-150 ease-in-out"
        >
            Voltar
        </button>
        <button
            onClick={onNext}
            className="text-4xl bg-sky-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-sky-600 active:scale-95 transform transition-transform duration-150 ease-in-out"
        >
            Avançar
        </button>
      </div>
    </div>
  );
};

export default PlayerCountSetup;
