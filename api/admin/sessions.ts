// Sessões de um período (from..to, inclusivo), mais recentes primeiro.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/auth.js';
import { readAllUnder, listDays, SESSION_PREFIX, blobReady, BLOB_MISSING } from '../_lib/blob.js';
import type { SessionRecord } from '../_lib/types.js';

// Teto de dias lidos por requisição: cada dia é um list() + N fetches.
const MAX_DAYS = 120;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function param(req: VercelRequest, name: string): string {
  const raw = req.query[name];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value ?? '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  if (!blobReady()) {
    res.status(503).json({ error: BLOB_MISSING });
    return;
  }
  res.setHeader('Cache-Control', 'no-store');

  const from = param(req, 'from');
  const to = param(req, 'to');

  // Sem período: só devolve quais dias existem, para a UI montar os atalhos.
  if (!from && !to) {
    res.status(200).json({ days: await listDays(), sessions: [], truncated: false });
    return;
  }
  if ((from && !DATE_RE.test(from)) || (to && !DATE_RE.test(to))) {
    res.status(400).json({ error: 'período inválido' });
    return;
  }

  // Comparação lexicográfica funciona para YYYY-MM-DD.
  const days = await listDays();
  const inRange = days.filter(d => (!from || d >= from) && (!to || d <= to));

  // listDays() vem do mais recente para o mais antigo, então cortar o excesso
  // preserva os dias mais novos.
  const truncated = inRange.length > MAX_DAYS;
  const selected = inRange.slice(0, MAX_DAYS);

  const batches = await Promise.all(
    selected.map(d => readAllUnder<SessionRecord>(`${SESSION_PREFIX}${d}/`))
  );

  const sessions = batches.flat().sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  res.status(200).json({ days, sessions, truncated, daysRead: selected.length });
}
