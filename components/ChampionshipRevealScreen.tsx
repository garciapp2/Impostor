
import React, { useState, useMemo } from 'react';
import type { Player, RoundOutcome, DiaryEntry } from '../types';

interface ChampionshipRevealScreenProps {
  players: Player[];
  secretWord: string;
  round: number;
  target: number;
  scores: Record<string, number>;
  diary: DiaryEntry[];
  hapticFeedback: boolean;
  onScoreRound: (outcome: RoundOutcome, missionAchievers: string[]) => void;
  onNewRound: () => void;
  onBackToStart: () => void;
}

type Step = 'intro' | 'reveal' | 'outcome' | 'missions' | 'standings';

const ACCENT = 'var(--accent)';
const DANGER = 'var(--danger)';

const ChampionshipRevealScreen: React.FC<ChampionshipRevealScreenProps> = ({
  players, secretWord, round, target, scores, diary, hapticFeedback, onScoreRound, onNewRound, onBackToStart,
}) => {
  const [step, setStep] = useState<Step>('intro');
  const [outcome, setOutcome] = useState<RoundOutcome | null>(null);
  const [achievers, setAchievers] = useState<Set<number>>(new Set());
  const [scored, setScored] = useState(false);
  const [showDiary, setShowDiary] = useState(false);

  const vibrate = (p: number | number[]) => {
    if (hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(p);
  };

  const imposters = players.filter(p => p.isImposter);
  const imposterNames = imposters.map(p => p.name).join(', ');
  const cheaterLabel = imposters.length > 1 ? 'Os impostores eram:' : 'O impostor era:';

  // Placar ordenado (maior primeiro). Empates mantêm a ordem dos jogadores.
  const ranking = useMemo(() => {
    return players
      .map((p, i) => ({ name: p.name, score: scores[p.name] ?? 0, i }))
      .sort((a, b) => b.score - a.score);
  }, [players, scores]);

  const topScore = ranking.length > 0 ? ranking[0].score : 0;
  const champions = ranking.filter(r => r.score >= target && r.score === topScore);
  const hasChampion = scored && champions.length > 0;

  const confirmScoring = () => {
    if (!outcome) return;
    const achieverNames = players.filter((_, i) => achievers.has(i)).map(p => p.name);
    onScoreRound(outcome, achieverNames);
    setScored(true);
    vibrate([30, 40, 30]);
    setStep('standings');
  };

  const toggleAchiever = (i: number) => {
    vibrate(15);
    setAchievers(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const renderStep = () => {
    // ---------- INTRO ----------
    if (step === 'intro') {
      return (
        <div className="flex flex-col h-full px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="flex-1 flex flex-col overflow-y-auto py-6">
            <div className="my-auto w-full">
              <div className="text-center mb-6">
                <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: ACCENT }}>Campeonato · Rodada {round}</p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">Peguem o impostor</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Conversem, discutam e decidam. Depois revelem para pontuar.</p>
              </div>
              <MiniBoard ranking={ranking} target={target} />
            </div>
          </div>
          <div className="pb-6 w-full max-w-sm mx-auto">
            <button
              onClick={() => { vibrate(20); setStep('reveal'); }}
              className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all"
              style={{ backgroundColor: ACCENT }}
            >
              Revelar Resultado
            </button>
          </div>
        </div>
      );
    }

    // ---------- REVEAL ----------
    if (step === 'reveal') {
      return (
        <div className="flex flex-col h-full text-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 overflow-y-auto py-4">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-sm champ-pop">Hora da Verdade</h1>
            <div className="w-full max-w-sm text-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 champ-pop" style={{ backgroundColor: ACCENT, animationDelay: '0.05s' }}>
              <p className="text-sm opacity-90 mb-2">A palavra secreta era:</p>
              <p className="text-3xl font-bold drop-shadow-lg leading-tight">{secretWord}</p>
            </div>
            <div className="w-full max-w-sm text-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 champ-pop" style={{ backgroundColor: DANGER, animationDelay: '0.18s' }}>
              <p className="text-lg opacity-90 mb-3">{cheaterLabel}</p>
              <p className="text-3xl font-bold drop-shadow-lg leading-tight">{imposters.length === 0 ? 'Ninguém!' : imposterNames}</p>
            </div>
          </div>
          <div className="pb-6 w-full max-w-sm mx-auto">
            <button
              onClick={() => { vibrate(20); setStep('outcome'); }}
              className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all"
              style={{ backgroundColor: ACCENT }}
            >
              Pontuar Rodada
            </button>
          </div>
        </div>
      );
    }

    // ---------- OUTCOME ----------
    if (step === 'outcome') {
      return (
        <div className="flex flex-col h-full px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="flex-1 flex flex-col justify-center py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-1">Quem venceu a rodada?</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">Toque no resultado combinado pelo grupo.</p>
            <div className="w-full max-w-sm mx-auto space-y-4">
              <button
                onClick={() => { vibrate(20); setOutcome('imposters'); setStep('missions'); }}
                className="w-full p-5 rounded-3xl text-white text-left shadow-lg active:scale-98 transition-all flex items-center justify-between champ-fade"
                style={{ backgroundColor: DANGER }}
              >
                <div>
                  <p className="text-xl font-bold">Impostores escaparam</p>
                  <p className="text-sm opacity-90 mt-1">Cada impostor pontua</p>
                </div>
                <span className="text-2xl font-black">+3</span>
              </button>
              <button
                onClick={() => { vibrate(20); setOutcome('innocents'); setStep('missions'); }}
                className="w-full p-5 rounded-3xl text-white text-left shadow-lg active:scale-98 transition-all flex items-center justify-between champ-fade"
                style={{ backgroundColor: ACCENT, animationDelay: '0.08s' }}
              >
                <div>
                  <p className="text-xl font-bold">Inocentes desmascararam</p>
                  <p className="text-sm opacity-90 mt-1">Cada inocente pontua</p>
                </div>
                <span className="text-2xl font-black">+1</span>
              </button>
            </div>
          </div>
          <div className="pb-6 w-full max-w-sm mx-auto">
            <button onClick={() => setStep('reveal')} className="w-full py-3 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 active:scale-98 transition-all">
              Voltar
            </button>
          </div>
        </div>
      );
    }

    // ---------- MISSIONS ----------
    if (step === 'missions') {
      return (
        <div className="flex flex-col h-full px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="pt-6 pb-3 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quem cumpriu a missão?</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Cada missão cumprida vale +1. Marque quem conseguiu.</p>
          </div>
          <div className="flex-1 overflow-y-auto py-2 space-y-2 w-full max-w-sm mx-auto">
            {players.map((p, i) => {
              const on = achievers.has(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleAchiever(i)}
                  className={`w-full px-4 py-3 rounded-2xl text-left transition-all border champ-fade ${on ? 'text-white shadow-md border-transparent' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'}`}
                  style={on ? { backgroundColor: ACCENT, animationDelay: `${i * 0.03}s` } : { animationDelay: `${i * 0.03}s` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{p.name}</p>
                      {p.mission && <p className={`text-xs mt-0.5 leading-snug ${on ? 'opacity-90' : 'text-gray-500 dark:text-gray-400'}`}>{p.mission}</p>}
                    </div>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${on ? 'bg-white border-white' : 'border-gray-300 dark:border-gray-600'}`}>
                      {on && (
                        <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="pb-6 pt-3 space-y-3 w-full max-w-sm mx-auto">
            <button
              onClick={confirmScoring}
              className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all"
              style={{ backgroundColor: ACCENT }}
            >
              Confirmar e ver placar
            </button>
            <button onClick={() => setStep('outcome')} className="w-full py-3 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 active:scale-98 transition-all">
              Voltar
            </button>
          </div>
        </div>
      );
    }

    // ---------- STANDINGS / CHAMPION ----------
    return (
      <div className="flex flex-col h-full px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex-1 flex flex-col overflow-y-auto py-6">
          {hasChampion ? (
            <div className="text-center mb-5 champ-pop">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: ACCENT }}>
                <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3h14M6 3v5a6 6 0 006 6 6 6 0 006-6V3M6 8H4a2 2 0 01-2-2V5a2 2 0 012-2m12 5h2a2 2 0 002-2V5a2 2 0 00-2-2M12 14v4m-4 3h8m-8 0a4 4 0 014-3 4 4 0 014 3" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: ACCENT }}>Campeão do jogo</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {champions.map(c => c.name).join(' & ')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bateu a meta de {target} pontos.</p>
            </div>
          ) : (
            <div className="text-center mb-5">
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: ACCENT }}>Placar · Rodada {round}</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">Como estamos indo</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Meta: {target} pontos</p>
            </div>
          )}

          <div className="w-full max-w-sm mx-auto space-y-2">
            {ranking.map((r, idx) => {
              const isLeader = r.score === topScore && r.score > 0;
              const pct = target > 0 ? Math.min(100, (r.score / target) * 100) : 0;
              return (
                <div
                  key={r.name}
                  className={`rounded-2xl px-4 py-3 border champ-fade ${isLeader ? 'border-transparent shadow-md' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800`}
                  style={{ ...(isLeader ? { boxShadow: `0 0 0 2px ${ACCENT}` } : {}), animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${idx === 0 ? 'text-white' : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700'}`}
                        style={idx === 0 ? { backgroundColor: ACCENT } : {}}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">{r.name}</span>
                    </div>
                    <span className="font-bold text-lg flex-shrink-0" style={{ color: ACCENT }}>{r.score}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: ACCENT }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diário da sessão */}
          {diary.length > 0 && (
            <div className="w-full max-w-sm mx-auto mt-5">
              <button
                onClick={() => setShowDiary(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <span>Diário da sessão ({diary.length})</span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${showDiary ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDiary && (
                <div className="mt-2 space-y-2">
                  {[...diary].reverse().map((d, i) => (
                    <div key={i} className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 champ-fade">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Rodada {d.round}</p>
                        <span className="text-xs font-semibold" style={{ color: d.outcome === 'imposters' ? DANGER : ACCENT }}>
                          {d.outcome === 'imposters' ? 'Impostor venceu' : 'Inocentes venceram'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                        Palavra: <strong>{d.secretWord}</strong>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {d.imposterNames.length > 0 ? `Impostor: ${d.imposterNames.join(', ')}` : 'Sem impostor'}
                        {d.missionAchievers.length > 0 && ` · Missões: ${d.missionAchievers.join(', ')}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pb-6 pt-3 space-y-3 w-full max-w-sm mx-auto">
          {hasChampion ? (
            <button
              onClick={onBackToStart}
              className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all"
              style={{ backgroundColor: ACCENT }}
            >
              Voltar ao Início
            </button>
          ) : (
            <>
              <button
                onClick={onNewRound}
                className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2"
                style={{ backgroundColor: ACCENT }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Próxima Rodada</span>
              </button>
              <button
                onClick={onBackToStart}
                className="w-full py-3 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 active:scale-98 transition-all"
              >
                Encerrar Campeonato
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return <div key={step} className="h-full champ-enter">{renderStep()}</div>;
};

// Mini-placar compacto usado na tela de intro.
const MiniBoard: React.FC<{ ranking: { name: string; score: number }[]; target: number }> = ({ ranking, target }) => {
  const top = ranking[0]?.score ?? 0;
  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
      <p className="text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 mb-3">Placar · meta {target}</p>
      <div className="space-y-2">
        {ranking.map((r, idx) => (
          <div key={r.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm w-6 text-center flex-shrink-0 text-gray-400 dark:text-gray-500">{idx + 1}</span>
              <span className={`truncate ${r.score === top && r.score > 0 ? 'font-bold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>{r.name}</span>
            </div>
            <span className="font-bold flex-shrink-0" style={{ color: ACCENT }}>{r.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Animações da tela de Campeonato (injetadas uma vez).
const champStyle = `
  @keyframes champEnter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes champPop { 0% { opacity: 0; transform: scale(0.85); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes champFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .champ-enter { animation: champEnter 0.32s ease-out both; }
  .champ-pop { animation: champPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .champ-fade { animation: champFade 0.4s ease-out both; }
`;
if (typeof document !== 'undefined' && !document.getElementById('champ-anim-styles')) {
  const el = document.createElement('style');
  el.id = 'champ-anim-styles';
  el.innerText = champStyle;
  document.head.appendChild(el);
}

export default ChampionshipRevealScreen;
