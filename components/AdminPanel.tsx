import React, { useCallback, useEffect, useState } from 'react';
import type { SessionRecord, Rollup } from '../api/_lib/types';

type Tab = 'live' | 'history' | 'summary';

const ACCENT = '#5352ed';

// ---------------------------------------------------------------- utilidades

const api = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(path, { credentials: 'same-origin', cache: 'no-store', ...init });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).error ?? `Erro ${res.status}`);
  return data as T;
};

const today = (): string => new Date().toISOString().slice(0, 10);

/** Data de N dias atrás, em YYYY-MM-DD. */
const daysAgo = (n: number): string => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

// Atalhos de período. `from: ''` significa sem limite inferior (todo o histórico).
const RANGE_PRESETS: { label: string; from: string }[] = [
  { label: 'Hoje', from: today() },
  { label: '7 dias', from: daysAgo(6) },
  { label: '30 dias', from: daysAgo(29) },
  { label: 'Tudo', from: '' },
];

/** Rótulo legível de um período, para o cabeçalho da lista. */
const rangeLabel = (from: string, to: string): string => {
  const br = (d: string) => d.split('-').reverse().join('/');
  if (!from) return `até ${br(to)}`;
  if (from === to) return br(from);
  return `${br(from)} – ${br(to)}`;
};

// Object.entries resolve para um overload que devolve `unknown` no grafo de
// tipos do React; este helper devolve os pares já tipados e ordenados.
const sortedEntries = (map: Record<string, number>): [string, number][] =>
  Object.keys(map)
    .map(k => [k, map[k]] as [string, number])
    .sort((a, b) => b[1] - a[1]);

const timeAgo = (iso: string): string => {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return 'agora';
  if (secs < 3600) return `há ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `há ${Math.floor(secs / 3600)} h`;
  return `há ${Math.floor(secs / 86400)} d`;
};

const clock = (iso: string): string =>
  new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

const duration = (from: string, to?: string): string => {
  const mins = Math.round((new Date(to ?? Date.now()).getTime() - new Date(from).getTime()) / 60000);
  if (mins < 1) return '<1 min';
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, '0')}`;
};

const MODE_LABELS: Record<string, string> = {
  classic: 'Clássico',
  fake: 'Cegas',
  spy: 'Espião',
  questions: 'Perguntas',
  championship: 'Campeonato',
};

const modeLabel = (m: string): string => MODE_LABELS[m] ?? m;

const flag = (country: string): string => {
  if (!/^[A-Za-z]{2}$/.test(country)) return '🌐';
  return String.fromCodePoint(...[...country.toUpperCase()].map(c => 0x1f1a5 + c.charCodeAt(0)));
};

const DEVICE_ICONS: Record<string, string> = { mobile: '📱', tablet: '📲', desktop: '💻' };

// ------------------------------------------------------------------- login

const LoginScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no login');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-950">
      <form onSubmit={submit} className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Painel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Acesso restrito.</p>

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1.5">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
          required
          className="w-full mb-4 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2"
          style={{ ['--tw-ring-color' as string]: ACCENT }}
        />

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1.5">Senha</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="w-full mb-5 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2"
          style={{ ['--tw-ring-color' as string]: ACCENT }}
        />

        {error && <p className="text-sm mb-4 text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-3.5 rounded-2xl font-semibold text-white shadow-lg disabled:opacity-60 active:scale-[0.98] transition-all"
          style={{ backgroundColor: ACCENT }}
        >
          {busy ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

// ----------------------------------------------------------- cartão de sessão

const SessionCard: React.FC<{ session: SessionRecord; live: boolean }> = ({ session, live }) => {
  const [open, setOpen] = useState(false);
  const names = [...new Set(session.games.flatMap(g => g.players))];
  const place = [session.geo.city, session.geo.region, session.geo.country].filter(Boolean).join(', ') || 'local desconhecido';

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              {live && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />}
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {names.length > 0 ? names.join(', ') : 'Sem partida ainda'}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {DEVICE_ICONS[session.device.type] ?? '💻'} {session.device.os} · {session.device.browser}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {flag(session.geo.country)} {place} · {session.device.tz}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-semibold" style={{ color: ACCENT }}>{timeAgo(session.lastSeen)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{clock(session.startedAt)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {session.games.length} {session.games.length === 1 ? 'partida' : 'partidas'}
            </p>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-3 space-y-3">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <Field label="Tela atual" value={session.screen} />
            <Field label="Aparelho" value={`${session.device.type} · ${session.device.screen}`} />
            <Field label="Idioma" value={session.device.lang} />
            <Field label="Sessão" value={session.sessionId.slice(0, 8)} />
            <Field label="Aparelho (id)" value={session.deviceId.slice(0, 8)} />
            <Field label="IP (hash)" value={session.ipHash.slice(0, 12)} />
          </dl>

          {session.games.map(game => (
            <div key={game.id} className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{modeLabel(game.mode)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {clock(game.startedAt)}{game.endedAt ? `–${clock(game.endedAt)}` : ' · em andamento'} · {duration(game.startedAt, game.endedAt)}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {game.players.join(', ')} — {game.imposters} impostor(es) · {game.rounds} rodada(s)
                {game.target ? ` · meta ${game.target}` : ''}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                tema {game.theme}{game.darkMode ? ' (escuro)' : ''}
                {game.categories.length > 0 ? ` · ${game.categories.join(', ')}` : ''}
              </p>
              {game.finalScores && Object.keys(game.finalScores).length > 0 && (
                <p className="text-xs mt-1.5 font-medium" style={{ color: ACCENT }}>
                  {sortedEntries(game.finalScores).map(([n, s]) => `${n} ${s}`).join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="min-w-0">
    <dt className="text-gray-400 dark:text-gray-500">{label}</dt>
    <dd className="text-gray-700 dark:text-gray-200 truncate font-mono">{value || '—'}</dd>
  </div>
);

// ------------------------------------------------------------------- resumo

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
    <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>
    <p className="text-2xl font-bold mt-1" style={{ color: ACCENT }}>{value}</p>
  </div>
);

const RankList: React.FC<{ title: string; data: Record<string, number>; limit?: number }> = ({ title, data, limit = 8 }) => {
  const rows = sortedEntries(data).slice(0, limit);
  const top = rows[0]?.[1] ?? 1;
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">{title}</p>
      {rows.length === 0 && <p className="text-sm text-gray-400 dark:text-gray-500">Sem dados ainda.</p>}
      <div className="space-y-2">
        {rows.map(([key, count]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 dark:text-gray-200 truncate pr-2">{key || '—'}</span>
              <span className="font-semibold flex-shrink-0" style={{ color: ACCENT }}>{count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-1.5 rounded-full" style={{ width: `${(count / top) * 100}%`, backgroundColor: ACCENT }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------- painel

const AdminPanel: React.FC = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>('live');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [liveSessions, setLiveSessions] = useState<SessionRecord[]>([]);
  const [historySessions, setHistorySessions] = useState<SessionRecord[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [from, setFrom] = useState(daysAgo(6));
  const [to, setTo] = useState(today());
  const [truncated, setTruncated] = useState(false);
  const [rollup, setRollup] = useState<Rollup | null>(null);

  useEffect(() => {
    api<{ authenticated: boolean }>('/api/admin/me')
      .then(r => setAuthed(r.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  const load = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    setError('');
    try {
      if (tab === 'live') {
        const r = await api<{ sessions: SessionRecord[] }>('/api/admin/live');
        setLiveSessions(r.sessions);
      } else if (tab === 'history') {
        const qs = new URLSearchParams({ to });
        if (from) qs.set('from', from);
        const r = await api<{ days: string[]; sessions: SessionRecord[]; truncated: boolean }>(
          `/api/admin/sessions?${qs.toString()}`
        );
        setDays(r.days);
        setHistorySessions(r.sessions);
        setTruncated(r.truncated);
      } else {
        const r = await api<{ rollup: Rollup; days: string[] }>('/api/admin/summary');
        setRollup(r.rollup);
        setDays(r.days);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar';
      if (message.includes('autenticado')) setAuthed(false);
      else setError(message);
    } finally {
      setLoading(false);
    }
  }, [authed, tab, from, to]);

  useEffect(() => { void load(); }, [load]);

  // Na aba "Agora", atualiza sozinho — é o que torna a lista útil.
  useEffect(() => {
    if (!authed || tab !== 'live') return;
    const id = window.setInterval(() => { void load(); }, 20_000);
    return () => window.clearInterval(id);
  }, [authed, tab, load]);

  const logout = async () => {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
    setAuthed(false);
  };

  if (authed === null) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Carregando…</div>;
  }
  if (!authed) {
    return <LoginScreen onDone={() => setAuthed(true)} />;
  }

  const tabs: [Tab, string][] = [['live', 'Agora'], ['history', 'Histórico'], ['summary', 'Resumo']];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-10">
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold text-gray-900 dark:text-gray-100">Impostor · Painel</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const dark = document.documentElement.classList.toggle('dark');
                try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
              }}
              className="px-3 py-1.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              ◐
            </button>
            <button onClick={logout} className="px-3 py-1.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              Sair
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-2 flex gap-1.5">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                tab === id ? 'text-white' : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800'
              }`}
              style={tab === id ? { backgroundColor: ACCENT } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-4 space-y-3">
        {error && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {tab === 'live' && (
          <>
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {liveSessions.length} {liveSessions.length === 1 ? 'sessão ativa' : 'sessões ativas'} (últimos 5 min)
              </p>
              <button onClick={() => void load()} className="text-sm font-medium" style={{ color: ACCENT }}>
                {loading ? '…' : 'Atualizar'}
              </button>
            </div>
            {liveSessions.length === 0 && !loading && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-12">Ninguém jogando agora.</p>
            )}
            {liveSessions.map(s => <SessionCard key={s.sessionId} session={s} live />)}
          </>
        )}

        {tab === 'history' && (
          <>
            <div className="flex flex-wrap gap-1.5 px-1">
              {RANGE_PRESETS.map(preset => {
                const active = from === preset.from && to === today();
                return (
                  <button
                    key={preset.label}
                    onClick={() => { setFrom(preset.from); setTo(today()); }}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                      active ? 'text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                    }`}
                    style={active ? { backgroundColor: ACCENT } : {}}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 px-1 text-sm">
              <label className="text-gray-500 dark:text-gray-400">De</label>
              <input
                type="date"
                value={from}
                max={to}
                onChange={e => setFrom(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
              />
              <label className="text-gray-500 dark:text-gray-400">até</label>
              <input
                type="date"
                value={to}
                min={from || undefined}
                max={today()}
                onChange={e => setTo(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 px-1">
              {rangeLabel(from, to)} · {historySessions.length}{' '}
              {historySessions.length === 1 ? 'sessão' : 'sessões'} ·{' '}
              {historySessions.reduce((n, s) => n + s.games.length, 0)} partidas
              {days.length > 0 && ` · ${days.length} dias com dados`}
            </p>

            {truncated && (
              <p className="text-xs px-1 text-amber-600 dark:text-amber-400">
                Período muito longo: mostrando só os 120 dias mais recentes.
              </p>
            )}

            {historySessions.length === 0 && !loading && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-12">Nada neste período.</p>
            )}
            {historySessions.map(s => <SessionCard key={s.sessionId} session={s} live={false} />)}
          </>
        )}

        {tab === 'summary' && rollup && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Sessões" value={rollup.totalSessions} />
              <StatCard label="Aparelhos" value={rollup.totalDevices} />
              <StatCard label="Partidas" value={rollup.totalGames} />
              <StatCard label="Dias ativos" value={days.length} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <RankList title="Partidas por modo" data={rollup.gamesByMode} />
              <RankList title="Jogadores mais frequentes" data={rollup.playerNames} limit={12} />
              <RankList title="Cidades" data={rollup.cities} />
              <RankList title="Países" data={rollup.countries} />
              <RankList title="Sistemas" data={rollup.os} />
              <RankList title="Navegadores" data={rollup.browsers} />
              <RankList title="Tipo de aparelho" data={rollup.deviceTypes} />
              <RankList title="Temas" data={rollup.gamesByTheme} />
              <RankList title="Sessões por dia" data={rollup.days} limit={14} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
