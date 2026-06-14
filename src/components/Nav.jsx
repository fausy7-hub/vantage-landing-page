import { useState, useEffect } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#approach', label: 'Approach' },
    { href: '#services', label: 'Services' },
    { href: '#membership', label: 'Membership' },
    { href: '#provider', label: 'About' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,247,243,0.95)' : 'rgba(250,247,243,0.85)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(44,62,74,0.08)',
      transition: 'background 0.3s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 32px', maxWidth: 1140, margin: '0 auto',
      }}>
        <a href="#" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.35rem', letterSpacing: '0.02em', color: '#2C3E4A' }}>
          Vantage<span style={{ color: '#C9A876' }}>.</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: '0.875rem', fontWeight: 500, color: '#3F5A6B',
              position: 'relative', padding: '4px 0',
            }}
            onMouseEnter={e => e.currentTarget.querySelector('span').style.width = '100%'}
            onMouseLeave={e => e.currentTarget.querySelector('span').style.width = '0'}
            >
              {l.label}
              <span style={{
                position: 'absolute', left: 0, bottom: -2, width: 0, height: 1,
                background: '#C9A876', transition: 'width 0.25s ease', display: 'block'
              }} />
            </a>
          ))}
          <a href="#consult" style={{
            background: '#2C3E4A', color: '#FAF7F3', padding: '11px 24px',
            borderRadius: 2, fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.03em',
            transition: 'background 0.25s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#3F5A6B'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2C3E4A'; e.currentTarget.style.transform = 'none'; }}
          >
            Book a consultation
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          style={{
            display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer',
            background: 'none', border: 'none', padding: 8,
          }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 22, height: 1.5, background: '#2C3E4A', display: 'block', transition: 'all 0.3s ease' }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#FAF7F3', padding: '24px 32px',
          display: 'flex', flexDirection: 'column', gap: 20,
          borderBottom: '1px solid rgba(44,62,74,0.08)',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#3F5A6B' }}>
              {l.label}
            </a>
          ))}
          <a href="#consult" onClick={() => setOpen(false)} style={{
            background: '#2C3E4A', color: '#FAF7F3', padding: '12px 24px',
            borderRadius: 2, fontSize: '0.875rem', fontWeight: 500, textAlign: 'center',
          }}>
            Book a consultation
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
