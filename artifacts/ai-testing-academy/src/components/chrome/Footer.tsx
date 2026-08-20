import { useLocale } from '../../context/LocaleContext';

export function Footer() {
  const { locale, lang } = useLocale();
  const f = locale.footer;
  const base = import.meta.env.BASE_URL;
  const labels =
    lang === 'he'
      ? {
          privacy: 'פרטיות',
          terms: 'תנאי שימוש',
          accessibility: 'נגישות',
          cancellation: 'ביטול והחזר',
          contact: 'יצירת קשר',
        }
      : {
          privacy: 'Privacy',
          terms: 'Terms',
          accessibility: 'Accessibility',
          cancellation: 'Cancellation & refunds',
          contact: 'Contact',
        };

  return (
    <footer id="site-footer">
      <p>
        © {f.year} {f.text}{' '}
        <a
          href={f.authorHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)' }}
        >
          {f.authorName}
        </a>{' '}
        {f.suffix}
      </p>
      <nav className="footer-links" aria-label={lang === 'he' ? 'מידע משפטי' : 'Legal information'}>
        <a href={`${base}privacy`}>{labels.privacy}</a>
        <a href={`${base}terms`}>{labels.terms}</a>
        <a href={`${base}accessibility`}>{labels.accessibility}</a>
        <a href={`${base}cancellation`}>{labels.cancellation}</a>
        <a href="mailto:amielnoy@gmail.com">{labels.contact}</a>
      </nav>
    </footer>
  );
}
