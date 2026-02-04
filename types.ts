
export enum GameState {
  HOME,
  GAME,
  REVEAL,
}

export enum GameMode {
  CLASSIC = 'classic',
  JOKER = 'joker',
  FAKE = 'fake',
}

export interface Player {
  name: string;
  isImposter: boolean;
  isJoker: boolean;
  color: string[];
  fakeWord?: string;
}

export interface GameConfig {
  gameMode: GameMode;
  playerCount: number;
  imposterMin: number;
  imposterMax: number;
  jokerMin: number;
  jokerMax: number;
  playerNames: string[];
  selectedCategories: string[];
}
