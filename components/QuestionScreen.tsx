import React, { useState } from 'react';
import type { Player, QuestionAnswer } from '../types';

interface QuestionScreenProps {
  players: Player[];
  question: string;
  fakeQuestion: string;
  category: string;
  hapticFeedback: boolean;
  onGameEnd: (answers: QuestionAnswer[]) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ players, question, fakeQuestion, category, hapticFeedback, onGameEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'cover' | 'answer'>('cover');
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [text, setText] = useState('');

  const vibrate = (pattern: number | number[]) => {
    if (hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;
  const shownQuestion = currentPlayer.isImposter ? fakeQuestion : question;
  const progressPercentage = ((currentIndex + 1) / players.length) * 100;

  const handleReveal = () => {
    vibrate(20);
    setPhase('answer');
  };

  const handleConfirm = () => {
    if (text.trim() === '') return;
    vibrate(15);
    const newAnswers = [...answers, { name: currentPlayer.name, answer: text.trim(), isImposter: currentPlayer.isImposter }];
    setText('');
    if (isLastPlayer) {
      onGameEnd(newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setPhase('cover');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full pt-6">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center mb-3 transition-colors duration-200">
          Jogador {currentIndex + 1} de {players.length}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 transition-colors duration-200">
          <div
            className="h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%`, backgroundColor: '#5352ed' }}
          ></div>
        </div>
      </div>

      {phase === 'cover' ? (
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          <div
            className="w-full max-w-sm rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-white"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${currentPlayer.color[0]}, ${currentPlayer.color[1]})` }}
          >
            <span className="text-xs uppercase tracking-wider opacity-90 mb-4">Próximo jogador</span>
            <span className="text-4xl font-bold text-center break-words leading-tight mb-8">{currentPlayer.name}</span>
            <button
              onClick={handleReveal}
              className="w-full py-3 rounded-2xl font-semibold bg-white/25 backdrop-blur-sm text-white border border-white/40 active:scale-98 transition-all"
            >
              Ver minha pergunta
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center transition-colors duration-200">
            Só toque quando estiver com {currentPlayer.name}
          </p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-sm">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-200">Categoria: {category}</p>
            <div className="w-full rounded-3xl shadow-xl p-6 mb-4 text-white" style={{ backgroundColor: '#5352ed' }}>
              <p className="text-xl font-bold text-center leading-snug">{shownQuestion}</p>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Sua resposta..."
              rows={3}
              autoFocus
              className="w-full px-4 py-3 text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center transition-colors duration-200">
              Responda sem entregar de cara.. o impostor tem outra pergunta!
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm mb-6" style={{ minHeight: '56px' }}>
        {phase === 'answer' && (
          <button
            onClick={handleConfirm}
            disabled={text.trim() === ''}
            className={`w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all ${
              text.trim() === '' ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : ''
            }`}
            style={text.trim() !== '' ? { backgroundColor: '#5352ed' } : {}}
          >
            {isLastPlayer ? 'Ver Respostas' : 'Confirmar e Passar'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
