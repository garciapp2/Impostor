
import React, { useState, useEffect } from 'react';

interface PlayerNameSetupProps {
  playerCount: number;
  onStartGame: (names: string[]) => void;
  onBack: () => void;
}

const PlayerNameSetup: React.FC<PlayerNameSetupProps> = ({ playerCount, onStartGame, onBack }) => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  
  useEffect(() => {
    setPlayerNames(
      Array.from({ length: playerCount }, (_, i) => `Jogador ${i + 1}`)
    );
  }, [playerCount]);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };
  
  const handleStart = () => {
    if(playerNames.every(name => name.trim() !== '')) {
        onStartGame(playerNames.map(name => name.trim()));
    } else {
        alert('Todos os jogadores precisam de um nome!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <h2 className="text-6xl text-sky-400 mb-6 text-center">Nomes</h2>
      
      <div className="flex-grow w-full overflow-y-auto pr-2">
        {playerNames.map((name, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Nome do Jogador ${index + 1}`}
              className="w-full text-3xl text-center bg-gray-100 border-2 border-sky-300 rounded-lg text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 p-2"
            />
          </div>
        ))}
      </div>

      <div className="w-full mt-6 flex justify-between items-center">
        <button
            onClick={onBack}
            className="text-3xl bg-gray-400 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-500 active:scale-95 transform transition-transform duration-150 ease-in-out"
        >
            Voltar
        </button>
        <button
            onClick={handleStart}
            className="text-4xl bg-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-pink-600 active:scale-95 transform transition-transform duration-150 ease-in-out"
        >
            Iniciar Jogo
        </button>
      </div>
    </div>
  );
};

export default PlayerNameSetup;
