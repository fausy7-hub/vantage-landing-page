import { useReveal } from '../hooks/useReveal';

const cards = [
  {
    title: 'Aesthetics',
    desc: 'Refined, natural results — designed to look like rest, not work.',
    services: [
      { name: 'Neuromodulator (per area)', price: '$300–450' },
      { name: 'Dermal filler (per syringe)', price: '$650–900' },
      { name: 'Biostimulator series', price: '$700–900/vial' },
    ],
  },
  {
    title: 'Longevity & Wellness',
    desc: 'Energy, weight, and hormone support built on real lab work.',
    services: [
      { name: 'Executive wellness consult + labs', price: '$250–400' },
      { name: 'Hormone optimization follow-up', price: '$150–250' },
      { name: 'IV / vitamin therapy', price: '$50–150' },
    ],
  },
];

export default function Services() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="services" style={{ background: '#F4EBE0', padding: '110px 0' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headRef} className="reveal" style={{ maxWidth: 640, marginBottom: 64 }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6B8E9E',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
            What we offer
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: '#2C3E4A', lineHeight: 1.2, marginBottom: 16 }}>
            Core treatments and longevity care, under one provider.
          </h2>
          <p style={{ color: '#6E7681', fontSize: '1.0625rem' }}>
            Every service is performed or supervised by a Nurse Practitioner with a surgical and chronic-care background — so aesthetics and overall health are never treated as separate conversations.
          </p>
        </div>

        <div ref={gridRef} className="reveal services-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24,
        }}>
          {cards.map((card, i) => (
            <div key={i}
              style={{
                background: '#FAF7F3', borderRadius: 4, padding: 40,
                border: '1px solid rgba(44,62,74,0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 24px 48px -24px rgba(44,62,74,0.2)';
                e.currentTarget.style.borderColor = '#C9A876';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(44,62,74,0.06)';
              }}
            >
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.375rem', color: '#2C3E4A', marginBottom: 12 }}>
                {card.title}
              </h3>
              <p style={{ color: '#6E7681', fontSize: '0.9375rem', marginBottom: 24 }}>{card.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {card.services.map((s, j) => (
                  <div key={j} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    fontSize: '0.9375rem', paddingBottom: 12,
                    borderBottom: j < card.services.length - 1 ? '1px dashed rgba(44,62,74,0.12)' : 'none',
                  }}>
                    <span style={{ color: '#1F2D36', fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: '#3F5A6B', fontWeight: 600, whiteSpace: 'nowrap', paddingLeft: 16 }}>{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
