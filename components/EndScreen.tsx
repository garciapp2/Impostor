
import React from 'react';

interface EndScreenProps {
  onNewRound: () => void;
  onBackToStart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onNewRound, onBackToStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-8xl text-sky-500 drop-shadow-sm mb-16">Fim de Jogo</h2>
      
      <div className="flex flex-col space-y-6 w-full max-w-sm">
        <button
          onClick={onNewRound}
          className="w-full text-4xl text-white px-8 py-4 rounded-full shadow-lg active:scale-95 transform transition-transform duration-150 ease-in-out bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>
          Nova Rodada
        </button>
        
        <button
          onClick={onBackToStart}
          className="w-full text-3xl bg-gray-400 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-500 active:scale-95 transform transition-transform duration-150 ease-in-out flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
