import { useLocale } from '../../context/LocaleContext';

export function Footer() {
  const { locale } = useLocale();
  const f = locale.footer;

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
    </footer>
  );
}
