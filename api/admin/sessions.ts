// Sessões de um dia específico, mais recentes primeiro.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/auth.js';
import { readAllUnder, listDays, SESSION_PREFIX } from '../_lib/blob.js';
import type { SessionRecord } from '../_lib/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');

  const raw = req.query.date;
  const date = Array.isArray(raw) ? raw[0] : raw;

  if (!date) {
    res.status(200).json({ days: await listDays(), sessions: [] });
    return;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ error: 'data inválida' });
    return;
  }

  const [days, sessions] = await Promise.all([
    listDays(),
    readAllUnder<SessionRecord>(`${SESSION_PREFIX}${date}/`),
  ]);

  sessions.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  res.status(200).json({ days, sessions });
}
