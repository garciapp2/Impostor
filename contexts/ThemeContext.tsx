import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Sistema de temas do app.
 *
 * Além do clássico claro/escuro, existem 3 temas "de verdade", cada um é uma
 * repaginação completa (tipografia, formas, sombras, cor de destaque e clima),
 * aplicada via atributo `data-theme` no <html> e a folha de estilo `themes.css`.
 *
 * Trata-se de um teste de temas: fácil de trocar, sem alterar a lógica do jogo.
 */
export type ThemeName = 'classic' | 'editorial' | 'bubblegum';

export interface ThemeMeta {
  id: ThemeName;
  name: string;
  emoji: string;
  tagline: string;
  /** Temas que já nascem escuros ignoram o toggle claro/escuro. */
  forcedDark?: boolean;
  /** Amostras usadas no seletor (bg, superfície, destaque, tinta). */
  swatch: { bg: string; surface: string; accent: string; ink: string };
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'classic',
    name: 'Clássico',
    emoji: '🎲',
    tagline: 'O visual original, com claro e escuro.',
    swatch: { bg: '#f9fafb', surface: '#ffffff', accent: '#5352ed', ink: '#111827' },
  },
  {
    id: 'editorial',
    name: 'Editorial',
    emoji: '📰',
    tagline: 'Brutalista: tipografia gigante, papel e uma cor de choque.',
    swatch: { bg: '#efe9dc', surface: '#ffffff', accent: '#ff2d1f', ink: '#0a0a0a' },
  },
  {
    id: 'bubblegum',
    name: 'Bubblegum',
    emoji: '🫧',
    tagline: 'Y2K pop: gradientes doces, formas fofas e brilho.',
    swatch: { bg: '#ffe3f3', surface: '#ffffff', accent: '#ff4bb4', ink: '#4a1d54' },
  },
];

const THEME_KEY = 'app_theme';
const DARK_KEY = 'theme'; // mantém compatibilidade com a preferência claro/escuro existente

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: ThemeMeta[];
  isDark: boolean;
  toggleTheme: () => void;
  /** true quando o toggle claro/escuro faz efeito (só no tema Clássico). */
  darkToggleAvailable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isThemeName = (v: string | null): v is ThemeName =>
  v === 'classic' || v === 'editorial' || v === 'bubblegum';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return isThemeName(saved) ? saved : 'classic';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(DARK_KEY);
    return saved ? saved === 'dark' : false;
  });

  const meta = THEMES.find(t => t.id === theme);
  const forcedDark = !!meta?.forcedDark;
  // O toggle claro/escuro só é relevante no Clássico; os demais temas fixam seu próprio clima.
  const darkToggleAvailable = theme === 'classic';
  const effectiveDark = darkToggleAvailable ? isDark : forcedDark;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // A classe `dark` (utilitários dark: do Tailwind) só é usada pelo Clássico.
    // Nos outros temas, o themes.css controla tudo, então mantemos base + data-theme.
    if (effectiveDark && darkToggleAvailable) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(DARK_KEY, isDark ? 'dark' : 'light');
  }, [theme, isDark, effectiveDark, darkToggleAvailable]);

  const setTheme = (t: ThemeName) => setThemeState(t);
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, isDark, toggleTheme, darkToggleAvailable }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
