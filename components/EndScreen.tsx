
import React from 'react';

interface EndScreenProps {
  onNewRound: () => void;
  onBackToStart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onNewRound, onBackToStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg mb-4">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Fim de Jogo</h2>
        <p className="text-base text-gray-600">O que você quer fazer agora?</p>
      </div>
      
      <div className="flex flex-col space-y-3 w-full max-w-sm pb-6">
        <button
          onClick={onNewRound}
          className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center space-x-2"
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

export default EndScreen;
