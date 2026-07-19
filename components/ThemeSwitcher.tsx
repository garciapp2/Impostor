import React from 'react';
import { useTheme, ThemeName } from '../contexts/ThemeContext';

interface ThemeSwitcherProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal para escolher o tema visual do app (teste de temas).
 * Controlado por fora (o gatilho fica na seção de Opções).
 */
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ open, onClose }) => {
  const { theme, setTheme, themes } = useTheme();

  if (!open) return null;

  const pick = (id: ThemeName) => {
    setTheme(id);
    // pequeno respiro para o usuário ver o tema aplicar antes de fechar
    setTimeout(onClose, 260);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-5 max-h-[85vh] overflow-y-auto scrollbar-custom animate-[fadeIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Temas</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 active:scale-95 transition-transform"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Escolha o clima do jogo. É só um teste, troque à vontade.</p>

        <div className="space-y-3">
          {themes.map((t) => {
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => pick(t.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all active:scale-[0.98] text-left ${
                  active
                    ? 'border-transparent shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                style={active ? { outline: '2px solid var(--accent)', outlineOffset: '2px' } : {}}
              >
                {/* Mini prévia do tema */}
                <div
                  className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden border"
                  style={{ backgroundColor: t.swatch.bg, borderColor: 'rgba(0,0,0,0.12)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: t.swatch.surface, color: t.swatch.ink }}
                  >
                    {t.emoji}
                  </div>
                  <span
                    className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.swatch.accent, boxShadow: '0 0 0 2px rgba(255,255,255,0.7)' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{t.name}</span>
                    {active && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-0.5">{t.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
