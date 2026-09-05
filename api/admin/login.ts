// Login único do painel. Credencial em env vars; bloqueio por IP após falhas.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyPassword, issueCookie, clientIp, hashIp } from '../_lib/auth.js';
import { readJson, writeJson, ATTEMPTS_PATH } from '../_lib/blob.js';

const MAX_FAILS = 5;
const LOCK_MS = 15 * 60_000;

interface Attempt { fails: number; until: number; }
type Attempts = Record<string, Attempt>;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'método não permitido' });
    return;
  }

  const { ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_SECRET } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !ADMIN_SECRET) {
    res.status(500).json({ error: 'painel não configurado (faltam variáveis de ambiente)' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {});
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  const key = hashIp(clientIp(req));
  const attempts = (await readJson<Attempts>(ATTEMPTS_PATH)) ?? {};
  const entry = attempts[key];
  const now = Date.now();

  if (entry && entry.until > now) {
    const mins = Math.ceil((entry.until - now) / 60_000);
    res.status(429).json({ error: `muitas tentativas. Tente de novo em ${mins} min.` });
    return;
  }

  const ok = email === ADMIN_EMAIL.trim().toLowerCase() && verifyPassword(password, ADMIN_PASSWORD_HASH);

  if (!ok) {
    const fails = (entry?.until && entry.until > now ? entry.fails : entry?.fails ?? 0) + 1;
    attempts[key] = { fails, until: fails >= MAX_FAILS ? now + LOCK_MS : 0 };
    // Poda: só ficam os bloqueios ainda ativos e a entrada atual. Sem isto o
    // arquivo cresceria para sempre, já que bloqueios expirados nunca saíam.
    for (const k of Object.keys(attempts)) {
      if (k !== key && attempts[k].until <= now) delete attempts[k];
    }
    try { await writeJson(ATTEMPTS_PATH, attempts); } catch { /* não bloqueia a resposta */ }
    res.status(401).json({ error: 'e-mail ou senha incorretos' });
    return;
  }

  if (entry) {
    delete attempts[key];
    try { await writeJson(ATTEMPTS_PATH, attempts); } catch { /* idem */ }
  }

  issueCookie(res, email);
  res.status(200).json({ ok: true });
}
