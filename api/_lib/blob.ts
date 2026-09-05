// Wrapper fino sobre o Vercel Blob: ler/escrever JSON por caminho.
//
// O store é PRIVADO: os arquivos guardam nomes de jogadores e hash de IP, e
// não devem ser buscáveis por URL. Por isso gravamos com access 'private' e
// lemos com get(), que autentica pelo BLOB_READ_WRITE_TOKEN.

import { put, list, get } from '@vercel/blob';

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
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Lê um JSON pelo caminho lógico. Devolve null se não existir.
 *  `useCache: false` garante ler a versão recém-gravada, não a do CDN. */
export async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: 'private', useCache: false });
    if (!result || result.statusCode !== 200) return null;
    return (await new Response(result.stream).json()) as T;
  } catch {
    // get() lança quando o caminho não existe.
    return null;
  }
}

/** Lê todos os JSONs sob um prefixo, em paralelo. */
export async function readAllUnder<T>(prefix: string, limit = 1000): Promise<T[]> {
  const { blobs } = await list({ prefix, limit });
  const results = await Promise.all(blobs.map(b => readJson<T>(b.pathname)));
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
