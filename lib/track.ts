// Telemetria anônima do jogo. Falha em silêncio: nada aqui pode quebrar
// a partida, então todo erro é engolido.

const DEVICE_KEY = 'impostor_device_id';
const SESSION_KEY = 'impostor_session_id';
const START_DAY_KEY = 'impostor_session_day';
const HEARTBEAT_MS = 60_000;

type TrackEvent = 'session_start' | 'heartbeat' | 'game_start' | 'round_end' | 'game_end';

const uuid = (): string => {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch { /* segue para o fallback */ }
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 14)}`;
};

const persisted = (store: Storage, key: string): string => {
  try {
    const existing = store.getItem(key);
    if (existing) return existing;
    const fresh = uuid();
    store.setItem(key, fresh);
    return fresh;
  } catch {
    return uuid();
  }
};

// UA parsing propositalmente grosseiro: só precisa de nome + versão maior.
const parseBrowser = (ua: string): string => {
  const table: [RegExp, string][] = [
    [/Edg\/(\d+)/, 'Edge'],
    [/OPR\/(\d+)/, 'Opera'],
    [/SamsungBrowser\/(\d+)/, 'Samsung Internet'],
    [/Firefox\/(\d+)/, 'Firefox'],
    [/CriOS\/(\d+)/, 'Chrome iOS'],
    [/Chrome\/(\d+)/, 'Chrome'],
    [/Version\/(\d+).*Safari/, 'Safari'],
  ];
  for (const [re, name] of table) {
    const m = ua.match(re);
    if (m) return `${name} ${m[1]}`;
  }
  return 'Desconhecido';
};

const parseOs = (ua: string): string => {
  const table: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/Windows NT 10\.0/, () => 'Windows 10/11'],
    [/Windows NT ([\d.]+)/, m => `Windows ${m[1]}`],
    [/Android ([\d.]+)/, m => `Android ${m[1]}`],
    [/iPhone OS ([\d_]+)/, m => `iOS ${m[1].replace(/_/g, '.')}`],
    [/CPU OS ([\d_]+)/, m => `iPadOS ${m[1].replace(/_/g, '.')}`],
    [/Mac OS X ([\d_]+)/, m => `macOS ${m[1].replace(/_/g, '.')}`],
    [/Linux/, () => 'Linux'],
  ];
  for (const [re, fmt] of table) {
    const m = ua.match(re);
    if (m) return fmt(m);
  }
  return 'Desconhecido';
};

const deviceType = (ua: string): 'mobile' | 'tablet' | 'desktop' => {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return 'mobile';
  return 'desktop';
};

const collectDevice = () => {
  const ua = navigator.userAgent;
  return {
    browser: parseBrowser(ua),
    os: parseOs(ua),
    type: deviceType(ua),
    screen: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
    lang: navigator.language ?? '',
    tz: (() => {
      try { return Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''; } catch { return ''; }
    })(),
  };
};

let deviceId = '';
let sessionId = '';
let startDay = '';
let device: ReturnType<typeof collectDevice> | null = null;
let started = false;

const send = (event: TrackEvent, payload: Record<string, unknown> = {}): void => {
  if (!started) return;
  try {
    void fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, deviceId, startDay, device, event, payload }),
      keepalive: true,
    }).catch(() => { /* offline, sem problema */ });
  } catch { /* idem */ }
};

/** Liga a telemetria. Chamar uma vez, no boot do app. */
export const initTracking = (): void => {
  if (started || typeof window === 'undefined') return;
  try {
    deviceId = persisted(window.localStorage, DEVICE_KEY);
    sessionId = persisted(window.sessionStorage, SESSION_KEY);
    // O dia em que a sessão começou fixa em qual blob ela vive, para que uma
    // partida atravessando a meia-noite não vire duas sessões.
    startDay = window.sessionStorage.getItem(START_DAY_KEY) ?? '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDay)) {
      startDay = new Date().toISOString().slice(0, 10);
      window.sessionStorage.setItem(START_DAY_KEY, startDay);
    }
    device = collectDevice();
    started = true;
  } catch {
    return;
  }

  send('session_start', { screen: 'home' });

  const beat = () => {
    if (document.visibilityState === 'visible') send('heartbeat');
  };
  window.setInterval(beat, HEARTBEAT_MS);
  document.addEventListener('visibilitychange', beat);
};

export interface GameStartInfo {
  mode: string;
  players: string[];
  playerCount: number;
  imposters: number;
  theme: string;
  darkMode: boolean;
  categories: string[];
  target?: number;
}

export const trackGameStart = (info: GameStartInfo): void => send('game_start', { ...info, screen: 'game' });

export const trackRoundEnd = (rounds: number, scores?: Record<string, number>): void =>
  send('round_end', { rounds, scores });

export const trackGameEnd = (rounds: number, scores?: Record<string, number>): void =>
  send('game_end', { rounds, scores, screen: 'home' });

