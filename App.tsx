
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Player, GameConfig, GameMode } from './types';
import { getAllWords, getCategoryForWord } from './constants/words';
import { getCardColors } from './components/Card';
import { ThemeProvider } from './contexts/ThemeContext';

import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import RevealScreen from './components/RevealScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    gameMode: GameMode.CLASSIC,
    playerCount: 3,
    imposterMin: 1,
    imposterMax: 1,
    jokerMin: 0,
    jokerMax: 0,
    playerNames: ['Jogador 1', 'Jogador 2', 'Jogador 3'],
    selectedCategories: ['objetos'],
  });
  const [secretWord, setSecretWord] = useState<string>('');
  const [secretWordCategory, setSecretWordCategory] = useState<string>('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [firstPlayerIndex, setFirstPlayerIndex] = useState<number>(0);

  const handleStartGame = () => {
    setIsTransitioning(true);
    setupNewRound(
      gameConfig.gameMode,
      gameConfig.playerNames, 
      gameConfig.imposterMin, 
      gameConfig.imposterMax,
      gameConfig.jokerMin,
      gameConfig.jokerMax,
      gameConfig.selectedCategories
    );
    setTimeout(() => {
      setGameState(GameState.GAME);
      setTimeout(() => setIsTransitioning(false), 10);
    }, 200);
  };

  const setupNewRound = useCallback((
    gameMode: GameMode,
    currentNames: string[],
    imposterMin: number,
    imposterMax: number,
    jokerMin: number,
    jokerMax: number,
    selectedCategories: string[]
  ) => {
    const availableWords = getAllWords(selectedCategories).filter(w => !usedWords.includes(w));
    if (availableWords.length === 0) {
      setUsedWords([]); // Reset if all words are used
    }
    const allWords = getAllWords(selectedCategories);
    const word = allWords[Math.floor(Math.random() * allWords.length)];
    const category = getCategoryForWord(word);
    setSecretWord(word);
    setSecretWordCategory(category?.name || '');
    setUsedWords(prev => [...prev, word]);

    // Select random number of imposters within range
    const imposterCount = Math.floor(Math.random() * (imposterMax - imposterMin + 1)) + imposterMin;
    
    // Select random imposters
    const imposterIndices = new Set<number>();
    if (imposterCount > 0) {
      while (imposterIndices.size < imposterCount) {
        const randomIndex = Math.floor(Math.random() * currentNames.length);
        imposterIndices.add(randomIndex);
      }
    }

    // Select random jokers within range (only in JOKER mode)
    const jokerIndices = new Set<number>();
    if (gameMode === GameMode.JOKER) {
      const jokerCount = Math.floor(Math.random() * (jokerMax - jokerMin + 1)) + jokerMin;
      if (jokerCount > 0) {
        // Make sure jokers don't overlap with imposters
        const availableIndices = Array.from({ length: currentNames.length }, (_, i) => i)
          .filter(i => !imposterIndices.has(i));
        const shuffled = [...availableIndices].sort(() => Math.random() - 0.5);
        for (let i = 0; i < Math.min(jokerCount, shuffled.length); i++) {
          jokerIndices.add(shuffled[i]);
        }
      }
    }

    // Gerar cores aleatórias para cada jogador
    const availableColorIndices = Array.from({ length: 15 }, (_, i) => i);
    // Embaralhar as cores
    for (let i = availableColorIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableColorIndices[i], availableColorIndices[j]] = [availableColorIndices[j], availableColorIndices[i]];
    }
    
    const newPlayers = currentNames.map((name, index) => {
      const colorIndex = availableColorIndices[index % availableColorIndices.length];
      return {
        name,
        isImposter: imposterIndices.has(index),
        isJoker: jokerIndices.has(index),
        color: getCardColors(colorIndex),
      };
    });
    
    // Escolher jogador aleatório para começar
    const randomFirstPlayerIndex = Math.floor(Math.random() * newPlayers.length);
    setFirstPlayerIndex(randomFirstPlayerIndex);
    
    setPlayers(newPlayers);
  }, [usedWords]);

  const handleNewRound = () => {
    setIsTransitioning(true);
    // Aguardar a animação de saída terminar antes de atualizar os dados
    setTimeout(() => {
      // Atualizar os dados no meio da transição (quando a tela anterior já saiu)
      setupNewRound(
        gameConfig.gameMode,
        gameConfig.playerNames,
        gameConfig.imposterMin,
        gameConfig.imposterMax,
        gameConfig.jokerMin,
        gameConfig.jokerMax,
        gameConfig.selectedCategories
      );
      // Mudar para a tela de cards
      setGameState(GameState.GAME);
      // Finalizar a transição após a nova tela aparecer
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const handleBackToStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPlayers([]);
      setSecretWord('');
      setSecretWordCategory('');
      setUsedWords([]);
      setGameState(GameState.HOME);
      setTimeout(() => setIsTransitioning(false), 10);
    }, 200);
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...gameConfig.playerNames];
    newNames[index] = name;
    setGameConfig({ ...gameConfig, playerNames: newNames });
  };

  const renderScreen = () => {
    switch (gameState) {
      case GameState.HOME:
        return (
          <HomeScreen
            gameMode={gameConfig.gameMode}
            playerCount={gameConfig.playerCount}
            imposterMin={gameConfig.imposterMin}
            imposterMax={gameConfig.imposterMax}
            jokerMin={gameConfig.jokerMin}
            jokerMax={gameConfig.jokerMax}
            playerNames={gameConfig.playerNames}
            selectedCategories={gameConfig.selectedCategories}
            onGameModeChange={(mode) => {
              setGameConfig({ ...gameConfig, gameMode: mode });
            }}
            onPlayerCountChange={(count) => {
              const newNames = Array.from({ length: count }, (_, i) => 
                gameConfig.playerNames[i] || `Jogador ${i + 1}`
              );
              setGameConfig({ 
                ...gameConfig, 
                playerCount: count,
                playerNames: newNames,
                imposterMin: Math.min(gameConfig.imposterMin, count),
                imposterMax: Math.min(gameConfig.imposterMax, count),
                jokerMin: Math.min(gameConfig.jokerMin, count),
                jokerMax: Math.min(gameConfig.jokerMax, count)
              });
            }}
            onImposterRangeChange={(min, max) => {
              setGameConfig({ ...gameConfig, imposterMin: min, imposterMax: max });
            }}
            onJokerRangeChange={(min, max) => {
              setGameConfig({ ...gameConfig, jokerMin: min, jokerMax: max });
            }}
            onPlayerNameChange={handlePlayerNameChange}
            onCategoryToggle={(categoryId) => {
              const newCategories = gameConfig.selectedCategories.includes(categoryId)
                ? gameConfig.selectedCategories.filter(id => id !== categoryId)
                : [...gameConfig.selectedCategories, categoryId];
              setGameConfig({ ...gameConfig, selectedCategories: newCategories });
            }}
            onCategoriesChange={(categories) => {
              setGameConfig({ ...gameConfig, selectedCategories: categories });
            }}
            onStartGame={handleStartGame}
          />
        );
      case GameState.GAME:
        return (
          <GameScreen
            players={players}
            secretWord={secretWord}
            secretWordCategory={secretWordCategory}
            onGameEnd={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setGameState(GameState.REVEAL);
                setTimeout(() => setIsTransitioning(false), 10);
              }, 200);
            }}
          />
        );
      case GameState.REVEAL:
        const imposters = players.filter(p => p.isImposter);
        const imposterNames = imposters.map(p => p.name).join(', ');
        const jokers = players.filter(p => p.isJoker);
        const jokerNames = jokers.map(p => p.name).join(', ');
        const firstPlayer = players.length > 0 && firstPlayerIndex < players.length ? players[firstPlayerIndex].name : '';
        return (
          <RevealScreen 
            imposterNames={imposterNames}
            imposterCount={imposters.length}
            jokerNames={jokerNames}
            jokerCount={jokers.length}
            totalPlayers={players.length}
            secretWord={secretWord}
            firstPlayerName={firstPlayer}
            onNewRound={handleNewRound}
            onBackToStart={handleBackToStart}
          />
        );
      default:
        return null;
    }
  };

  // Adicionar estilos de animação
  useEffect(() => {
    const style = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
      .screen-enter {
        animation: fadeIn 0.3s ease-out forwards;
      }
      .screen-exit {
        animation: fadeOut 0.2s ease-in forwards;
        pointer-events: none;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
    
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200 fixed inset-0">
        <main className="w-full max-w-md mx-auto h-full flex flex-col overflow-hidden relative">
          <div className={`w-full h-full ${isTransitioning ? 'screen-exit' : 'screen-enter'}`}>
            {renderScreen()}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
