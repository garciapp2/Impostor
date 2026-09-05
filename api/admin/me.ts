// Usado pelo painel no boot para saber se já existe sessão válida.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthenticated } from '../_lib/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ authenticated: isAuthenticated(req) });
}
