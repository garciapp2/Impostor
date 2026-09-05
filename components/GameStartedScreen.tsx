import React from 'react';

interface RouletteRule {
  title: string;
  description: string;
}

interface GameStartedScreenProps {
  firstPlayerName: string;
  /** Regra sorteada da Roleta, quando a opção está ligada. */
  rouletteRule?: RouletteRule | null;
  /** Sobretítulo opcional (o Campeonato usa para indicar a rodada). */
  eyebrow?: string;
  onContinue: () => void;
}

/**
 * Tela que abre a discussão: "Jogo iniciado!" e quem começa falando.
 * Compartilhada por todos os modos para ficarem idênticas.
 */
const GameStartedScreen: React.FC<GameStartedScreenProps> = ({
  firstPlayerName, rouletteRule, eyebrow, onContinue,
}) => (
  <div className="flex flex-col h-full text-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div className="flex-1 flex flex-col items-center justify-center space-y-6 overflow-y-auto py-4">
      <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--accent)' }}>
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div className="space-y-3">
        {eyebrow && (
          <p className="text-xs uppercase tracking-widest font-semibold accent-text">{eyebrow}</p>
        )}
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
          Jogo iniciado!
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors duration-200">
          Hora de conversar e pegar o Impostor.
        </p>
        {rouletteRule && (
          <div className="mt-5 w-full max-w-sm mx-auto rounded-3xl shadow-xl p-5 text-white animate-reveal" style={{ backgroundColor: 'var(--accent)' }}>
            <p className="text-xs uppercase tracking-widest opacity-90 mb-2">Regra da rodada</p>
            <p className="text-2xl font-bold leading-tight mb-1">{rouletteRule.title}</p>
            <p className="text-sm opacity-95 leading-snug">{rouletteRule.description}</p>
          </div>
        )}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-200">Começa falando:</p>
          <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 transition-colors duration-200">{firstPlayerName}</p>
        </div>
      </div>
    </div>
    <div className="pb-6">
      <button
        onClick={onContinue}
        className="w-full max-w-sm py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all mx-auto"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        Revelar Resultado
      </button>
    </div>
  </div>
);

export default GameStartedScreen;
