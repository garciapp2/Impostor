
export enum GameState {
  HOME,
  GAME,
  REVEAL,
}

export interface Player {
  name: string;
  isImposter: boolean;
}

export interface GameConfig {
  playerCount: number;
  imposterMin: number;
  imposterMax: number;
  playerNames: string[];
  selectedCategories: string[];
}
