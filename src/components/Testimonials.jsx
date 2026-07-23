import { useReveal } from '../hooks/useReveal';

const quotes = [
  {
    quote: "Nobody at the office has asked what's different. They just keep telling me I look rested.",
    context: 'Maintenance Membership patient',
  },
  {
    quote: "I've had appointments I dreaded. This wasn't one of them — it felt more like a check-in than a procedure.",
    context: 'First consultation patient',
  },
  {
    quote: 'She spent more time asking about my sleep than my forehead. That\'s when I trusted the plan.',
    context: 'Longevity & wellness patient',
  },
];

export default function Testimonials() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section style={{ background: '#FAF7F3', padding: '110px 0' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headRef} className="reveal" style={{ maxWidth: 640, marginBottom: 64 }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6B8E9E',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
            In their words
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: '#2C3E4A', lineHeight: 1.2, marginBottom: 16 }}>
            Shared with permission — details kept private by request.
          </h2>
          <p style={{ color: '#6E7681', fontSize: '1.0625rem' }}>
            Discretion is part of the care here, so we don't publish names or photos. What we can share is how it felt.
          </p>
        </div>

        <div ref={gridRef} className="reveal testimonial-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24,
        }}>
          {quotes.map((q, i) => (
            <div key={i} style={{
              background: '#F4EBE0', borderRadius: 4, padding: 32,
              border: '1px solid rgba(44,62,74,0.06)', display: 'flex',
              flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <p style={{
                fontFamily: "'DM Serif Display', serif", fontSize: '1.125rem',
                color: '#2C3E4A', lineHeight: 1.5, marginBottom: 20,
              }}>
                &ldquo;{q.quote}&rdquo;
              </p>
              <span style={{ fontSize: '0.8125rem', color: '#6B8E9E', fontWeight: 500 }}>
                — {q.context}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
