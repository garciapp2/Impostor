// Sessões vistas nos últimos 5 minutos. Olha hoje e ontem (UTC) para não
// perder sessões que atravessaram a meia-noite.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/auth.js';
import { readAllUnder, SESSION_PREFIX } from '../_lib/blob.js';
import type { SessionRecord } from '../_lib/types.js';

const WINDOW_MS = 5 * 60_000;

function dayKey(offsetDays: number): string {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');

  const days = [dayKey(0), dayKey(-1)];
  const batches = await Promise.all(days.map(d => readAllUnder<SessionRecord>(`${SESSION_PREFIX}${d}/`)));
  const cutoff = Date.now() - WINDOW_MS;

  const live = batches
    .flat()
    .filter(s => new Date(s.lastSeen).getTime() >= cutoff)
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));

  res.status(200).json({ sessions: live, now: new Date().toISOString() });
}
