import { useLocale } from '../context/LocaleContext';

/**
 * A short, hand-curated highlight reel for the homepage. Content lives in the
 * locale files (`whatsNew.items`) so adding or retiring an announcement is a
 * content change, not a code change.
 */
export function WhatsNew() {
  const t = useLocale().locale.whatsNew;
  if (!t.items.length) return null;

  return (
    <section id="whats-new" aria-label={t.title}>
      <div
        className="card"
        style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(13,148,136,.1), rgba(30,58,95,.1))',
        }}
      >
        <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem' }}>{t.title}</h3>
        {t.items.map((item, idx) => (
          <div key={idx} style={{ marginBottom: idx === t.items.length - 1 ? 0 : '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '.92rem' }}>{item.title}</div>
            <p style={{ margin: '4px 0 8px', fontSize: '.85rem' }}>{item.desc}</p>
            <a href={item.href} className="lecture-cta" style={{ fontSize: '.82rem' }}>
              {item.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
