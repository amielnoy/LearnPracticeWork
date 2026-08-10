import { useLocale } from '../context/LocaleContext';

export function Hero() {
  const { locale } = useLocale();
  const hero = locale.hero;

  return (
    <header id="hero">
      <h1>
        <span>{hero.h1Line1}</span>
        <br />
        {hero.h1Line2}
      </h1>
      <p>{hero.p}</p>
      <div className="badges">
        {hero.badges.map((b, i) => (
          <span key={i} className="badge">
            {b}
          </span>
        ))}
      </div>
      <div className="hero-cta">
        {hero.cta.map((c, i) => (
          <a
            key={i}
            className={c.cls}
            href={c.href}
            onClick={() => {
              if (c.sampleResume) window.dispatchEvent(new CustomEvent('ata:sample-resume'));
              if (c.sampleInterview)
                window.dispatchEvent(new CustomEvent('ata:start-sample-interview'));
            }}
          >
            {c.label}
          </a>
        ))}
      </div>
      <div className="tldr">
        <b>{hero.tldr.heading}</b>
        <ul>
          {hero.tldr.items.map((item, i) => (
            <li key={i}>
              <b>{item.b}</b>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
