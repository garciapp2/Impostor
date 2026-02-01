
import React, { useState } from 'react';
import { CATEGORIES } from '../constants/words';

interface HomeScreenProps {
  playerCount: number;
  imposterMin: number;
  imposterMax: number;
  playerNames: string[];
  selectedCategories: string[];
  onPlayerCountChange: (count: number) => void;
  onImposterRangeChange: (min: number, max: number) => void;
  onPlayerNameChange: (index: number, name: string) => void;
  onCategoryToggle: (categoryId: string) => void;
  onCategoriesChange: (categories: string[]) => void;
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  playerCount,
  imposterMin,
  imposterMax,
  playerNames,
  selectedCategories,
  onPlayerCountChange,
  onImposterRangeChange,
  onPlayerNameChange,
  onCategoryToggle,
  onCategoriesChange,
  onStartGame,
}) => {
  const [isExpanded, setIsExpanded] = useState({
    players: true,
    imposters: false,
    categories: false,
  });

  const canStart = 
    playerCount >= 3 &&
    imposterMin >= 0 &&
    imposterMax <= playerCount &&
    imposterMin <= imposterMax &&
    selectedCategories.length > 0 &&
    playerNames.every(name => name.trim() !== '');

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-y-auto scrollbar-custom">
      {/* Header */}
      <div className="pt-12 pb-2 px-4 text-center">
        <h1 className="text-6xl font-extrabold mb-12 tracking-tight" style={{ color: '#5352ed', fontFamily: "'Poppins', sans-serif" }}>
          Impostor
        </h1>
        <p className="text-sm text-gray-600 mb-1">Configure e comece a jogar</p>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 space-y-3">
        {/* Player Count Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, players: !isExpanded.players })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Jogadores</p>
                <p className="text-xs text-gray-500">{playerCount} jogadores</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playerCount > 3) onPlayerCountChange(playerCount - 1);
                  }}
                  disabled={playerCount <= 3}
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-gray-900 min-w-[2rem] text-center">{playerCount}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playerCount < 20) onPlayerCountChange(playerCount + 1);
                  }}
                  disabled={playerCount >= 20}
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded.players ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {isExpanded.players && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
              {playerNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  value={name}
                  onChange={(e) => onPlayerNameChange(index, e.target.value)}
                  placeholder={`Jogador ${index + 1}`}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              ))}
            </div>
          )}
        </div>

        {/* Imposter Range Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, imposters: !isExpanded.imposters })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Impostores</p>
                <p className="text-xs text-gray-500">
                  {imposterMin === imposterMax 
                    ? `${imposterMin} impostor${imposterMin !== 1 ? 'es' : ''}`
                    : `${imposterMin}-${imposterMax} impostores`
                  }
                </p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded.imposters ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.imposters && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-4">
              <div className="flex items-end justify-center gap-6 max-w-xs mx-auto">
                <div className="flex flex-col items-center space-y-2">
                  <label className="text-xs font-medium text-gray-700">Mínimo</label>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMin > 0) onImposterRangeChange(imposterMin - 1, imposterMax);
                      }}
                      disabled={imposterMin <= 0}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-base font-bold text-gray-900 min-w-[2.5rem] text-center">{imposterMin}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMin < imposterMax) {
                          onImposterRangeChange(imposterMin + 1, imposterMax);
                        }
                      }}
                      disabled={imposterMin >= imposterMax}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="pb-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <label className="text-xs font-medium text-gray-700">Máximo</label>
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMax > imposterMin) {
                          onImposterRangeChange(imposterMin, imposterMax - 1);
                        }
                      }}
                      disabled={imposterMax <= imposterMin}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-base font-bold text-gray-900 min-w-[2.5rem] text-center">{imposterMax}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imposterMax < playerCount) {
                          onImposterRangeChange(imposterMin, imposterMax + 1);
                        }
                      }}
                      disabled={imposterMax >= playerCount}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-sm"
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

        {/* Categories Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, categories: !isExpanded.categories })}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Categorias</p>
                <p className="text-xs text-gray-500">
                  {selectedCategories.length === 0 
                    ? 'Nenhuma selecionada' 
                    : `${selectedCategories.length} categoria${selectedCategories.length !== 1 ? 's' : ''} selecionada${selectedCategories.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded.categories ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded.categories && (
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
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
                        : 'bg-gray-50 text-gray-700 border border-gray-200 active:bg-gray-100'
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
      </div>

      {/* Start Button */}
      <div className="px-4 pb-6 pt-4 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={onStartGame}
          disabled={!canStart}
          className={`w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all ${
            canStart
              ? ''
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          style={canStart ? { backgroundColor: '#5352ed' } : {}}
        >
          {!canStart && selectedCategories.length === 0 && 'Selecione pelo menos uma categoria'}
          {!canStart && selectedCategories.length > 0 && imposterMax > playerCount && 'Muitos impostores'}
          {!canStart && selectedCategories.length > 0 && imposterMax <= playerCount && imposterMin > imposterMax && 'Range inválido'}
          {!canStart && selectedCategories.length > 0 && imposterMax <= playerCount && imposterMin <= imposterMax && playerNames.some(n => !n.trim()) && 'Preencha todos os nomes'}
          {canStart && 'Começar Jogo'}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
