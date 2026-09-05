
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Player, GameConfig, GameMode, CustomCategory, CustomQuestionCategory, CustomLocation, QuestionAnswer, RoundOutcome, DiaryEntry } from './types';
import { getAllWords, getCategoryForWord } from './constants/words';
import { LOCATIONS, getLocationByName } from './constants/locations';
import { drawQuestionRound, DEFAULT_QUESTION_CATEGORY_IDS } from './constants/questions';
import { drawRouletteRule } from './constants/roulette';
import { drawMissions } from './constants/missions';
import { getCardColors } from './components/Card';
import { ThemeProvider } from './contexts/ThemeContext';
import { initTracking, trackGameStart, trackRoundEnd, trackGameEnd } from './lib/track';

import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import QuestionScreen from './components/QuestionScreen';
import RevealScreen from './components/RevealScreen';
import ChampionshipRevealScreen from './components/ChampionshipRevealScreen';

interface RouletteRuleState { title: string; description: string; }

// Funções para localStorage
const STORAGE_KEY = 'impostor_game_config';
const CUSTOM_CATEGORIES_KEY = 'impostor_custom_categories';
const CUSTOM_QUESTION_CATEGORIES_KEY = 'impostor_custom_question_categories';
const CUSTOM_LOCATIONS_KEY = 'impostor_custom_locations';

const loadJson = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
  }
  return fallback;
};

const saveJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

const loadGameConfig = (): GameConfig | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migração: o antigo modo "Coringa" virou uma opção do modo Clássico.
      const migrated = { ...parsed };
      if (parsed.gameMode === 'joker') {
        migrated.gameMode = GameMode.CLASSIC;
        migrated.enableJokers = true;
      }
      // Migração: garante que configs salvas antes destas opções existirem tenham valores padrão
      return {
        allowRepeats: true,
        showHintToImposter: false,
        hapticFeedback: true,
        showLocationRoles: true,
        enableJokers: false,
        jokerMin: 1,
        jokerMax: 1,
        selectedQuestionCategories: DEFAULT_QUESTION_CATEGORY_IDS,
        championshipTarget: 10,
        enableRoulette: false,
        ...migrated,
      };
    }
  } catch (error) {
    console.error('Error loading game config:', error);
  }
  return null;
};

const saveGameConfig = (config: GameConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving game config:', error);
  }
};

const loadCustomCategories = (): CustomCategory[] => {
  try {
    const saved = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading custom categories:', error);
  }
  return [];
};

const saveCustomCategories = (categories: CustomCategory[]) => {
  try {
    localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving custom categories:', error);
  }
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>(() => loadCustomCategories());
  const [customQuestionCategories, setCustomQuestionCategories] = useState<CustomQuestionCategory[]>(() => loadJson<CustomQuestionCategory[]>(CUSTOM_QUESTION_CATEGORIES_KEY, []));
  const [customLocations, setCustomLocations] = useState<CustomLocation[]>(() => loadJson<CustomLocation[]>(CUSTOM_LOCATIONS_KEY, []));
  const [gameConfig, setGameConfig] = useState<GameConfig>(() => {
    const saved = loadGameConfig();
    return saved || {
      gameMode: GameMode.CLASSIC,
      playerCount: 3,
      imposterMin: 1,
      imposterMax: 1,
      enableJokers: false,
      jokerMin: 1,
      jokerMax: 1,
      playerNames: ['Jogador 1', 'Jogador 2', 'Jogador 3'],
      selectedCategories: ['objetos'],
      allowRepeats: true,
      showHintToImposter: false,
      hapticFeedback: true,
      showLocationRoles: true,
      selectedQuestionCategories: DEFAULT_QUESTION_CATEGORY_IDS,
      championshipTarget: 10,
      enableRoulette: false,
    };
  });
  const [secretWord, setSecretWord] = useState<string>('');
  const [secretWordCategory, setSecretWordCategory] = useState<string>('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [firstPlayerIndex, setFirstPlayerIndex] = useState<number>(0);
  // Modo Perguntas
  const [question, setQuestion] = useState<string>('');
  const [fakeQuestion, setFakeQuestion] = useState<string>('');
  const [questionCategory, setQuestionCategory] = useState<string>('');
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  // Modo Roleta
  const [rouletteRule, setRouletteRule] = useState<RouletteRuleState | null>(null);
  // Modo Campeonato: placar e diário da sessão (só duram a sessão de jogo).
  const [champScores, setChampScores] = useState<Record<string, number>>({});
  const [champDiary, setChampDiary] = useState<DiaryEntry[]>([]);
  const [champRound, setChampRound] = useState<number>(1);
  // Pontos ganhos na última rodada pontuada, por jogador (exibidos como "+3" no placar).
  const [champLastDelta, setChampLastDelta] = useState<Record<string, number>>({});

  // Nº de impostores realmente sorteado na rodada (imposterMin..imposterMax).
  const drawnImpostersRef = useRef(0);
  // Rodadas jogadas na sessão atual, em qualquer modo.
  const roundsPlayedRef = useRef(1);

  // Telemetria anônima: liga uma vez no boot.
  useEffect(() => {
    initTracking();
  }, []);

  const currentTheme = () => {
    if (typeof document === 'undefined') return { theme: 'classic', darkMode: false };
    return {
      theme: document.documentElement.getAttribute('data-theme') ?? 'classic',
      darkMode: document.documentElement.classList.contains('dark'),
    };
  };

  const handleStartGame = () => {
    setIsTransitioning(true);
    // Campeonato: zera placar/diário e reinicia a contagem de rodadas.
    if (gameConfig.gameMode === GameMode.CHAMPIONSHIP) {
      const initialScores: Record<string, number> = {};
      gameConfig.playerNames.forEach(n => { initialScores[n] = 0; });
      setChampScores(initialScores);
      setChampDiary([]);
      setChampRound(1);
      setChampLastDelta({});
    }
    roundsPlayedRef.current = 1;
    setupNewRound(
      gameConfig.gameMode,
      gameConfig.playerNames,
      gameConfig.imposterMin,
      gameConfig.imposterMax,
      gameConfig.enableJokers,
      gameConfig.jokerMin,
      gameConfig.jokerMax,
      gameConfig.selectedCategories,
      gameConfig.allowRepeats,
      gameConfig.selectedQuestionCategories,
      gameConfig.enableRoulette
    );
    // Depois do sorteio: setupNewRound preencheu o nº real de impostores.
    const { theme, darkMode } = currentTheme();
    trackGameStart({
      mode: gameConfig.gameMode,
      players: gameConfig.playerNames,
      playerCount: gameConfig.playerCount,
      imposters: drawnImpostersRef.current,
      theme,
      darkMode,
      categories: gameConfig.gameMode === GameMode.QUESTIONS
        ? gameConfig.selectedQuestionCategories
        : gameConfig.selectedCategories,
      target: gameConfig.gameMode === GameMode.CHAMPIONSHIP ? gameConfig.championshipTarget : undefined,
    });
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
    enableJokers: boolean,
    jokerMin: number,
    jokerMax: number,
    selectedCategories: string[],
    allowRepeats: boolean,
    selectedQuestionCategories: string[],
    enableRoulette: boolean
  ) => {
    const isSpy = gameMode === GameMode.SPY;
    const isQuestions = gameMode === GameMode.QUESTIONS;
    const isChampionship = gameMode === GameMode.CHAMPIONSHIP;
    // Roleta é uma opção do Clássico e do Cegas: sorteia uma regra por rodada.
    const rouletteActive = enableRoulette && (gameMode === GameMode.CLASSIC || gameMode === GameMode.FAKE);

    let word = '';
    let spyLocation: ReturnType<typeof getLocationByName> = null;
    let category: ReturnType<typeof getCategoryForWord> = null;

    if (isQuestions) {
      // Modo Perguntas: sorteia categoria + pergunta real + pergunta fake (impostor).
      const round = drawQuestionRound(selectedQuestionCategories, customQuestionCategories);
      setQuestion(round.question);
      setFakeQuestion(round.fakeQuestion);
      setQuestionCategory(round.category);
      setAnswers([]);
      setSecretWord('');
      setSecretWordCategory('');
    } else {
      // No modo Espião o "item secreto" é um local (incluindo os personalizados); nos demais é uma palavra de categoria.
      const allLocations = [...LOCATIONS, ...customLocations];
      const allItems = isSpy ? allLocations.map(l => l.name) : getAllWords(selectedCategories, customCategories);

      // Quando repetição está desativada, sorteia só entre os itens ainda não usados.
      // Se todos já foram usados, o ciclo reinicia.
      let pool = allItems;
      let resetUsed = false;
      if (!allowRepeats) {
        const available = allItems.filter(w => !usedWords.includes(w));
        if (available.length > 0) {
          pool = available;
        } else {
          resetUsed = true; // todos usados: reinicia o ciclo neste sorteio
        }
      }

      word = pool[Math.floor(Math.random() * pool.length)];
      spyLocation = isSpy ? (allLocations.find(l => l.name === word) || null) : null;
      category = isSpy ? null : getCategoryForWord(word, customCategories);
      setSecretWord(word);
      setSecretWordCategory(isSpy ? 'Local' : (category?.name || ''));
      if (allowRepeats) {
        setUsedWords([]);
      } else {
        setUsedWords(prev => (resetUsed ? [word] : [...prev, word]));
      }
    }

    // Roleta (opção): sorteia uma regra da rodada que vale para todos.
    if (rouletteActive) {
      const { rule, hint } = drawRouletteRule();
      setRouletteRule({ title: rule.title, description: rule.description + (hint || '') });
    } else {
      setRouletteRule(null);
    }

    // Modo Campeonato: cada jogador ganha uma missão secreta na carta.
    const roundMissions = isChampionship ? drawMissions(currentNames.length) : [];

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
    // Guardado para a telemetria: o sorteado, não o teto configurado.
    drawnImpostersRef.current = imposterIndices.size;

    // Select random jokers within range (Coringa option, only in Clássico)
    const jokerIndices = new Set<number>();
    if (gameMode === GameMode.CLASSIC && enableJokers) {
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
    
    // Gerar palavras fake para impostores no modo FAKE
    const fakeWordsMap = new Map<number, string>();
    if (gameMode === GameMode.FAKE && imposterIndices.size > 0 && category) {
      // Buscar todas as palavras da categoria (incluindo customizadas se necessário)
      const allCategoryWords = category.words || [];
      const categoryWords = allCategoryWords.filter(w => w !== word);
      const availableFakeWords = [...categoryWords].sort(() => Math.random() - 0.5);
      let fakeWordIndex = 0;
      imposterIndices.forEach(imposterIndex => {
        if (availableFakeWords.length > 0 && fakeWordIndex < availableFakeWords.length) {
          fakeWordsMap.set(imposterIndex, availableFakeWords[fakeWordIndex]);
          fakeWordIndex++;
        } else if (availableFakeWords.length > 0) {
          // Se acabaram palavras únicas, reutiliza aleatoriamente
          const randomFakeWord = availableFakeWords[Math.floor(Math.random() * availableFakeWords.length)];
          fakeWordsMap.set(imposterIndex, randomFakeWord);
        }
      });
    }
    
    // Atribuir funções do local aos não-espiões (modo Espião)
    const roleMap = new Map<number, string>();
    if (isSpy && spyLocation && spyLocation.roles.length > 0) {
      const shuffledRoles = [...spyLocation.roles].sort(() => Math.random() - 0.5);
      let roleIndex = 0;
      currentNames.forEach((_, index) => {
        if (!imposterIndices.has(index)) {
          roleMap.set(index, shuffledRoles[roleIndex % shuffledRoles.length]);
          roleIndex++;
        }
      });
    }

    const newPlayers = currentNames.map((name, index) => {
      const colorIndex = availableColorIndices[index % availableColorIndices.length];
      return {
        name,
        isImposter: imposterIndices.has(index),
        isJoker: jokerIndices.has(index),
        color: getCardColors(colorIndex),
        fakeWord: fakeWordsMap.get(index),
        role: roleMap.get(index),
        mission: isChampionship ? roundMissions[index]?.text : undefined,
      };
    });
    
    // Escolher jogador aleatório para começar
    const randomFirstPlayerIndex = Math.floor(Math.random() * newPlayers.length);
    setFirstPlayerIndex(randomFirstPlayerIndex);
    
    setPlayers(newPlayers);
  }, [usedWords, customCategories, customQuestionCategories, customLocations]);

  const handleScoreRound = (outcome: RoundOutcome, missionAchievers: string[]) => {
    const imposterNames = players.filter(p => p.isImposter).map(p => p.name);
    const innocentNames = players.filter(p => !p.isImposter).map(p => p.name);

    // Ganho desta rodada, calculado antes de somar ao total.
    const delta: Record<string, number> = {};
    const winners = outcome === 'imposters' ? imposterNames : innocentNames;
    const pointsPerWinner = outcome === 'imposters' ? 3 : 1;
    winners.forEach(n => { delta[n] = (delta[n] || 0) + pointsPerWinner; });
    missionAchievers.forEach(n => { delta[n] = (delta[n] || 0) + 1; });
    setChampLastDelta(delta);

    const nextScores = { ...champScores };
    Object.entries(delta).forEach(([n, pts]) => { nextScores[n] = (nextScores[n] || 0) + pts; });
    setChampScores(nextScores);
    trackRoundEnd(champRound, nextScores);
    setChampDiary(prev => [...prev, {
      round: champRound,
      secretWord,
      imposterNames,
      outcome,
      missionAchievers,
    }]);
  };

  const handleNewRound = () => {
    setIsTransitioning(true);
    roundsPlayedRef.current += 1;
    if (gameConfig.gameMode === GameMode.CHAMPIONSHIP) {
      setChampRound(r => r + 1);
      setChampLastDelta({});
    }
    // Aguardar a animação de saída terminar antes de atualizar os dados
    setTimeout(() => {
      // Atualizar os dados no meio da transição (quando a tela anterior já saiu)
      setupNewRound(
        gameConfig.gameMode,
        gameConfig.playerNames,
        gameConfig.imposterMin,
        gameConfig.imposterMax,
        gameConfig.enableJokers,
        gameConfig.jokerMin,
        gameConfig.jokerMax,
        gameConfig.selectedCategories,
        gameConfig.allowRepeats,
        gameConfig.selectedQuestionCategories,
        gameConfig.enableRoulette
      );
      // Mudar para a tela de cards
      setGameState(GameState.GAME);
      // Finalizar a transição após a nova tela aparecer
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const handleBackToStart = () => {
    const isChampionship = gameConfig.gameMode === GameMode.CHAMPIONSHIP;
    trackGameEnd(roundsPlayedRef.current, isChampionship ? champScores : undefined);
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
    const newConfig = { ...gameConfig, playerNames: newNames };
    setGameConfig(newConfig);
    saveGameConfig(newConfig);
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
            enableJokers={gameConfig.enableJokers}
            jokerMin={gameConfig.jokerMin}
            jokerMax={gameConfig.jokerMax}
            playerNames={gameConfig.playerNames}
            selectedCategories={gameConfig.selectedCategories}
            customCategories={customCategories}
            allowRepeats={gameConfig.allowRepeats}
            showHintToImposter={gameConfig.showHintToImposter}
            hapticFeedback={gameConfig.hapticFeedback}
            showLocationRoles={gameConfig.showLocationRoles}
            enableRoulette={gameConfig.enableRoulette}
            onOptionChange={(key, value) => {
              const newConfig = { ...gameConfig, [key]: value };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onGameModeChange={(mode) => {
              const newConfig = { ...gameConfig, gameMode: mode };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onPlayerCountChange={(count) => {
              const newNames = Array.from({ length: count }, (_, i) => 
                gameConfig.playerNames[i] || `Jogador ${i + 1}`
              );
              const newConfig = { 
                ...gameConfig, 
                playerCount: count,
                playerNames: newNames,
                imposterMin: Math.min(gameConfig.imposterMin, count),
                imposterMax: Math.min(gameConfig.imposterMax, count),
                jokerMin: Math.min(gameConfig.jokerMin, count),
                jokerMax: Math.min(gameConfig.jokerMax, count)
              };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onImposterRangeChange={(min, max) => {
              const newConfig = { ...gameConfig, imposterMin: min, imposterMax: max };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onJokerRangeChange={(min, max) => {
              const newConfig = { ...gameConfig, jokerMin: min, jokerMax: max };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onPlayerNameChange={handlePlayerNameChange}
            onCategoryToggle={(categoryId) => {
              const newCategories = gameConfig.selectedCategories.includes(categoryId)
                ? gameConfig.selectedCategories.filter(id => id !== categoryId)
                : [...gameConfig.selectedCategories, categoryId];
              const newConfig = { ...gameConfig, selectedCategories: newCategories };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onCategoriesChange={(categories) => {
              const newConfig = { ...gameConfig, selectedCategories: categories };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onCustomCategoriesChange={(categories) => {
              setCustomCategories(categories);
              saveCustomCategories(categories);
            }}
            selectedQuestionCategories={gameConfig.selectedQuestionCategories}
            onQuestionCategoriesChange={(categories) => {
              const newConfig = { ...gameConfig, selectedQuestionCategories: categories };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            customQuestionCategories={customQuestionCategories}
            onCustomQuestionCategoriesChange={(cats) => {
              setCustomQuestionCategories(cats);
              saveJson(CUSTOM_QUESTION_CATEGORIES_KEY, cats);
            }}
            customLocations={customLocations}
            onCustomLocationsChange={(locs) => {
              setCustomLocations(locs);
              saveJson(CUSTOM_LOCATIONS_KEY, locs);
            }}
            championshipTarget={gameConfig.championshipTarget}
            onChampionshipTargetChange={(target) => {
              const newConfig = { ...gameConfig, championshipTarget: target };
              setGameConfig(newConfig);
              saveGameConfig(newConfig);
            }}
            onStartGame={handleStartGame}
          />
        );
      case GameState.GAME:
        if (gameConfig.gameMode === GameMode.QUESTIONS) {
          return (
            <QuestionScreen
              players={players}
              question={question}
              fakeQuestion={fakeQuestion}
              category={questionCategory}
              hapticFeedback={gameConfig.hapticFeedback}
              onGameEnd={(collected) => {
                setAnswers(collected);
                setIsTransitioning(true);
                setTimeout(() => {
                  setGameState(GameState.REVEAL);
                  setTimeout(() => setIsTransitioning(false), 10);
                }, 200);
              }}
            />
          );
        }
        return (
          <GameScreen
            players={players}
            secretWord={secretWord}
            secretWordCategory={secretWordCategory}
            gameMode={gameConfig.gameMode}
            showHintToImposter={gameConfig.showHintToImposter}
            hapticFeedback={gameConfig.hapticFeedback}
            showLocationRoles={gameConfig.showLocationRoles}
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
        if (gameConfig.gameMode === GameMode.CHAMPIONSHIP) {
          return (
            <ChampionshipRevealScreen
              players={players}
              secretWord={secretWord}
              round={champRound}
              target={gameConfig.championshipTarget}
              scores={champScores}
              lastRoundDelta={champLastDelta}
              firstPlayerName={players.length > 0 && firstPlayerIndex < players.length ? players[firstPlayerIndex].name : ''}
              diary={champDiary}
              hapticFeedback={gameConfig.hapticFeedback}
              onScoreRound={handleScoreRound}
              onNewRound={handleNewRound}
              onBackToStart={handleBackToStart}
            />
          );
        }
        const imposters = players.filter(p => p.isImposter);
        const imposterNames = imposters.map(p => p.name).join(', ');
        const jokers = players.filter(p => p.isJoker);
        const jokerNames = jokers.map(p => p.name).join(', ');
        const firstPlayer = players.length > 0 && firstPlayerIndex < players.length ? players[firstPlayerIndex].name : '';
        const imposterFakeWords = gameConfig.gameMode === GameMode.FAKE
          ? imposters
              .filter(p => p.fakeWord)
              .map(p => ({ name: p.name, word: p.fakeWord! }))
          : undefined;
        const questionData = gameConfig.gameMode === GameMode.QUESTIONS
          ? { question, fakeQuestion, category: questionCategory, answers }
          : undefined;
        return (
          <RevealScreen
            imposterNames={imposterNames}
            imposterCount={imposters.length}
            jokerNames={jokerNames}
            jokerCount={jokers.length}
            totalPlayers={players.length}
            secretWord={secretWord}
            firstPlayerName={firstPlayer}
            gameMode={gameConfig.gameMode}
            imposterFakeWords={imposterFakeWords}
            questionData={questionData}
            rouletteRule={rouletteRule}
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
