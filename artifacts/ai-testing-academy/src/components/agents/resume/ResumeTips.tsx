import type { Locale } from '../../../lib/locales';

/** The static do/don't guidance above the tool. Presentation only. */
export function ResumeTips({ t }: { t: Locale['resume'] }) {
  return (
    <div className="card reveal" style={{ marginBottom: '22px' }}>
      <h3>{t.tipsTitle}</h3>
      <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginTop: '-4px' }}>{t.tipsLead}</p>
      <div className="result-cols" style={{ marginTop: '14px' }}>
        <TipList title={t.doTitle} id="resumeTipsDo" color="var(--green)" mark="✓" tips={t.dos} />
        <TipList
          title={t.dontTitle}
          id="resumeTipsDont"
          color="var(--red)"
          mark="✗"
          tips={t.donts}
        />
      </div>
      <p className="tips-source" style={{ marginTop: '14px', fontSize: '.85rem' }}>
        <a href={t.tipsSourceUrl} target="_blank" rel="noopener noreferrer">
          {t.tipsSourceLabel}
        </a>
      </p>
      <a
        href={t.tipsExpertUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ghost"
        style={{ display: 'inline-block', marginTop: '10px', textDecoration: 'none' }}
      >
        {t.tipsExpertBtn}
      </a>
    </div>
  );
}

interface TipListProps {
  title: string;
  id: string;
  color: string;
  mark: string;
  tips: readonly string[];
}

function TipList({ title, id, color, mark, tips }: TipListProps) {
  return (
    <div>
      <h4 style={{ color }}>{title}</h4>
      <ul id={id}>
        {tips.map((tip, i) => (
          <li key={i}>
            <span style={{ color }} aria-hidden="true">
              {mark}{' '}
            </span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
