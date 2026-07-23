const points = [
  'Licensed Family Nurse Practitioner',
  'Full prescriptive authority',
  'OR & primary-care trained',
  'Palm Beach Gardens, FL',
];

export default function Trust() {
  return (
    <div style={{ background: '#F4EBE0', borderBottom: '1px solid rgba(44,62,74,0.06)' }}>
      <div className="trust-bar" style={{
        maxWidth: 1140, margin: '0 auto', padding: '20px 32px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexWrap: 'wrap', gap: '10px 40px',
      }}>
        {points.map((p, i) => (
          <span key={i} style={{
            fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.04em',
            color: '#3F5A6B', display: 'flex', alignItems: 'center', gap: 10,
            textTransform: 'uppercase',
          }}>
            {i > 0 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A876', display: 'inline-block' }} />}
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
