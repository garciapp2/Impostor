
import React, { useState, useRef } from 'react';
import type { Player } from '../types';
import Card from './Card';

interface GameScreenProps {
  players: Player[];
  secretWord: string;
  secretWordCategory: string;
  onGameEnd: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ players, secretWord, secretWordCategory, onGameEnd }) => {
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
  const cardColor = currentPlayer.color;
  const progressPercentage = ((currentIndex + 1) / players.length) * 100;

  return (
    <div className="flex flex-col items-center justify-between h-full w-full px-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full pt-6">
        <p className="text-sm font-semibold text-gray-700 text-center mb-3">
          Jogador {currentIndex + 1} de {players.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="h-1.5 rounded-full transition-all duration-300 ease-out" 
            style={{width: `${progressPercentage}%`, backgroundColor: '#5352ed'}}
          ></div>
        </div>
      </div>
      
      <div className="w-full flex-grow flex items-center justify-center perspective-1000 my-4">
        <Card
          key={currentIndex}
          frontContent={`Passe para ${currentPlayer.name}`}
          backContent={currentPlayer.isImposter ? 'VOCÊ É O IMPOSTOR' : secretWord}
          category={currentPlayer.isImposter ? '' : secretWordCategory}
          isImposter={currentPlayer.isImposter}
          colors={cardColor}
        />
      </div>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Toque no card para ver
      </p>

      <button
        onClick={handleNext}
        className="w-full max-w-sm mb-6 py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all"
        style={{ backgroundColor: '#5352ed' }}
      >
        {isLastPlayer ? 'Continuar' : 'Próximo Jogador'}
      </button>

    </div>
  );
};

export default GameScreen;
