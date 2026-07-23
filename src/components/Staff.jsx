import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Login from './Login';
import MarketCheck from './MarketCheck';

function toCsv(rows) {
  const header = ['Name', 'Email', 'Phone', 'Interest', 'Message', 'Received'];
  const escape = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map(r => [r.name, r.email, r.phone, r.interest, r.message, r.created_at].map(escape).join(','));
  return [header.join(','), ...lines].join('\n');
}

export default function Staff() {
  const [session, setSession] = useState(undefined);
  const [requests, setRequests] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from('consultation_requests')
      .select('id, name, email, phone, interest, message, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) { setLoadError(error.message); return; }
        setRequests(data ?? []);
      });
  }, [session]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter(r =>
      [r.name, r.email, r.phone, r.interest].some(v => v?.toLowerCase().includes(q))
    );
  }, [requests, search]);

  function handleExport() {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultation-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (session === undefined) {
    return null;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div style={{ maxWidth: 900, margin: '80px auto', padding: '0 32px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: '#2C3E4A' }}>
          Staff dashboard
        </h1>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{
            background: 'none', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2,
            padding: '10px 20px', cursor: 'pointer', color: '#2C3E4A',
          }}
        >
          Sign out
        </button>
      </div>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.125rem', color: '#2C3E4A' }}>
            Consultation requests {requests.length > 0 && <span style={{ color: '#6E7681', fontWeight: 400 }}>({filtered.length}{filtered.length !== requests.length ? ` of ${requests.length}` : ''})</span>}
          </h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="search"
              placeholder="Search name, email, interest…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2, fontSize: '0.875rem', minWidth: 220 }}
            />
            <button
              onClick={handleExport}
              disabled={filtered.length === 0}
              style={{
                background: 'none', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2,
                padding: '8px 16px', cursor: filtered.length === 0 ? 'default' : 'pointer',
                color: '#2C3E4A', fontSize: '0.875rem', opacity: filtered.length === 0 ? 0.5 : 1,
              }}
            >
              Export CSV
            </button>
          </div>
        </div>

        {loadError && <p style={{ color: '#B5605A' }}>Couldn't load requests: {loadError}</p>}

        {!loadError && requests.length === 0 && (
          <p style={{ color: '#6E7681' }}>No requests yet.</p>
        )}

        {!loadError && requests.length > 0 && filtered.length === 0 && (
          <p style={{ color: '#6E7681' }}>No requests match "{search}".</p>
        )}

        {filtered.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(44,62,74,0.18)' }}>
                <th style={{ padding: '8px 0' }}>Name</th>
                <th style={{ padding: '8px 0' }}>Email</th>
                <th style={{ padding: '8px 0' }}>Phone</th>
                <th style={{ padding: '8px 0' }}>Interest</th>
                <th style={{ padding: '8px 0' }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(44,62,74,0.08)' }}>
                  <td style={{ padding: '8px 0' }}>{r.name}</td>
                  <td style={{ padding: '8px 0' }}>{r.email}</td>
                  <td style={{ padding: '8px 0' }}>{r.phone || '—'}</td>
                  <td style={{ padding: '8px 0' }}>{r.interest || '—'}</td>
                  <td style={{ padding: '8px 0' }}>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <MarketCheck />
    </div>
  );
}
