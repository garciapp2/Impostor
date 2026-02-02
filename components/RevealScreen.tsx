
import React, { useState } from 'react';

interface RevealScreenProps {
  imposterNames: string;
  imposterCount: number;
  jokerNames: string;
  jokerCount: number;
  totalPlayers: number;
  secretWord: string;
  firstPlayerName: string;
  onNewRound: () => void;
  onBackToStart: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ imposterNames, imposterCount, jokerNames, jokerCount, totalPlayers, secretWord, firstPlayerName, onNewRound, onBackToStart }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const isNone = imposterCount === 0;
  const isAll = imposterCount === totalPlayers;
  const displayText = isNone ? 'Ninguém!' : isAll ? 'Todos!' : imposterNames;
  const hasJokers = jokerCount > 0;

  if (!isRevealed) {
    return (
      <div className="flex flex-col h-full text-center px-4">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#5352ed' }}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="space-y-3">
            <p className="text-2xl font-bold text-gray-900">
              Jogo iniciado!
            </p>
            <p className="text-lg text-gray-700">
              Hora de conversar e pegar o Impostor.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Começa falando:</p>
              <p className="text-xl font-semibold text-indigo-600">{firstPlayerName}</p>
            </div>
          </div>
        </div>
        <div className="pb-6">
          <button
            onClick={() => setIsRevealed(true)}
            className="w-full max-w-sm py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all mx-auto"
            style={{ backgroundColor: '#5352ed' }}
          >
            Revelar Resultado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-center px-4">
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 overflow-y-auto py-4">
        {/* Palavra Secreta */}
        <div className="w-full max-w-sm text-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 animate-reveal" style={{ backgroundColor: '#5352ed' }}>
          <p className="text-sm opacity-90 mb-2">A palavra secreta era:</p>
          <p className="text-3xl font-bold drop-shadow-lg leading-tight">{secretWord}</p>
        </div>

        {/* Impostores */}
        <div className="w-full max-w-sm text-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 animate-reveal" style={{ backgroundColor: '#ef4444' }}>
          <p className="text-lg opacity-90 mb-4">
            {isNone ? 'O impostor era:' : isAll ? 'Os impostores eram:' : imposterCount > 1 ? 'Os impostores eram:' : 'O impostor era:'}
          </p>
          <p className="text-4xl font-bold drop-shadow-lg leading-tight">{displayText}</p>
        </div>

        {/* Coringas */}
        {hasJokers && (
          <div className="w-full max-w-sm text-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 animate-reveal" style={{ backgroundColor: '#f59e0b' }}>
            <p className="text-lg opacity-90 mb-4">
              {jokerCount > 1 ? 'Os coringas eram:' : 'O coringa era:'}
            </p>
            <p className="text-4xl font-bold drop-shadow-lg leading-tight">{jokerNames}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-3 w-full max-w-sm pb-6">
        <button
          onClick={onNewRound}
          className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2"
          style={{ backgroundColor: '#5352ed' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Nova Rodada</span>
        </button>
        <button
          onClick={onBackToStart}
          className="w-full py-4 rounded-2xl font-semibold text-gray-700 shadow-sm active:scale-98 transition-all bg-white border border-gray-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Voltar ao Início</span>
        </button>
      </div>
    </div>
  );
};

const style = `
  @keyframes reveal {
    0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .animate-reveal {
    animation: reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);


export default RevealScreen;
