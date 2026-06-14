import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    phase: 'First',
    title: 'A real consultation',
    desc: 'No pressure, no upsell script. We talk through what you\'re noticing, what\'s realistic, and whether it\'s even something that needs treating yet.',
  },
  {
    phase: 'Then',
    title: 'A plan built around you',
    desc: 'Treatment plans factor in your calendar, your tolerance for downtime, and how natural you want the result to look — never the other way around.',
  },
  {
    phase: 'After',
    title: 'Maintenance, not crisis',
    desc: 'Once your plan is dialed in, future visits become routine — quarterly touch-ups booked the way you\'d book a dental cleaning, not an emergency.',
  },
];

export default function Approach() {
  const headRef = useReveal();
  const listRef = useReveal();

  return (
    <section id="approach" style={{ background: '#FAF7F3', padding: '110px 0' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headRef} className="reveal" style={{ maxWidth: 640, marginBottom: 64 }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6B8E9E',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
            The process
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: '#2C3E4A', lineHeight: 1.2, marginBottom: 16 }}>
            A conversation first. A plan that fits your week.
          </h2>
          <p style={{ color: '#6E7681', fontSize: '1.0625rem' }}>
            Every visit starts the same way — not with a treatment menu, but with a real conversation about your schedule, your stress, your sleep, and what's actually bothering you.
          </p>
        </div>

        <div ref={listRef} className="reveal">
          {steps.map((step, i) => (
            <div key={i}
              className="approach-row"
              style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 1fr',
                gap: 40, padding: '36px 0',
                borderTop: '1px solid rgba(44,62,74,0.1)',
                alignItems: 'start',
                transition: 'padding-left 0.3s ease',
                ...(i === steps.length - 1 ? { borderBottom: '1px solid rgba(44,62,74,0.1)' } : {}),
              }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = '12px'}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
            >
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '0.95rem', color: '#6B8E9E', letterSpacing: '0.04em' }}>
                {step.phase}
              </div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', color: '#2C3E4A' }}>
                {step.title}
              </div>
              <div style={{ color: '#6E7681', fontSize: '0.95rem' }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .approach-row { grid-template-columns: 70px 1fr !important; }
          .approach-row > div:last-child { grid-column: 2; }
        }
      `}</style>
    </section>
  );
}
