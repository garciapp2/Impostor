
import React, { useState, useRef } from 'react';
import type { Player } from '../types';
import Card, { CARD_COLORS } from './Card';

interface GameScreenProps {
  players: Player[];
  secretWord: string;
  onGameEnd: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ players, secretWord, onGameEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleNext = () => {
    if (currentIndex < players.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onGameEnd();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    
    // Swipe left to go next
    if (diff < -50) {
      handleNext();
    }
    touchStartX.current = null;
  };

  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;
  const cardColor = CARD_COLORS[currentIndex % CARD_COLORS.length];
  const progressPercentage = ((currentIndex + 1) / players.length) * 100;

  return (
    <div className="flex flex-col items-center justify-between h-full w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full">
        <p className="text-3xl text-sky-600 text-center mb-2">Jogador {currentIndex + 1} de {players.length}</p>
        <div className="w-full bg-sky-100 rounded-full h-2.5">
            <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-300 ease-out" style={{width: `${progressPercentage}%`}}></div>
        </div>
      </div>
      
      <div className="w-full flex-grow flex items-center justify-center perspective-1000 my-4">
        <Card
          key={currentIndex}
          frontContent={`Passe para ${currentPlayer.name}`}
          backContent={currentPlayer.isImposter ? 'VOCÊ É O IMPOSTOR' : secretWord}
          isImposter={currentPlayer.isImposter}
          colors={cardColor}
        />
      </div>

      <p className="text-2xl text-gray-500 -mt-2">
        (Pressione o card para ver)
      </p>

      <button
        onClick={handleNext}
        className="mt-6 text-4xl text-white px-10 py-3 rounded-full shadow-lg active:scale-95 transform transition-transform duration-150 ease-in-out bg-gradient-to-br from-pink-500 to-red-500"
      >
        {isLastPlayer ? 'Revelar Impostor' : 'Próximo Jogador'}
      </button>

    </div>
  );
};

export default GameScreen;
