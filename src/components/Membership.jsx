import { useReveal } from '../hooks/useReveal';

const features = [
  'One neuromodulator session per quarter',
  '10% off all other services',
  'Priority booking — no waiting weeks for an opening',
  'Quarterly check-in on your overall plan',
];

export default function Membership() {
  const textRef = useReveal();
  const cardRef = useReveal();

  return (
    <section id="membership" style={{ background: '#2C3E4A', color: '#FAF7F3', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', bottom: '-40%', left: '-10%',
        width: '60%', height: '100%',
        background: 'radial-gradient(circle, rgba(107,142,158,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="membership-inner" style={{
        maxWidth: 1140, margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
        alignItems: 'center', position: 'relative', zIndex: 1,
      }}>
        <div ref={textRef} className="reveal">
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#DDC4A0',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#DDC4A0', display: 'block' }} />
            For ongoing care
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: '#FAF7F3', marginBottom: 20 }}>
            The Maintenance Membership
          </h2>
          <p style={{ color: 'rgba(250,247,243,0.65)', fontSize: '1.0625rem', maxWidth: '42ch' }}>
            For the people who'd rather build this into their routine than think about it every few months. One predictable visit, every quarter, with priority access whenever else you need us.
          </p>
        </div>

        <div ref={cardRef} className="reveal" style={{
          background: 'rgba(250,247,243,0.04)',
          border: '1px solid rgba(250,247,243,0.14)',
          borderRadius: 4, padding: 48,
        }}>
          <div style={{
            fontSize: '0.8125rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#C9A876', fontWeight: 600, marginBottom: 20,
          }}>
            Maintenance Membership
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3rem', marginBottom: 4 }}>
            $199<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'rgba(250,247,243,0.6)', fontWeight: 400 }}>/month</span>
          </div>

          <ul style={{ listStyle: 'none', margin: '28px 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {features.map((f, i) => (
              <li key={i} style={{ fontSize: '0.9375rem', color: 'rgba(250,247,243,0.8)', paddingLeft: 24, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#C9A876' }}>—</span>
                {f}
              </li>
            ))}
          </ul>

          <a href="#consult" style={{
            background: '#C9A876', color: '#2C3E4A',
            padding: '16px 32px', borderRadius: 2,
            fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.04em',
            display: 'block', textAlign: 'center',
            transition: 'background 0.25s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#DDC4A0'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#C9A876'; e.currentTarget.style.transform = 'none'; }}
          >
            Start your membership
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .membership-inner { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
}
