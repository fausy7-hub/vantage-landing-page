export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 80,
      background: 'linear-gradient(160deg, #FAF7F3 0%, #F4EBE0 55%, #DDC4A0 100%)',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: '60%', height: '80%',
        background: 'radial-gradient(circle, rgba(201,168,118,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 80,
          alignItems: 'center',
        }} className="hero-grid">
          {/* Text */}
          <div>
            <div style={{
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#6B8E9E',
              marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
              NP-led · Medically supervised
            </div>

            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '3.4rem', lineHeight: 1.12,
              color: '#2C3E4A', marginBottom: 28, maxWidth: '11ch',
            }}>
              Look like you've got it together.{' '}
              <em style={{ fontStyle: 'italic', color: '#C9A876' }}>Because you do.</em>
            </h1>

            <p style={{
              fontSize: '1.0625rem', color: '#6E7681',
              maxWidth: '38ch', marginBottom: 36,
            }}>
              Discreet, medically supervised aesthetics and longevity care for professionals who don't have time to look as tired as they feel.
            </p>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#consult"
                style={{
                  background: '#2C3E4A', color: '#FAF7F3',
                  padding: '16px 32px', borderRadius: 2,
                  fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em',
                  border: '1px solid #2C3E4A',
                  transition: 'background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#3F5A6B';
                  e.currentTarget.style.borderColor = '#3F5A6B';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,118,0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#2C3E4A';
                  e.currentTarget.style.borderColor = '#2C3E4A';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Book a consultation
              </a>
              <a href="#approach" style={{
                color: '#2C3E4A', fontSize: '0.875rem', fontWeight: 500,
                borderBottom: '1px solid #6B8E9E', paddingBottom: 4,
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A876'; e.currentTarget.style.color = '#3F5A6B'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#6B8E9E'; e.currentTarget.style.color = '#2C3E4A'; }}
              >
                How it works
              </a>
            </div>
          </div>

          {/* Visual panels */}
          <div style={{ position: 'relative', height: 480 }} className="hero-visual">
            {/* Panel 1 — dark */}
            <div style={{
              position: 'absolute', width: '78%', height: '88%', top: 0, right: 0,
              background: 'linear-gradient(150deg, #2C3E4A 0%, #3F5A6B 100%)',
              borderRadius: 4,
              boxShadow: '0 30px 60px -20px rgba(44,62,74,0.25)',
            }}>
              <div style={{
                padding: 36, height: '100%', display: 'flex',
                flexDirection: 'column', justifyContent: 'space-between', color: '#FAF7F3',
              }}>
                <div style={{
                  fontSize: '0.6875rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#DDC4A0', fontWeight: 600,
                }}>
                  Maintenance Membership
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '3.2rem', lineHeight: 1 }}>
                    15<span style={{ fontSize: '1.5rem' }}>min</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'rgba(250,247,243,0.75)', marginTop: 6, maxWidth: '22ch' }}>
                    Average visit length — built around your calendar, not the other way around.
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2 — light */}
            <div style={{
              position: 'absolute', width: '58%', height: '56%', bottom: 0, left: 0,
              background: '#FAF7F3', borderRadius: 4,
              border: '1px solid rgba(44,62,74,0.08)',
              boxShadow: '0 30px 60px -20px rgba(44,62,74,0.25)',
            }}>
              <div style={{
                padding: 32, display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', height: '100%',
              }}>
                <div style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B8E9E', fontWeight: 600 }}>
                  First conversation
                </div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.375rem', color: '#2C3E4A', lineHeight: 1.4 }}>
                  "I just want to look like myself. Rested."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6E7681' }}>
                  — Most common first sentence in a consultation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-visual { height: 380px !important; order: -1; }
          .hero-grid h1 { font-size: 2.6rem !important; max-width: none !important; }
        }
        @media (max-width: 768px) {
          .hero-grid h1 { font-size: 2.1rem !important; }
        }
      `}</style>
    </section>
  );
}
