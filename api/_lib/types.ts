// Tipos compartilhados entre o endpoint de tracking e o painel de admin.

export interface DeviceInfo {
  browser: string;
  os: string;
  type: 'mobile' | 'tablet' | 'desktop';
  screen: string;
  lang: string;
  tz: string;
  userAgent: string;
}

export interface GeoInfo {
  country: string;
  region: string;
  city: string;
}

export interface GameRecord {
  id: string;
  startedAt: string;
  endedAt?: string;
  mode: string;
  players: string[];
  playerCount: number;
  imposters: number;
  theme: string;
  darkMode: boolean;
  categories: string[];
  target?: number;
  rounds: number;
  finalScores?: Record<string, number>;
}

export interface SessionRecord {
  sessionId: string;
  deviceId: string;
  startedAt: string;
  lastSeen: string;
  screen: string;
  device: DeviceInfo;
  geo: GeoInfo;
  ipHash: string;
  referer: string;
  games: GameRecord[];
}

export interface Rollup {
  totalSessions: number;
  totalDevices: number;
  totalGames: number;
  gamesByMode: Record<string, number>;
  gamesByTheme: Record<string, number>;
  playerNames: Record<string, number>;
  countries: Record<string, number>;
  cities: Record<string, number>;
  deviceTypes: Record<string, number>;
  browsers: Record<string, number>;
  os: Record<string, number>;
  days: Record<string, number>;
  knownDevices: string[];
  updatedAt: string;
}

export const EMPTY_ROLLUP: Rollup = {
  totalSessions: 0,
  totalDevices: 0,
  totalGames: 0,
  gamesByMode: {},
  gamesByTheme: {},
  playerNames: {},
  countries: {},
  cities: {},
  deviceTypes: {},
  browsers: {},
  os: {},
  days: {},
  knownDevices: [],
  updatedAt: '',
};
