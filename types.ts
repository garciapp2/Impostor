
export enum GameState {
  HOME,
  GAME,
  REVEAL,
}

export enum GameMode {
  CLASSIC = 'classic',
  FAKE = 'fake',
  SPY = 'spy',
  QUESTIONS = 'questions',
  CHAMPIONSHIP = 'championship',
}

// Resultado de uma rodada do Campeonato, usado para pontuar.
export type RoundOutcome = 'imposters' | 'innocents';

// Uma entrada do diário da sessão (Campeonato): o que rolou numa rodada.
export interface DiaryEntry {
  round: number;
  secretWord: string;
  imposterNames: string[];
  outcome: RoundOutcome;
  missionAchievers: string[];
}

export interface QuestionAnswer {
  name: string;
  answer: string;
  isImposter: boolean;
}

export interface Player {
  name: string;
  isImposter: boolean;
  isJoker: boolean;
  color: string[];
  fakeWord?: string;
  role?: string;
  /** Missão secreta (só modo Campeonato). */
  mission?: string;
}

export interface GameConfig {
  gameMode: GameMode;
  playerCount: number;
  imposterMin: number;
  imposterMax: number;
  enableJokers: boolean;
  jokerMin: number;
  jokerMax: number;
  playerNames: string[];
  selectedCategories: string[];
  allowRepeats: boolean;
  showHintToImposter: boolean;
  hapticFeedback: boolean;
  showLocationRoles: boolean;
  selectedQuestionCategories: string[];
  /** Meta de pontos do modo Campeonato. */
  championshipTarget: number;
  /** Sorteia uma regra por rodada (opção do Clássico e do Cegas). */
  enableRoulette: boolean;
}

export interface CustomCategory {
  id: string;
  name: string;
  words: string[];
}

export interface CustomQuestionCategory {
  id: string;
  name: string;
  questions: string[];
}

export interface CustomLocation {
  id: string;
  name: string;
  roles: string[];
}
