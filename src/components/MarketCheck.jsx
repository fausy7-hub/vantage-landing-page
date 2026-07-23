import { useState } from 'react';
import { serviceCategories } from '../data/services';

const KNOWN_COMPETITORS = [
  { label: 'Nouveau Health & Wellness', url: 'https://nouveauhealthandwellness.com/' },
  { label: 'Hamilton Aesthetics', url: 'https://hamiltonpalmbeach.com/' },
  { label: 'Aesthetics by Kallee', url: 'https://aestheticsbykallee.com/' },
  { label: 'The Aesthetics Lounge and Spa', url: 'https://palmbeachgardens.theaestheticsloungeandspa.com/' },
];

export default function MarketCheck() {
  const [urls, setUrls] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  function updateUrl(i, value) {
    setUrls(u => u.map((existing, idx) => (idx === i ? value : existing)));
  }

  function addUrl(value = '') {
    setUrls(u => (u.length >= 5 ? u : [...u, value]));
  }

  function removeUrl(i) {
    setUrls(u => u.filter((_, idx) => idx !== i));
  }

  function addKnown(url) {
    if (urls.includes(url)) return;
    setUrls(u => {
      const withoutBlank = u.filter(Boolean);
      return withoutBlank.length >= 5 ? withoutBlank : [...withoutBlank, url];
    });
  }

  async function handleCheck(e) {
    e.preventDefault();
    const toScan = [...new Set(urls.filter(Boolean))];
    if (toScan.length === 0) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/.netlify/functions/competitor-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: toScan }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '80px auto', padding: '0 32px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: '#2C3E4A', marginBottom: 8 }}>
        Local Market Scan
      </h1>
      <p style={{ color: '#6E7681', marginBottom: 24 }}>
        Staff tool — pull listed treatments and prices from up to 5 Palm Beach Gardens-area competitors at once via Firecrawl, and compare against Vantage's own pricing below.
      </p>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: '0.8125rem', color: '#6E7681', marginBottom: 10 }}>Quick add — researched local competitors:</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {KNOWN_COMPETITORS.map(c => (
            <button
              key={c.url}
              type="button"
              onClick={() => addKnown(c.url)}
              style={{
                background: '#F4EBE0', border: '1px solid rgba(44,62,74,0.12)', borderRadius: 2,
                padding: '6px 14px', fontSize: '0.8125rem', color: '#2C3E4A', cursor: 'pointer',
              }}
            >
              + {c.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleCheck} style={{ marginBottom: 24 }}>
        {urls.map((u, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <input
              type="url"
              value={u}
              onChange={e => updateUrl(i, e.target.value)}
              placeholder="https://competitor.com/pricing"
              style={{ flex: 1, padding: '12px 16px', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2 }}
            />
            {urls.length > 1 && (
              <button type="button" onClick={() => removeUrl(i)} style={{
                background: 'none', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2,
                padding: '0 16px', cursor: 'pointer', color: '#6E7681',
              }}>
                Remove
              </button>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button
            type="button"
            onClick={() => addUrl()}
            disabled={urls.length >= 5}
            style={{
              background: 'none', border: '1px dashed rgba(44,62,74,0.3)', borderRadius: 2,
              padding: '10px 20px', cursor: urls.length >= 5 ? 'default' : 'pointer', color: '#3F5A6B',
              opacity: urls.length >= 5 ? 0.5 : 1,
            }}
          >
            + Add another URL
          </button>
          <button type="submit" disabled={loading} style={{
            background: '#2C3E4A', color: '#FAF7F3', border: 'none',
            padding: '10px 24px', borderRadius: 2, cursor: loading ? 'default' : 'pointer',
          }}>
            {loading ? 'Scanning…' : `Scan ${urls.filter(Boolean).length || ''} site${urls.filter(Boolean).length === 1 ? '' : 's'}`}
          </button>
        </div>
      </form>

      {error && <p style={{ color: '#B5605A', marginBottom: 24 }}>{error}</p>}

      {results && results.map((r, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: '1rem', color: '#2C3E4A', marginBottom: 4 }}>{r.url}</h3>
          {r.error && <p style={{ color: '#B5605A', fontSize: '0.875rem' }}>{r.error}</p>}
          {!r.error && (!r.services || r.services.length === 0) && (
            <p style={{ color: '#6E7681', fontSize: '0.875rem' }}>No pricing found on that page.</p>
          )}
          {!r.error && r.services && r.services.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(44,62,74,0.18)' }}>
                  <th style={{ padding: '8px 0' }}>Service</th>
                  <th style={{ padding: '8px 0' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {r.services.map((s, j) => (
                  <tr key={j} style={{ borderBottom: '1px solid rgba(44,62,74,0.08)' }}>
                    <td style={{ padding: '8px 0' }}>{s.name}</td>
                    <td style={{ padding: '8px 0' }}>{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      {results && results.length > 0 && (
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(44,62,74,0.12)' }}>
          <h3 style={{ fontSize: '1rem', color: '#2C3E4A', marginBottom: 16 }}>For reference — Vantage's current pricing</h3>
          {serviceCategories.map((cat, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#3F5A6B', marginBottom: 8 }}>{cat.title}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {cat.services.map((s, j) => (
                    <tr key={j} style={{ borderBottom: '1px solid rgba(44,62,74,0.08)' }}>
                      <td style={{ padding: '6px 0', fontSize: '0.875rem' }}>{s.name}</td>
                      <td style={{ padding: '6px 0', fontSize: '0.875rem', color: '#6E7681' }}>{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
