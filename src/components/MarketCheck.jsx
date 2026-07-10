import { useState } from 'react';

export default function MarketCheck() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState(null);

  async function handleCheck(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setServices(null);

    try {
      const res = await fetch('/.netlify/functions/competitor-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setServices(data.services);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '80px auto', padding: '0 32px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: '#2C3E4A', marginBottom: 8 }}>
        Market Pricing Snapshot
      </h1>
      <p style={{ color: '#6E7681', marginBottom: 24 }}>
        Staff tool — paste a competitor's pricing page and pull their listed treatments and prices via Firecrawl.
      </p>

      <form onSubmit={handleCheck} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <input
          type="url"
          required
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://competitor.com/pricing"
          style={{ flex: 1, padding: '12px 16px', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2 }}
        />
        <button type="submit" disabled={loading} style={{
          background: '#2C3E4A', color: '#FAF7F3', border: 'none',
          padding: '12px 24px', borderRadius: 2, cursor: loading ? 'default' : 'pointer',
        }}>
          {loading ? 'Checking…' : 'Check pricing'}
        </button>
      </form>

      {error && <p style={{ color: '#B5605A' }}>{error}</p>}

      {services && services.length === 0 && (
        <p style={{ color: '#6E7681' }}>No pricing found on that page.</p>
      )}

      {services && services.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(44,62,74,0.18)' }}>
              <th style={{ padding: '8px 0' }}>Service</th>
              <th style={{ padding: '8px 0' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(44,62,74,0.08)' }}>
                <td style={{ padding: '8px 0' }}>{s.name}</td>
                <td style={{ padding: '8px 0' }}>{s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
