import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Login from './Login';
import MarketCheck from './MarketCheck';

export default function Staff() {
  const [session, setSession] = useState(undefined);
  const [requests, setRequests] = useState([]);

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
      .select('id, name, email, phone, message, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => setRequests(data ?? []));
  }, [session]);

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
        <h2 style={{ fontSize: '1.125rem', color: '#2C3E4A', marginBottom: 16 }}>Consultation requests</h2>
        {requests.length === 0 ? (
          <p style={{ color: '#6E7681' }}>No requests yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(44,62,74,0.18)' }}>
                <th style={{ padding: '8px 0' }}>Name</th>
                <th style={{ padding: '8px 0' }}>Email</th>
                <th style={{ padding: '8px 0' }}>Phone</th>
                <th style={{ padding: '8px 0' }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(44,62,74,0.08)' }}>
                  <td style={{ padding: '8px 0' }}>{r.name}</td>
                  <td style={{ padding: '8px 0' }}>{r.email}</td>
                  <td style={{ padding: '8px 0' }}>{r.phone || '—'}</td>
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
