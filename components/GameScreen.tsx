
import React, { useState, useRef, useEffect } from 'react';
import type { Player } from '../types';
import { GameMode } from '../types';
import Card from './Card';
import HapticButton from './HapticButton';

interface GameScreenProps {
  players: Player[];
  secretWord: string;
  secretWordCategory: string;
  gameMode: GameMode;
  showHintToImposter: boolean;
  hapticFeedback: boolean;
  showLocationRoles: boolean;
  onGameEnd: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ players, secretWord, secretWordCategory, gameMode, showHintToImposter, hapticFeedback, showLocationRoles, onGameEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCardHeld, setIsCardHeld] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const vibrate = (pattern: number | number[]) => {
    if (hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const handleNext = () => {
    if (isAnimating) return;

    if (currentIndex < players.length - 1) {
      vibrate(15);
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
  const isSpy = gameMode === GameMode.SPY;

  // Calcula o conteúdo da carta para cada jogador conforme o modo de jogo.
  const getCardData = (player: Player) => {
    if (isSpy) {
      if (player.isImposter) {
        return { backContent: 'VOCÊ É O ESPIÃO', category: '', wordLabel: undefined as string | undefined, subContent: undefined as string | undefined, isImposter: true, isFakeWord: false };
      }
      return {
        backContent: secretWord, // o local secreto
        category: '',
        wordLabel: 'O local é',
        subContent: showLocationRoles && player.role ? `Sua função: ${player.role}` : undefined,
        isImposter: false,
        isFakeWord: false,
      };
    }
    const isFakeWord = gameMode === GameMode.FAKE && player.isImposter && !!player.fakeWord;
    return {
      backContent: player.isImposter
        ? (isFakeWord ? player.fakeWord! : 'VOCÊ É O IMPOSTOR')
        : secretWord,
      category: player.isImposter
        ? (isFakeWord ? secretWordCategory : (showHintToImposter ? secretWordCategory : ''))
        : secretWordCategory,
      wordLabel: undefined as string | undefined,
      subContent: undefined as string | undefined,
      isImposter: player.isImposter && gameMode !== GameMode.FAKE,
      isFakeWord,
    };
  };

  const currentCard = getCardData(currentPlayer);
  const nextCard = currentIndex + 1 < players.length ? getCardData(players[currentIndex + 1]) : null;

  return (
    <div className="flex flex-col items-center justify-between h-full w-full px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full pt-6">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center mb-3 transition-colors duration-200">
          Jogador {currentIndex + 1} de {players.length}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 transition-colors duration-200">
          <div 
            className="h-1.5 rounded-full transition-all duration-300 ease-out" 
            style={{width: `${progressPercentage}%`, backgroundColor: 'var(--accent)'}}
          ></div>
        </div>
      </div>
      
      <div className="w-full flex-grow flex items-center justify-center perspective-1000 my-4 overflow-hidden relative">
        {/* Card atual - normal ou saindo pela esquerda */}
        <div className={`w-full flex items-center justify-center ${isAnimating ? 'absolute animate-slide-out-left' : ''}`}>
          <Card
            key={`card-${currentIndex}`}
            frontContent={`Passe para ${currentPlayer.name}`}
            backContent={currentCard.backContent}
            category={currentCard.category}
            isImposter={currentCard.isImposter}
            isJoker={currentPlayer.isJoker}
            isFakeWord={currentCard.isFakeWord}
            showHint={showHintToImposter}
            wordLabel={currentCard.wordLabel}
            subContent={currentCard.subContent}
            colors={cardColor}
            hapticFeedback={hapticFeedback}
            onFlipped={(flipped) => {
              if (flipped) {
                vibrate(20);
                setIsCardHeld(true);
              }
            }}
          />
        </div>
        
        {/* Próximo card entrando pela direita */}
        {isAnimating && nextCard && currentIndex + 1 < players.length && (
          <div className="absolute w-full flex items-center justify-center animate-slide-in-right">
            <Card
              key={`next-${currentIndex + 1}`}
              frontContent={`Passe para ${players[currentIndex + 1].name}`}
              backContent={nextCard.backContent}
              category={nextCard.category}
              isImposter={nextCard.isImposter}
              isJoker={players[currentIndex + 1].isJoker}
              isFakeWord={nextCard.isFakeWord}
              showHint={showHintToImposter}
              wordLabel={nextCard.wordLabel}
              subContent={nextCard.subContent}
              colors={players[currentIndex + 1].color}
              hapticFeedback={hapticFeedback}
              onFlipped={(flipped) => {
              if (flipped) {
                vibrate(20);
                setIsCardHeld(true);
              }
            }}
            />
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center transition-colors duration-200">
        Segure no card para ver
      </p>

      <div className="w-full max-w-sm mb-6" style={{ minHeight: '56px' }}>
        <HapticButton
          onClick={handleNext}
          enabled={hapticFeedback}
          className={`w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all duration-300 ${
            isCardHeld ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ backgroundColor: 'var(--accent)' }}
          ariaLabel={isLastPlayer ? 'Iniciar jogo' : 'Próximo jogador'}
        >
          {isLastPlayer ? 'Iniciar Jogo' : 'Próximo Jogador'}
        </HapticButton>
      </div>

    </div>
  );
};

export default GameScreen;
