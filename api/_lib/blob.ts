// Wrapper fino sobre o Vercel Blob: ler/escrever JSON por caminho.
//
// Blobs sobrescritos ficam em cache na CDN, então gravamos com
// cacheControlMaxAge 0 e lemos sempre com cache-buster.

import { put, list } from '@vercel/blob';

export const SESSION_PREFIX = 'sessions/';
export const ROLLUP_PATH = 'stats/rollup.json';
export const ATTEMPTS_PATH = 'security/attempts.json';

/** O SDK do Blob lança se o token não existir; conferimos antes para poder
 *  responder com uma mensagem útil em vez de derrubar a função. */
export function blobReady(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export const BLOB_MISSING =
  'Blob não conectado: crie o store em Storage → Blob, conecte a este projeto e refaça o deploy.';

export function sessionPath(day: string, sessionId: string): string {
  return `${SESSION_PREFIX}${day}/${sessionId}.json`;
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const bust = url.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${bust}_=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Lê um JSON pelo caminho lógico. Devolve null se não existir. */
export async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    // list() com prefixo exato em vez de head(): head() só aceita pathname
    // em versões recentes do SDK, list() funciona em todas.
    const { blobs } = await list({ prefix: pathname, limit: 10 });
    const match = blobs.find(b => b.pathname === pathname);
    if (!match) return null;
    return await fetchJson<T>(match.url);
  } catch {
    return null;
  }
}

/** Lê todos os JSONs sob um prefixo, em paralelo. */
export async function readAllUnder<T>(prefix: string, limit = 1000): Promise<T[]> {
  const { blobs } = await list({ prefix, limit });
  const results = await Promise.all(blobs.map(b => fetchJson<T>(b.url)));
  return results.filter((r): r is Awaited<T> => r !== null) as T[];
}

/** Lista os "dias" (pastas) existentes sob sessions/, mais recente primeiro. */
export async function listDays(): Promise<string[]> {
  const { folders } = await list({ prefix: SESSION_PREFIX, mode: 'folded' });
  return (folders ?? [])
    .map(f => f.replace(SESSION_PREFIX, '').replace(/\/$/, ''))
    .filter(Boolean)
    .sort()
    .reverse();
}
