import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const faqs = [
  {
    q: 'What actually happens at the first visit?',
    a: 'A conversation, not a treatment. We talk through what you\'re noticing, review your health history, and discuss what\'s realistic — nothing is performed at the consultation unless you decide to move forward that day.',
  },
  {
    q: 'Will anyone be able to tell I\'ve had something done?',
    a: 'That\'s the goal — no. Every plan is built around subtle, proportionate results and a schedule that avoids visible downtime before events, meetings, or travel.',
  },
  {
    q: 'How much does it cost?',
    a: 'Services are priced individually and confirmed during your consultation once we know your plan — see the Services section for a general range. The Maintenance Membership is a flat $199/month.',
  },
  {
    q: 'Is this covered by insurance or FSA/HSA?',
    a: 'Aesthetic treatments are typically self-pay. Some longevity and wellness services may qualify for FSA/HSA reimbursement — ask during your consultation and we\'ll point you to what you need.',
  },
  {
    q: 'What if I\'m not sure I want to do anything yet?',
    a: 'That\'s a normal place to start. The consultation carries no obligation — plenty of people come in, ask questions, and decide to wait. There\'s no pressure either way.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(44,62,74,0.1)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 24, padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', font: 'inherit',
        }}
        aria-expanded={isOpen}
      >
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.1875rem', color: '#2C3E4A' }}>
          {item.q}
        </span>
        <span style={{
          flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
          border: '1px solid #C9A876', color: '#C9A876',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', lineHeight: 1, transition: 'transform 0.25s ease',
          transform: isOpen ? 'rotate(45deg)' : 'none',
        }}>+</span>
      </button>
      {isOpen && (
        <p style={{ color: '#6E7681', fontSize: '0.9375rem', lineHeight: 1.7, paddingBottom: 24, maxWidth: '62ch' }}>
          {item.a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const headRef = useReveal();
  const listRef = useReveal();

  return (
    <section style={{ background: '#F4EBE0', padding: '110px 0' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headRef} className="reveal" style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#6B8E9E',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#C9A876', display: 'block' }} />
            Before you reach out
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.5rem', color: '#2C3E4A', lineHeight: 1.2 }}>
            Questions worth answering upfront.
          </h2>
        </div>

        <div ref={listRef} className="reveal">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
