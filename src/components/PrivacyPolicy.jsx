export default function PrivacyPolicy() {
  return (
    <div style={{
      maxWidth: 760, margin: '0 auto', padding: '96px 32px 120px',
      fontFamily: 'Inter, sans-serif', color: '#1F2D36',
    }}>
      <a href="#" style={{ fontSize: '0.8125rem', color: '#6B8E9E', display: 'inline-block', marginBottom: 32 }}>
        ← Back to Vantage
      </a>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', color: '#2C3E4A', marginBottom: 8 }}>
        Privacy Policy &amp; Notice of Privacy Practices
      </h1>
      <p style={{ color: '#6E7681', fontSize: '0.875rem', marginBottom: 40 }}>Last updated July 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontSize: '0.9375rem', lineHeight: 1.75, color: '#3F5A6B' }}>
        <section>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#2C3E4A', marginBottom: 10 }}>
            What we collect
          </h2>
          <p>
            When you submit a consultation request, we collect the information you provide directly: your name, email address, phone number, and anything you choose to share about what brings you in. We do not use tracking pixels or sell your information to third parties.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#2C3E4A', marginBottom: 10 }}>
            How we use it
          </h2>
          <p>
            Consultation requests are used only to respond to you, schedule your visit, and maintain your patient record. Information you share about symptoms, concerns, or health history is treated as protected health information and is only accessed by Helen Ferreira, FNP and authorized staff involved in your care.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#2C3E4A', marginBottom: 10 }}>
            How it's stored
          </h2>
          <p>
            Submissions are stored in an access-controlled database. Only authenticated staff can view consultation requests; the public site can only submit new requests, never read existing ones.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#2C3E4A', marginBottom: 10 }}>
            Your rights
          </h2>
          <p>
            You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete it if you are not an active patient. To make a request, email us using the contact details on this site.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#2C3E4A', marginBottom: 10 }}>
            Questions
          </h2>
          <p>
            If you have questions about this policy or how your information is handled, reach out through the consultation form and note that it's a privacy question — we'll respond directly.
          </p>
        </section>
      </div>
    </div>
  );
}
