export default function Footer() {
  return (
    <footer style={{ background: '#2C3E4A', color: 'rgba(250,247,243,0.6)', padding: '64px 0 36px', fontSize: '0.875rem' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        <div className="footer-inner" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: 32,
          paddingBottom: 40, borderBottom: '1px solid rgba(250,247,243,0.1)', marginBottom: 28,
        }}>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#FAF7F3', marginBottom: 12 }}>
              Vantage<span style={{ color: '#C9A876' }}>.</span>
            </div>
            <p style={{ maxWidth: '28ch', color: 'rgba(250,247,243,0.6)' }}>
              Medical-grade aesthetics and longevity care, led by a Nurse Practitioner.
            </p>
          </div>

          <div className="footer-cols" style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{
                fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#6B8E9E', marginBottom: 16, fontWeight: 600,
              }}>Visit</h4>
              {[['#approach','Approach'],['#services','Services'],['#membership','Membership'],['#provider','About']].map(([href, label]) => (
                <a key={href} href={href} style={{
                  display: 'block', marginBottom: 10, color: 'rgba(250,247,243,0.6)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#DDC4A0'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,243,0.6)'}
                >{label}</a>
              ))}
            </div>
            <div>
              <h4 style={{
                fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#6B8E9E', marginBottom: 16, fontWeight: 600,
              }}>Contact</h4>
              <p style={{ display: 'block', marginBottom: 10, color: 'rgba(250,247,243,0.6)' }}>Palm Beach Gardens, FL</p>
              <p style={{ display: 'block', marginBottom: 10, color: 'rgba(250,247,243,0.6)' }}>By appointment</p>
              <a href="#consult" style={{
                display: 'block', marginBottom: 10, color: 'rgba(250,247,243,0.6)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#DDC4A0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,243,0.6)'}
              >Book a consultation</a>
            </div>
            <div>
              <h4 style={{
                fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#6B8E9E', marginBottom: 16, fontWeight: 600,
              }}>Legal</h4>
              <a href="#privacy" style={{
                display: 'block', marginBottom: 10, color: 'rgba(250,247,243,0.6)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#DDC4A0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,243,0.6)'}
              >Privacy policy</a>
              <p style={{ display: 'block', color: 'rgba(250,247,243,0.4)', fontSize: '0.75rem', maxWidth: '20ch' }}>
                Licensed Florida APRN — verification available on request
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
          fontSize: '0.8125rem', color: 'rgba(250,247,243,0.4)',
        }}>
          <div>© 2026 Vantage Health & Aesthetics. All rights reserved.</div>
          <div>NP-led · Medically supervised care</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-inner { flex-direction: column !important; }
          .footer-cols { gap: 40px !important; }
          .footer-bottom { flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}
