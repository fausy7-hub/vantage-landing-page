import { useReveal } from '../hooks/useReveal';

const items = [
  {
    cue: 'Catching your reflection and not quite recognizing the tired version looking back.',
    body: 'It\'s not dramatic. It\'s just there — in elevators, in video calls, in photos you didn\'t ask to be in.',
  },
  {
    cue: 'Someone telling you that you "look tired," meant kindly, landing like a verdict.',
    body: 'You know it\'s not personal. It still sits with you longer than it should.',
  },
  {
    cue: 'Wondering when you\'ll find time to deal with something you\'ve been putting off for months.',
    body: 'Between work and everything else, "later" keeps becoming "later still."',
  },
];

export default function Recognition() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section style={{ background: '#2C3E4A', padding: '110px 0' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headRef} className="reveal" style={{ maxWidth: 640, marginBottom: 64 }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#DDC4A0',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#DDC4A0', display: 'block' }} />
            If this sounds familiar
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem',
            color: '#FAF7F3', lineHeight: 1.2, marginBottom: 16,
          }}>
            You haven't been imagining it.
          </h2>
          <p style={{ color: 'rgba(250,247,243,0.65)', fontSize: '1.0625rem' }}>
            Most people who walk through our door aren't chasing a transformation. They're responding to something quieter — a feeling that's been building for a while.
          </p>
        </div>

        <div ref={gridRef} className="reveal recognition-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: 'rgba(250,247,243,0.08)',
          border: '1px solid rgba(250,247,243,0.08)',
        }}>
          {items.map((item, i) => (
            <div key={i}
              style={{ background: '#2C3E4A', padding: '40px 36px', transition: 'background 0.3s ease', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.background = '#344b59'}
              onMouseLeave={e => e.currentTarget.style.background = '#2C3E4A'}
            >
              <span style={{
                fontFamily: "'DM Serif Display', serif", fontSize: '1.6rem',
                color: '#C9A876', marginBottom: 18, display: 'block',
              }}>"</span>
              <p style={{
                fontFamily: "'DM Serif Display', serif", fontSize: '1.125rem',
                color: '#FAF7F3', marginBottom: 10, lineHeight: 1.4,
              }}>{item.cue}</p>
              <p style={{ fontSize: '0.95rem', color: 'rgba(250,247,243,0.78)', lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .recognition-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
