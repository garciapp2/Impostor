// Ingestão de telemetria. Público, chamado pelo jogo.
//
// Cada sessão tem seu próprio blob (sessions/<dia>/<sessionId>.json) e só o
// aparelho dono escreve nele — por isso não há corrida de escrita.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clientIp, hashIp } from './_lib/auth.js';
import { readJson, writeJson, sessionPath, ROLLUP_PATH, blobReady, BLOB_MISSING } from './_lib/blob.js';
import { EMPTY_ROLLUP } from './_lib/types.js';
import type { SessionRecord, GameRecord, Rollup, DeviceInfo, GeoInfo } from './_lib/types.js';

const UUID_RE = /^[0-9a-f-]{8,64}$/i;

function day(iso: string): string {
  return iso.slice(0, 10);
}

function str(v: unknown, max = 120): string {
  return typeof v === 'string' ? v.slice(0, max) : '';
}

function strList(v: unknown, max = 40): string[] {
  return Array.isArray(v) ? v.slice(0, max).map(x => str(x, 60)) : [];
}

function geoFrom(req: VercelRequest): GeoInfo {
  const get = (h: string) => {
    const v = req.headers[h];
    const s = Array.isArray(v) ? v[0] : v;
    try {
      return s ? decodeURIComponent(s) : '';
    } catch {
      return s ?? '';
    }
  };
  return {
    country: get('x-vercel-ip-country'),
    region: get('x-vercel-ip-country-region'),
    city: get('x-vercel-ip-city'),
  };
}

function deviceFrom(raw: any, userAgent: string): DeviceInfo {
  const d = raw ?? {};
  const type = ['mobile', 'tablet', 'desktop'].includes(d.type) ? d.type : 'desktop';
  return {
    browser: str(d.browser, 60),
    os: str(d.os, 60),
    type,
    screen: str(d.screen, 20),
    lang: str(d.lang, 20),
    tz: str(d.tz, 60),
    userAgent: userAgent.slice(0, 400),
  };
}

function bump(map: Record<string, number>, key: string, by = 1): void {
  if (!key) return;
  map[key] = (map[key] ?? 0) + by;
}

/** Atualiza os contadores acumulados. Aproximado por design: dá pra
 *  reconstruir tudo a partir dos blobs de sessão se precisar. */
async function updateRollup(
  session: SessionRecord,
  newSession: boolean,
  finishedGame: GameRecord | null
): Promise<void> {
  const current = (await readJson<Rollup>(ROLLUP_PATH)) ?? { ...EMPTY_ROLLUP };
  const r: Rollup = { ...EMPTY_ROLLUP, ...current };

  if (newSession) {
    r.totalSessions += 1;
    bump(r.days, day(session.startedAt));
    bump(r.countries, session.geo.country);
    bump(r.cities, session.geo.city);
    bump(r.deviceTypes, session.device.type);
    bump(r.browsers, session.device.browser);
    bump(r.os, session.device.os);
    if (!r.knownDevices.includes(session.deviceId)) {
      r.knownDevices = [...r.knownDevices, session.deviceId].slice(-20000);
    }
    r.totalDevices = r.knownDevices.length;
  }

  if (finishedGame) {
    r.totalGames += 1;
    bump(r.gamesByMode, finishedGame.mode);
    bump(r.gamesByTheme, finishedGame.theme);
    finishedGame.players.forEach(n => bump(r.playerNames, n));
  }

  r.updatedAt = new Date().toISOString();
  await writeJson(ROLLUP_PATH, r);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'método não permitido' });
    return;
  }

  if (!blobReady()) {
    res.status(503).json({ error: BLOB_MISSING });
    return;
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const sessionId = str(body?.sessionId, 64);
  const deviceId = str(body?.deviceId, 64);
  const event = str(body?.event, 32);
  const payload = body?.payload ?? {};

  if (!UUID_RE.test(sessionId) || !UUID_RE.test(deviceId) || !event) {
    res.status(400).json({ error: 'payload inválido' });
    return;
  }

  const now = new Date().toISOString();
  const ua = str(req.headers['user-agent'], 400);

  // A sessão vive no blob do dia em que começou; guardamos esse dia no
  // cliente para que uma sessão atravessando a meia-noite não se duplique.
  const startDay = /^\d{4}-\d{2}-\d{2}$/.test(str(body?.startDay, 10))
    ? str(body.startDay, 10)
    : day(now);
  const path = sessionPath(startDay, sessionId);

  const existing = await readJson<SessionRecord>(path);
  const isNew = existing === null;

  const session: SessionRecord = existing ?? {
    sessionId,
    deviceId,
    startedAt: now,
    lastSeen: now,
    screen: 'home',
    device: deviceFrom(body?.device, ua),
    geo: geoFrom(req),
    ipHash: hashIp(clientIp(req)),
    referer: str(req.headers.referer, 200),
    games: [],
  };

  session.lastSeen = now;
  if (payload.screen) session.screen = str(payload.screen, 40);

  let finishedGame: GameRecord | null = null;
  const lastGame = session.games[session.games.length - 1];

  if (event === 'game_start') {
    session.games.push({
      id: `${session.games.length + 1}`,
      startedAt: now,
      mode: str(payload.mode, 40),
      players: strList(payload.players),
      playerCount: Number(payload.playerCount) || 0,
      imposters: Number(payload.imposters) || 0,
      theme: str(payload.theme, 40),
      darkMode: Boolean(payload.darkMode),
      categories: strList(payload.categories),
      target: payload.target != null ? Number(payload.target) : undefined,
      rounds: 1,
    });
    session.screen = 'game';
  } else if (event === 'round_end' && lastGame) {
    lastGame.rounds = Number(payload.rounds) || lastGame.rounds + 1;
    if (payload.scores) lastGame.finalScores = payload.scores;
  } else if (event === 'game_end' && lastGame && !lastGame.endedAt) {
    lastGame.endedAt = now;
    if (payload.rounds) lastGame.rounds = Number(payload.rounds);
    if (payload.scores) lastGame.finalScores = payload.scores;
    finishedGame = lastGame;
    session.screen = 'home';
  }

  await writeJson(path, session);

  if (isNew || finishedGame) {
    try {
      await updateRollup(session, isNew, finishedGame);
    } catch {
      // Contadores são um cache; nunca derrubam a ingestão.
    }
  }

  res.status(200).json({ ok: true, startDay });
}

function safeParse(s: string): any {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
