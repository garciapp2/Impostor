
import React, { useState, useCallback } from 'react';
import { GameState, Player, GameConfig } from './types';
import { getAllWords, getCategoryForWord } from './constants/words';
import { getCardColors } from './components/Card';

import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import RevealScreen from './components/RevealScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    playerCount: 3,
    imposterMin: 1,
    imposterMax: 1,
    playerNames: ['Jogador 1', 'Jogador 2', 'Jogador 3'],
    selectedCategories: ['objetos'],
  });
  const [secretWord, setSecretWord] = useState<string>('');
  const [secretWordCategory, setSecretWordCategory] = useState<string>('');
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const handleStartGame = () => {
    setupNewRound(gameConfig.playerNames, gameConfig.imposterMin, gameConfig.imposterMax, gameConfig.selectedCategories);
    setGameState(GameState.GAME);
  };

  const setupNewRound = useCallback((
    currentNames: string[],
    imposterMin: number,
    imposterMax: number,
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
        color: getCardColors(colorIndex),
      };
    });
    setPlayers(newPlayers);
  }, [usedWords]);

  const handleNewRound = () => {
    setupNewRound(
      gameConfig.playerNames,
      gameConfig.imposterMin,
      gameConfig.imposterMax,
      gameConfig.selectedCategories
    );
    setGameState(GameState.GAME);
  };

  const handleBackToStart = () => {
    setPlayers([]);
    setSecretWord('');
    setSecretWordCategory('');
    setUsedWords([]);
    setGameState(GameState.HOME);
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
            playerCount={gameConfig.playerCount}
            imposterMin={gameConfig.imposterMin}
            imposterMax={gameConfig.imposterMax}
            playerNames={gameConfig.playerNames}
            selectedCategories={gameConfig.selectedCategories}
            onPlayerCountChange={(count) => {
              const newNames = Array.from({ length: count }, (_, i) => 
                gameConfig.playerNames[i] || `Jogador ${i + 1}`
              );
              setGameConfig({ 
                ...gameConfig, 
                playerCount: count,
                playerNames: newNames,
                imposterMin: Math.min(gameConfig.imposterMin, count),
                imposterMax: Math.min(gameConfig.imposterMax, count)
              });
            }}
            onImposterRangeChange={(min, max) => {
              setGameConfig({ ...gameConfig, imposterMin: min, imposterMax: max });
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
            onGameEnd={() => setGameState(GameState.REVEAL)}
          />
        );
      case GameState.REVEAL:
        const imposters = players.filter(p => p.isImposter);
        const imposterNames = imposters.map(p => p.name).join(', ');
        return (
          <RevealScreen 
            imposterNames={imposterNames}
            imposterCount={imposters.length}
            totalPlayers={players.length}
            onNewRound={handleNewRound}
            onBackToStart={handleBackToStart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
      <main className="w-full max-w-md mx-auto h-screen flex flex-col overflow-hidden">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
