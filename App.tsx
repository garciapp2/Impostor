
import React, { useState, useCallback } from 'react';
import { GameState, Player } from './types';
import { WORDS } from './constants/words';

import HomeScreen from './components/HomeScreen';
import PlayerCountSetup from './components/PlayerCountSetup';
import PlayerNameSetup from './components/PlayerNameSetup';
import GameScreen from './components/GameScreen';
import RevealScreen from './components/RevealScreen';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [secretWord, setSecretWord] = useState<string>('');
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const handleStartGame = (names: string[]) => {
    setupNewRound(names);
    setGameState(GameState.GAME);
  };

  const setupNewRound = useCallback((currentNames: string[]) => {
    const availableWords = WORDS.filter(w => !usedWords.includes(w));
    if (availableWords.length === 0) {
      setUsedWords([]); // Reset if all words are used
    }
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    setSecretWord(word);
    setUsedWords(prev => [...prev, word]);

    const imposterIndex = Math.floor(Math.random() * currentNames.length);
    const newPlayers = currentNames.map((name, index) => ({
      name,
      isImposter: index === imposterIndex,
    }));
    setPlayers(newPlayers);
  }, [usedWords]);

  const handleNewRound = () => {
    const currentNames = players.map(p => p.name);
    setupNewRound(currentNames);
    setGameState(GameState.GAME);
  };

  const handleBackToStart = () => {
    setPlayers([]);
    setPlayerCount(3);
    setSecretWord('');
    setUsedWords([]);
    setGameState(GameState.HOME);
  };

  const renderScreen = () => {
    switch (gameState) {
      case GameState.HOME:
        return <HomeScreen onPlay={() => setGameState(GameState.PLAYER_COUNT_SETUP)} />;
      case GameState.PLAYER_COUNT_SETUP:
        return (
          <PlayerCountSetup
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            onNext={() => setGameState(GameState.PLAYER_NAME_SETUP)}
            onBack={() => setGameState(GameState.HOME)}
          />
        );
      case GameState.PLAYER_NAME_SETUP:
        return (
          <PlayerNameSetup
            playerCount={playerCount}
            onStartGame={handleStartGame}
            onBack={() => setGameState(GameState.PLAYER_COUNT_SETUP)}
          />
        );
      case GameState.GAME:
        return (
          <GameScreen
            players={players}
            secretWord={secretWord}
            onGameEnd={() => setGameState(GameState.REVEAL)}
          />
        );
      case GameState.REVEAL:
        const imposter = players.find(p => p.isImposter);
        return <RevealScreen imposterName={imposter?.name || '...'} onNext={() => setGameState(GameState.END)} />;
      case GameState.END:
        return <EndScreen onNewRound={handleNewRound} onBackToStart={handleBackToStart} />;
      default:
        return <HomeScreen onPlay={() => setGameState(GameState.PLAYER_COUNT_SETUP)} />;
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 text-gray-800 bangers-font tracking-wider">
        <main className="w-full max-w-md mx-auto h-full flex flex-col justify-center">
            {renderScreen()}
        </main>
    </div>
  );
};

export default App;
