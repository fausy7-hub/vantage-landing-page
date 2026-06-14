import { useReveal } from '../hooks/useReveal';

const timeline = [
  { year: 'OR', desc: '5+ years as a perioperative nurse, concentrated in plastic and reconstructive surgery — deep anatomical training most injectors never have.' },
  { year: 'FP', desc: 'Years in primary and family practice, managing weight, hormones, and chronic conditions for a wide range of patients.' },
  { year: 'NP', desc: 'Licensed Family Nurse Practitioner with full prescriptive authority — care plans, not just injections.' },
];

export default function Provider() {
  const cardRef = useReveal();
  const textRef = useReveal();

  return (
    <section id="provider" style={{ background: '#FAF7F3', padding: '110px 0' }}>
      <div className="provider-inner" style={{
        maxWidth: 1140, margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 80, alignItems: 'center',
      }}>
        <div ref={cardRef} className="reveal" style={{
          background: '#F4EBE0', borderRadius: 4, padding: 48,
        }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6B8E9E',
            marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
            Your provider
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: '#2C3E4A', marginBottom: 8 }}>
            Helen Ferreira, FNP
          </div>
          <div style={{ fontSize: '0.9375rem', color: '#6B8E9E', fontWeight: 500, marginBottom: 28 }}>
            Family Nurse Practitioner
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 16, fontSize: '0.875rem' }}>
                <span style={{ color: '#C9A876', fontWeight: 600 }}>{t.year}</span>
                <span style={{ color: '#6E7681' }}>{t.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={textRef} className="reveal">
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6B8E9E',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
            Why it matters
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: '#2C3E4A', marginBottom: 24, lineHeight: 1.25 }}>
            An anatomist's eye. A clinician's judgment.
          </h2>
          <p style={{ color: '#6E7681', fontSize: '1.0625rem', marginBottom: 20, maxWidth: '50ch' }}>
            Most injectors learn technique. Helen learned anatomy first — years in the operating room, working alongside plastic and reconstructive surgeons, before she ever picked up a syringe for aesthetics.
          </p>
          <p style={{ color: '#6E7681', fontSize: '1.0625rem', marginBottom: 20, maxWidth: '50ch' }}>
            That background shows up in the results: subtle, proportionate, and built around how your face actually moves — not a template applied to everyone who sits in the chair.
          </p>
          <p style={{ color: '#6E7681', fontSize: '1.0625rem', marginBottom: 32, maxWidth: '50ch' }}>
            It also means your aesthetic care doesn't stop at the surface. If something's showing up in your skin or energy that points to something else — sleep, stress, hormones — that's part of the conversation too.
          </p>
          <a href="#consult" style={{
            color: '#2C3E4A', fontSize: '0.875rem', fontWeight: 500,
            borderBottom: '1px solid #6B8E9E', paddingBottom: 4,
            transition: 'border-color 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A876'; e.currentTarget.style.color = '#3F5A6B'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#6B8E9E'; e.currentTarget.style.color = '#2C3E4A'; }}
          >
            Book your consultation
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .provider-inner { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
}
