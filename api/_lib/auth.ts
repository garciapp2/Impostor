// Sessão do admin: cookie HttpOnly assinado com HMAC.
// Credencial única vem de variáveis de ambiente, nunca do Blob.

import { createHmac, timingSafeEqual, scryptSync, randomBytes } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const COOKIE_NAME = 'impostor_admin';
const SESSION_HOURS = 12;

function secret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error('ADMIN_SECRET não configurado');
  return s;
}

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf).toString('base64url');
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Formato do ADMIN_PASSWORD_HASH: scrypt$<saltHex>$<hashHex> */
export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const [, saltHex, hashHex] = parts;
  const derived = scryptSync(password, Buffer.from(saltHex, 'hex'), 64).toString('hex');
  return safeEqual(derived, hashHex);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt.toString('hex')}$${hash}`;
}

export function issueCookie(res: VercelResponse, email: string): void {
  const exp = Date.now() + SESSION_HOURS * 3600_000;
  const payload = b64url(JSON.stringify({ sub: email, exp }));
  const token = `${payload}.${sign(payload)}`;
  const maxAge = SESSION_HOURS * 3600;
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`
  );
}

export function clearCookie(res: VercelResponse): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
  );
}

function readCookie(req: VercelRequest): string | null {
  const raw = req.headers.cookie;
  if (!raw) return null;
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === COOKIE_NAME) return v.join('=');
  }
  return null;
}

export function isAuthenticated(req: VercelRequest): boolean {
  const token = readCookie(req);
  if (!token) return false;
  const idx = token.lastIndexOf('.');
  if (idx <= 0) return false;
  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  if (!safeEqual(sig, sign(payload))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

/** Guarda para os endpoints do painel. Responde 401 e devolve false se barrado. */
export function requireAdmin(req: VercelRequest, res: VercelResponse): boolean {
  if (isAuthenticated(req)) return true;
  res.status(401).json({ error: 'não autenticado' });
  return false;
}

export function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const value = Array.isArray(fwd) ? fwd[0] : fwd;
  return (value ?? '').split(',')[0].trim() || 'unknown';
}

export function hashIp(ip: string): string {
  const salt = process.env.IP_SALT ?? '';
  return createHmac('sha256', salt).update(ip).digest('hex').slice(0, 32);
}
