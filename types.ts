
export enum GameState {
  HOME,
  PLAYER_COUNT_SETUP,
  PLAYER_NAME_SETUP,
  GAME,
  REVEAL,
  END,
}

export interface Player {
  name: string;
  isImposter: boolean;
}
