
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
