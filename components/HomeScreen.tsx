
import React, { useState } from 'react';
import { CATEGORIES } from '../constants/words';
import { GameMode, CustomCategory } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface HomeScreenProps {
  gameMode: GameMode;
  playerCount: number;
  imposterMin: number;
  imposterMax: number;
  jokerMin: number;
  jokerMax: number;
  playerNames: string[];
  selectedCategories: string[];
  customCategories: CustomCategory[];
  onGameModeChange: (mode: GameMode) => void;
  onPlayerCountChange: (count: number) => void;
  onImposterRangeChange: (min: number, max: number) => void;
  onJokerRangeChange: (min: number, max: number) => void;
  onPlayerNameChange: (index: number, name: string) => void;
  onCategoryToggle: (categoryId: string) => void;
  onCategoriesChange: (categories: string[]) => void;
  onCustomCategoriesChange: (categories: CustomCategory[]) => void;
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  gameMode,
  playerCount,
  imposterMin,
  imposterMax,
  jokerMin,
  jokerMax,
  playerNames,
  selectedCategories,
  customCategories,
  onGameModeChange,
  onPlayerCountChange,
  onImposterRangeChange,
  onJokerRangeChange,
  onPlayerNameChange,
  onCategoryToggle,
  onCategoriesChange,
  onCustomCategoriesChange,
  onStartGame,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState({
    players: true,
    imposters: false,
    jokers: false,
    categories: false,
    customCategories: false,
  });
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showCustomCategoryModal, setShowCustomCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryWords, setNewCategoryWords] = useState('');

  const canStart = 
    playerCount >= 3 &&
    imposterMin >= 0 &&
    imposterMax <= playerCount &&
    imposterMin <= imposterMax &&
    (gameMode === GameMode.CLASSIC || gameMode === GameMode.FAKE || (gameMode === GameMode.JOKER && jokerMin >= 0 && jokerMax <= playerCount && jokerMin <= jokerMax)) &&
    selectedCategories.length > 0 &&
    playerNames.every(name => name.trim() !== '');

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-y-auto scrollbar-custom transition-colors duration-200 relative">
      {/* How to Play Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => setShowHowToPlay(true)}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm focus:outline-none active:outline-none"
          aria-label="Como jogar"
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none active:outline-none"
          aria-label="Toggle dark mode"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
            {isDark ? (
              <svg className="w-4 h-4 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="pt-16 pb-2 px-4 text-center">
        <h1 className="text-6xl font-extrabold mb-12 tracking-tight" style={{ color: '#5352ed', fontFamily: "'Poppins', sans-serif" }}>
          Impostor
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-200">Configure e comece a jogar</p>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 space-y-3">
        {/* Game Mode Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Modo de Jogo</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onGameModeChange(GameMode.CLASSIC)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  gameMode === GameMode.CLASSIC
                    ? 'text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 active:bg-gray-100 dark:active:bg-gray-600'
                }`}
                style={gameMode === GameMode.CLASSIC ? { backgroundColor: '#5352ed' } : {}}
              >
                Clássico
              </button>
              <button
                onClick={() => onGameModeChange(GameMode.JOKER)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  gameMode === GameMode.JOKER
                    ? 'text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 active:bg-gray-100 dark:active:bg-gray-600'
                }`}
                style={gameMode === GameMode.JOKER ? { backgroundColor: '#5352ed' } : {}}
              >
                Coringa
              </button>
              <button
                onClick={() => onGameModeChange(GameMode.FAKE)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  gameMode === GameMode.FAKE
                    ? 'text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 active:bg-gray-100 dark:active:bg-gray-600'
                }`}
                style={gameMode === GameMode.FAKE ? { backgroundColor: '#5352ed' } : {}}
              >
                Cegas
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {gameMode === GameMode.CLASSIC && (
                  <>O impostor sabe que é impostor e não conhece a palavra secreta. <strong>Objetivo:</strong> Descobrir o impostor ou enganar os outros.</>
                )}
                {gameMode === GameMode.JOKER && (
                  <>Além dos impostores, há coringas que conhecem a palavra secreta. <strong>Objetivo:</strong> O coringa quer ser votado para fora.</>
                )}
                {gameMode === GameMode.FAKE && (
                  <>O impostor recebe uma palavra diferente da mesma categoria e não sabe que é impostor. <strong>Objetivo:</strong> Descobrir o impostor ou enganar os outros.</>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 italic transition-colors duration-200">
                Para mais detalhes, clique no botão da esquerda em cima.
              </p>
            </div>
          </div>
        </div>

        {/* Player Count Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, players: !isExpanded.players })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Jogadores</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">{playerCount} jogadores</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 transition-colors duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playerCount > 3) onPlayerCountChange(playerCount - 1);
                  }}
                  disabled={playerCount <= 3}
                  className="w-6 h-6 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 min-w-[2rem] text-center transition-colors duration-200">{playerCount}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playerCount < 20) onPlayerCountChange(playerCount + 1);
                  }}
                  disabled={playerCount >= 20}
                  className="w-6 h-6 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isExpanded.players ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {isExpanded.players && (
            <div className="px-4 pt-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
              {playerNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  value={name}
                  onChange={(e) => onPlayerNameChange(index, e.target.value)}
                  placeholder={`Jogador ${index + 1}`}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              ))}
            </div>
          )}
        </div>

        {/* Imposter Range Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, imposters: !isExpanded.imposters })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Impostores</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  {imposterMin === imposterMax 
                    ? `${imposterMin} impostor${imposterMin !== 1 ? 'es' : ''}`
                    : `${imposterMin}-${imposterMax} impostores`
                  }
                </p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isExpanded.imposters ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.imposters && (
            <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-200">
              <div className="flex items-end justify-center gap-6 max-w-xs mx-auto">
                <div className="flex flex-col items-center space-y-2">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">Mínimo</label>
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 transition-colors duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMin > 0) onImposterRangeChange(imposterMin - 1, imposterMax);
                      }}
                      disabled={imposterMin <= 0}
                      className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100 min-w-[2.5rem] text-center transition-colors duration-200">{imposterMin}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMin < playerCount) {
                          const newMin = imposterMin + 1;
                          const newMax = newMin > imposterMax ? newMin : imposterMax;
                          onImposterRangeChange(newMin, newMax);
                        }
                      }}
                      disabled={imposterMin >= playerCount}
                      className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="pb-2 text-gray-400 dark:text-gray-500 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">Máximo</label>
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 transition-colors duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMax > 0) {
                          const newMax = imposterMax - 1;
                          const newMin = newMax < imposterMin ? newMax : imposterMin;
                          onImposterRangeChange(newMin, newMax);
                        }
                      }}
                      disabled={imposterMax <= 0}
                      className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100 min-w-[2.5rem] text-center transition-colors duration-200">{imposterMax}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMax < playerCount) {
                          onImposterRangeChange(imposterMin, imposterMax + 1);
                        }
                      }}
                      disabled={imposterMax >= playerCount}
                      className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Joker Range Section - Only visible in JOKER mode */}
        {gameMode === GameMode.JOKER && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <button
              onClick={() => setIsExpanded({ ...isExpanded, jokers: !isExpanded.jokers })}
              className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Coringas</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    {jokerMin === jokerMax 
                      ? `${jokerMin} coringa${jokerMin !== 1 ? 's' : ''}`
                      : `${jokerMin}-${jokerMax} coringas`
                    }
                  </p>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isExpanded.jokers ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isExpanded.jokers && (
              <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-200">
                <div className="flex items-end justify-center gap-6 max-w-xs mx-auto">
                  <div className="flex flex-col items-center space-y-2">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">Mínimo</label>
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 transition-colors duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (jokerMin > 0) onJokerRangeChange(jokerMin - 1, jokerMax);
                        }}
                        disabled={jokerMin <= 0}
                        className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-base font-bold text-gray-900 dark:text-gray-100 min-w-[2.5rem] text-center transition-colors duration-200">{jokerMin}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (jokerMin < playerCount) {
                            const newMin = jokerMin + 1;
                            const newMax = newMin > jokerMax ? newMin : jokerMax;
                            onJokerRangeChange(newMin, newMax);
                          }
                        }}
                        disabled={jokerMin >= playerCount}
                        className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="pb-2 text-gray-400 dark:text-gray-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">Máximo</label>
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 transition-colors duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (jokerMax > 0) {
                            const newMax = jokerMax - 1;
                            const newMin = newMax < jokerMin ? newMax : jokerMin;
                            onJokerRangeChange(newMin, newMax);
                          }
                        }}
                        disabled={jokerMax <= 0}
                        className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-base font-bold text-gray-900 dark:text-gray-100 min-w-[2.5rem] text-center transition-colors duration-200">{jokerMax}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (jokerMax < playerCount) {
                            onJokerRangeChange(jokerMin, jokerMax + 1);
                          }
                        }}
                        disabled={jokerMax >= playerCount}
                        className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, categories: !isExpanded.categories })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Categorias</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  {selectedCategories.length === 0 
                    ? 'Nenhuma selecionada' 
                    : `${selectedCategories.length} categoria${selectedCategories.length !== 1 ? 's' : ''} selecionada${selectedCategories.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isExpanded.categories ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.categories && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-200">
              <div className="flex justify-start mb-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const allSelected = CATEGORIES.every(cat => selectedCategories.includes(cat.id));
                    if (allSelected) {
                      // Deselecionar todas
                      onCategoriesChange([]);
                    } else {
                      // Selecionar todas
                      const allCategoryIds = CATEGORIES.map(cat => cat.id);
                      onCategoriesChange(allCategoryIds);
                    }
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all active:scale-95"
                  style={{ 
                    backgroundColor: CATEGORIES.every(cat => selectedCategories.includes(cat.id)) ? '#ef4444' : '#5352ed',
                    color: 'white'
                  }}
                >
                  {CATEGORIES.every(cat => selectedCategories.includes(cat.id)) ? 'Deselecionar todas' : 'Selecionar todas'}
                </button>
              </div>
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                      isSelected
                        ? 'text-white shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 active:bg-gray-100 dark:active:bg-gray-600'
                    }`}
                    style={isSelected ? { backgroundColor: '#5352ed' } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs opacity-75">
                        {isSelected ? '✓ ' : ''}{category.words.length} palavras
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Custom Categories Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, customCategories: !isExpanded.customCategories })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Categorias Personalizadas</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  {customCategories.length === 0 
                    ? 'Nenhuma categoria personalizada' 
                    : `${customCategories.length} categoria${customCategories.length !== 1 ? 's' : ''} personalizada${customCategories.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isExpanded.customCategories ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.customCategories && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-200">
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setNewCategoryName('');
                  setNewCategoryWords('');
                  setShowCustomCategoryModal(true);
                }}
                className="w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white transition-all active:scale-95 flex items-center justify-center space-x-2"
                style={{ backgroundColor: '#5352ed' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Nova Categoria</span>
              </button>
              
              {customCategories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <div key={category.id} className="flex items-center space-x-2">
                    <button
                      onClick={() => onCategoryToggle(category.id)}
                      className={`flex-1 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 active:bg-gray-100 dark:active:bg-gray-600'
                      }`}
                      style={isSelected ? { backgroundColor: '#5352ed' } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-xs opacity-75">
                          {isSelected ? '✓ ' : ''}{category.words.length} palavras
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setNewCategoryName(category.name);
                        setNewCategoryWords(category.words.join('\n'));
                        setShowCustomCategoryModal(true);
                      }}
                      className="px-3 py-2.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Editar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const newCategories = customCategories.filter(c => c.id !== category.id);
                        onCustomCategoriesChange(newCategories);
                        // Remover da seleção se estiver selecionada
                        if (isSelected) {
                          const newSelected = selectedCategories.filter(id => id !== category.id);
                          onCategoriesChange(newSelected);
                        }
                      }}
                      className="px-3 py-2.5 rounded-xl text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      title="Excluir"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Start Button */}
      <div className="px-4 pb-6 pt-4 bg-gradient-to-t from-white dark:from-gray-900 via-white dark:via-gray-900 to-transparent transition-colors duration-200">
        <button
          onClick={onStartGame}
          disabled={!canStart}
          className={`w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all ${
            canStart
              ? ''
              : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
          }`}
          style={canStart ? { backgroundColor: isDark ? '#6366f1' : '#5352ed' } : {}}
        >
          {!canStart && selectedCategories.length === 0 && 'Selecione pelo menos uma categoria'}
          {!canStart && selectedCategories.length > 0 && imposterMax > playerCount && 'Muitos impostores'}
          {!canStart && selectedCategories.length > 0 && imposterMax <= playerCount && imposterMin > imposterMax && 'Range inválido'}
          {!canStart && selectedCategories.length > 0 && imposterMax <= playerCount && imposterMin <= imposterMax && gameMode === GameMode.JOKER && (jokerMax > playerCount || jokerMin > jokerMax) && 'Range de coringas inválido'}
          {!canStart && selectedCategories.length > 0 && imposterMax <= playerCount && imposterMin <= imposterMax && (gameMode === GameMode.CLASSIC || (jokerMax <= playerCount && jokerMin <= jokerMax)) && playerNames.some(n => !n.trim()) && 'Preencha todos os nomes'}
          {canStart && 'Começar Jogo'}
        </button>
      </div>

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
          onClick={() => setShowHowToPlay(false)}
        >
          <div 
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Como jogar</h2>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Fechar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">1.</span>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">Reúna 3 ou mais amigos e passe o celular entre eles.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">2.</span>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">
                    Cada jogador desliza para ver a palavra secreta — exceto {gameMode === GameMode.FAKE ? 'os impostores, que verão uma palavra diferente' : 'os impostores, que verão "VOCÊ É O IMPOSTOR"'}.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">3.</span>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">Um por um, os jogadores dizem uma palavra relacionada à palavra secreta.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">4.</span>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">
                    {gameMode === GameMode.FAKE 
                      ? 'O Impostor deve tentar se misturar sem saber que é impostor.'
                      : 'O Impostor deve fingir e tentar se misturar sem saber a palavra.'
                    }
                  </p>
                </div>
                
                {gameMode === GameMode.JOKER && (
                  <div className="flex items-start space-x-3">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">5.</span>
                    <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">O Coringa conhece a palavra secreta e quer ser votado para fora.</p>
                  </div>
                )}
                
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">{gameMode === GameMode.JOKER ? '6.' : '5.'}</span>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">Continuem dando dicas e conversando até alguém achar que descobriu.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold text-lg flex-shrink-0">{gameMode === GameMode.JOKER ? '7.' : '6.'}</span>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed transition-colors duration-200">Quando estiverem prontos, votem em quem acham que é o Impostor — depois revelem a verdade!</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                  * Grave o caos! Compartilhe suas rodadas mais engraçadas nas redes sociais e marque seus amigos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Category Modal */}
      {showCustomCategoryModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCustomCategoryModal(false)}
        >
          <div 
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              <button
                onClick={() => {
                  setShowCustomCategoryModal(false);
                  setEditingCategory(null);
                  setNewCategoryName('');
                  setNewCategoryWords('');
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Fechar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Ex: Filmes Favoritos"
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                  Palavras (uma por linha)
                </label>
                <textarea
                  value={newCategoryWords}
                  onChange={(e) => setNewCategoryWords(e.target.value)}
                  placeholder="Palavra 1&#10;Palavra 2&#10;Palavra 3"
                  rows={8}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Digite uma palavra por linha. Mínimo de 3 palavras.
                </p>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => {
                    setShowCustomCategoryModal(false);
                    setEditingCategory(null);
                    setNewCategoryName('');
                    setNewCategoryWords('');
                  }}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    const words = newCategoryWords
                      .split('\n')
                      .map(w => w.trim())
                      .filter(w => w.length > 0);
                    
                    if (newCategoryName.trim() && words.length >= 3) {
                      if (editingCategory) {
                        // Editar categoria existente
                        const updated = customCategories.map(c => 
                          c.id === editingCategory.id 
                            ? { ...c, name: newCategoryName.trim(), words }
                            : c
                        );
                        onCustomCategoriesChange(updated);
                      } else {
                        // Nova categoria
                        const newCategory: CustomCategory = {
                          id: `custom-${Date.now()}`,
                          name: newCategoryName.trim(),
                          words
                        };
                        onCustomCategoriesChange([...customCategories, newCategory]);
                      }
                      setShowCustomCategoryModal(false);
                      setEditingCategory(null);
                      setNewCategoryName('');
                      setNewCategoryWords('');
                    }
                  }}
                  disabled={!newCategoryName.trim() || newCategoryWords.split('\n').filter(w => w.trim().length > 0).length < 3}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#5352ed' }}
                >
                  {editingCategory ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
