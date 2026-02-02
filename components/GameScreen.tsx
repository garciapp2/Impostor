
import React, { useState, useRef, useEffect } from 'react';
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCardHeld, setIsCardHeld] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleNext = () => {
    if (isAnimating) return;
    
    if (currentIndex < players.length - 1) {
      setIsCardHeld(false); // Reset card held state when moving to next
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsAnimating(false);
      }, 300); // Duração da animação
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

  // Reset card held state when card changes
  useEffect(() => {
    setIsCardHeld(false);
  }, [currentIndex]);

  // Adicionar estilos de animação
  useEffect(() => {
    const style = `
      @keyframes slide-out-left {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(-100%);
          opacity: 0;
        }
      }
      @keyframes slide-in-right {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-out-left {
        animation: slide-out-left 0.3s ease-in-out forwards;
      }
      .animate-slide-in-right {
        animation: slide-in-right 0.3s ease-in-out forwards;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

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
      
      <div className="w-full flex-grow flex items-center justify-center perspective-1000 my-4 overflow-hidden relative">
        {/* Card atual - normal ou saindo pela esquerda */}
        <div className={`w-full flex items-center justify-center ${isAnimating ? 'absolute animate-slide-out-left' : ''}`}>
          <Card
            key={`card-${currentIndex}`}
            frontContent={`Passe para ${currentPlayer.name}`}
            backContent={currentPlayer.isImposter ? 'VOCÊ É O IMPOSTOR' : secretWord}
            category={currentPlayer.isImposter ? '' : secretWordCategory}
            isImposter={currentPlayer.isImposter}
            isJoker={currentPlayer.isJoker}
            colors={cardColor}
            onFlipped={(flipped) => {
              if (flipped) {
                setIsCardHeld(true);
              }
            }}
          />
        </div>
        
        {/* Próximo card entrando pela direita */}
        {isAnimating && currentIndex + 1 < players.length && (
          <div className="absolute w-full flex items-center justify-center animate-slide-in-right">
            <Card
              key={`next-${currentIndex + 1}`}
              frontContent={`Passe para ${players[currentIndex + 1].name}`}
              backContent={players[currentIndex + 1].isImposter ? 'VOCÊ É O IMPOSTOR' : secretWord}
              category={players[currentIndex + 1].isImposter ? '' : secretWordCategory}
              isImposter={players[currentIndex + 1].isImposter}
              isJoker={players[currentIndex + 1].isJoker}
              colors={players[currentIndex + 1].color}
              onFlipped={(flipped) => {
              if (flipped) {
                setIsCardHeld(true);
              }
            }}
            />
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Segure no card para ver
      </p>

      <div className="w-full max-w-sm mb-6" style={{ minHeight: '56px' }}>
        <button
          onClick={handleNext}
          className={`w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all duration-300 ${
            isCardHeld ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ backgroundColor: '#5352ed' }}
        >
          {isLastPlayer ? 'Iniciar Jogo' : 'Próximo Jogador'}
        </button>
      </div>

    </div>
  );
};

export default GameScreen;
