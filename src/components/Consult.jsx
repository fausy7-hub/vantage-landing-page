import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Consult() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) { e.target.reportValidity(); return; }

    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from('consultation_requests').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
    });

    setSubmitting(false);

    if (insertError) {
      console.error(insertError);
      setError('Something went wrong — please try again or email us directly.');
      return;
    }

    setSubmitted(true);
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    border: '1px solid rgba(44,62,74,0.18)', borderRadius: 2,
    fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem',
    color: '#1F2D36', background: '#fff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
  };

  function focusStyle(e) {
    e.currentTarget.style.borderColor = '#C9A876';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,118,0.18)';
  }
  function blurStyle(e) {
    e.currentTarget.style.borderColor = 'rgba(44,62,74,0.18)';
    e.currentTarget.style.boxShadow = 'none';
  }

  return (
    <section id="consult" style={{
      background: 'linear-gradient(160deg, #F4EBE0 0%, #DDC4A0 100%)',
      padding: '110px 0', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#6B8E9E',
          marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          Get started
        </div>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: '2.75rem',
          color: '#2C3E4A', maxWidth: '16ch', margin: '0 auto 20px', lineHeight: 1.25,
        }}>
          Your first step starts with a conversation, not a needle.
        </h2>
        <p style={{ color: '#3F5A6B', maxWidth: '46ch', margin: '0 auto 40px', fontSize: '1.0625rem' }}>
          Tell us a little about what's on your mind. No pressure, no obligation — we'll reach out to schedule a complimentary consultation.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate style={{
            maxWidth: 520, margin: '0 auto', textAlign: 'left',
            background: '#FAF7F3', borderRadius: 4, padding: 40,
            border: '1px solid rgba(44,62,74,0.08)',
            boxShadow: '0 24px 48px -24px rgba(44,62,74,0.15)',
          }}>
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
              { id: 'phone', label: 'Phone', type: 'tel', placeholder: '(561) 555-0100', required: false },
            ].map(field => (
              <div key={field.id} style={{ marginBottom: 20 }}>
                <label htmlFor={field.id} style={{
                  display: 'block', fontSize: '0.8125rem', fontWeight: 500,
                  color: '#2C3E4A', marginBottom: 8, letterSpacing: '0.02em',
                }}>{field.label}</label>
                <input
                  id={field.id} name={field.id} type={field.type}
                  placeholder={field.placeholder} required={field.required}
                  value={form[field.id]}
                  onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                  style={inputStyle}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
            ))}

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="message" style={{
                display: 'block', fontSize: '0.8125rem', fontWeight: 500,
                color: '#2C3E4A', marginBottom: 8, letterSpacing: '0.02em',
              }}>
                What brings you in? <span style={{ fontWeight: 400, color: '#6E7681' }}>(optional)</span>
              </label>
              <textarea
                id="message" name="message"
                placeholder="Share as much or as little as you'd like."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>

            <button type="submit" disabled={submitting} style={{
              width: '100%', background: '#2C3E4A', color: '#FAF7F3',
              border: '1px solid #2C3E4A', padding: '16px 32px', borderRadius: 2,
              fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em',
              cursor: submitting ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif',
              transition: 'background 0.25s ease, transform 0.2s ease',
              opacity: submitting ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#3F5A6B'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background = '#2C3E4A'; e.currentTarget.style.transform = 'none'; }}
            >
              {submitting ? 'Sending…' : 'Request a consultation'}
            </button>

            {error && (
              <p style={{ fontSize: '0.8125rem', color: '#B5605A', marginTop: 16, textAlign: 'center' }}>
                {error}
              </p>
            )}

            <p style={{ fontSize: '0.8125rem', color: '#6E7681', marginTop: 16, textAlign: 'center' }}>
              We'll respond within one business day. Nothing is booked until we've spoken.
            </p>
          </form>
        ) : (
          <div style={{
            maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: 40,
            background: '#FAF7F3', borderRadius: 4,
            border: '1px solid rgba(44,62,74,0.08)',
            boxShadow: '0 24px 48px -24px rgba(44,62,74,0.15)',
          }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', color: '#2C3E4A', marginBottom: 10 }}>
              Thank you
            </h3>
            <p style={{ color: '#6E7681', fontSize: '0.9375rem' }}>
              We've received your message and will be in touch within one business day to schedule your consultation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
