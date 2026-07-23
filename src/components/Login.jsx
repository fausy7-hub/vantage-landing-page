import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('signin'); // 'signin' | 'reset'
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) {
      setError('Invalid email or password.');
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);

    setLoading(false);
    if (resetError) {
      setError('Something went wrong sending that email — try again.');
      return;
    }
    setResetSent(true);
  }

  return (
    <div style={{
      maxWidth: 380, margin: '120px auto', padding: '40px 32px',
      fontFamily: 'Inter, sans-serif', background: '#FAF7F3',
      border: '1px solid rgba(44,62,74,0.08)', borderRadius: 4,
      boxShadow: '0 24px 48px -24px rgba(44,62,74,0.15)',
    }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', color: '#2C3E4A', marginBottom: 24 }}>
        Staff sign in
      </h1>

      {mode === 'reset' ? (
        resetSent ? (
          <p style={{ color: '#6E7681', fontSize: '0.9375rem' }}>
            If an account exists for {email}, a password reset link is on its way.
          </p>
        ) : (
          <form onSubmit={handleReset}>
            <p style={{ color: '#6E7681', fontSize: '0.875rem', marginBottom: 16 }}>
              Enter your email and we'll send you a reset link.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="reset-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#2C3E4A', marginBottom: 8 }}>
                Email
              </label>
              <input
                id="reset-email" type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2 }}
              />
            </div>

            {error && <p style={{ color: '#B5605A', fontSize: '0.875rem', marginBottom: 16 }}>{error}</p>}

            <button type="submit" disabled={loading} style={{
              width: '100%', background: '#2C3E4A', color: '#FAF7F3', border: 'none',
              padding: '14px 24px', borderRadius: 2, cursor: loading ? 'default' : 'pointer', marginBottom: 12,
            }}>
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
            <button type="button" onClick={() => { setMode('signin'); setError(null); }} style={{
              width: '100%', background: 'none', border: 'none', color: '#6B8E9E',
              fontSize: '0.8125rem', cursor: 'pointer', padding: '4px 0',
            }}>
              Back to sign in
            </button>
          </form>
        )
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="login-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#2C3E4A', marginBottom: 8 }}>
              Email
            </label>
            <input
              id="login-email" type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="login-password" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#2C3E4A', marginBottom: 8 }}>
              Password
            </label>
            <input
              id="login-password" type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2 }}
            />
          </div>

          <button type="button" onClick={() => { setMode('reset'); setError(null); setResetSent(false); }} style={{
            background: 'none', border: 'none', color: '#6B8E9E', fontSize: '0.8125rem',
            cursor: 'pointer', padding: 0, marginBottom: 20, display: 'inline-block',
          }}>
            Forgot password?
          </button>

          {error && <p style={{ color: '#B5605A', fontSize: '0.875rem', marginBottom: 16 }}>{error}</p>}

          <button type="submit" disabled={loading} style={{
            width: '100%', background: '#2C3E4A', color: '#FAF7F3', border: 'none',
            padding: '14px 24px', borderRadius: 2, cursor: loading ? 'default' : 'pointer',
          }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      )}
    </div>
  );
}
