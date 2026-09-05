import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearCookie } from '../_lib/auth.js';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  clearCookie(res);
  res.status(200).json({ ok: true });
}
