// Contadores acumulados de toda a história.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_lib/auth.js';
import { readJson, listDays, ROLLUP_PATH } from '../_lib/blob.js';
import { EMPTY_ROLLUP } from '../_lib/types.js';
import type { Rollup } from '../_lib/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');

  const [rollup, days] = await Promise.all([
    readJson<Rollup>(ROLLUP_PATH),
    listDays(),
  ]);

  res.status(200).json({ rollup: { ...EMPTY_ROLLUP, ...(rollup ?? {}) }, days });
}
