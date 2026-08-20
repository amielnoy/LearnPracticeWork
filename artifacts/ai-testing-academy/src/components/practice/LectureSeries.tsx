import { useLocale } from '../../context/LocaleContext';
import { useReveal } from '../../hooks/useReveal';
import { sectionNum } from '../../lib/sections';
import { EN, HE, lectureHref, type BankData, type LectureData } from '../../lib/lectures';

function LectureCard({ lec, bank, lang }: { lec: LectureData; bank: BankData; lang: string }) {
  // Derived rather than stored, so the link follows whichever host this build
  // is for. VITE_SITE_ORIGIN is substituted at build time; unset, it falls back
  // to the origin these links were pinned to before.
  const href = lectureHref(lec, lang, import.meta.env.VITE_SITE_ORIGIN);
  return (
    <div className="card" style={lec.ready ? {} : { opacity: 0.6 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span className="lecture-badge">
          {bank.lectureLabel} {lec.num}
        </span>
        {lec.ready ? (
          <span className="lecture-live">
            <span aria-hidden="true">● </span>
            {bank.liveLabel}
          </span>
        ) : (
          <span className="lecture-soon">{bank.comingSoon}</span>
        )}
      </div>
      <h4 style={{ marginBottom: '8px', fontSize: '1rem' }}>{lec.title}</h4>
      <p style={{ fontSize: '.88rem' }}>{lec.desc}</p>
      {lec.ready && href && (
        <a className="lecture-cta" href={href} target="_blank" rel="noopener noreferrer">
          {bank.openLecture}
        </a>
      )}
    </div>
  );
}

export function LectureSeries() {
  const { lang } = useLocale();
  const bank = lang === 'he' ? HE : EN;
  const sectionRef = useReveal();

  return (
    <section id="lecture-series" ref={sectionRef}>
      <h2>
        <span className="num">{sectionNum('lecture-series')}</span> {bank.title}
      </h2>
      <p className="lead reveal">{bank.lead}</p>
      {bank.tracks.map((track, idx) => (
        <div key={idx}>
          <h3
            style={{ marginTop: idx === 0 ? 0 : '48px', marginBottom: '6px', fontSize: '1.15rem' }}
          >
            {track.title}
          </h3>
          <p className="lead" style={{ marginTop: 0, marginBottom: '20px' }}>
            {track.lead}
          </p>
          <div className="grid">
            {track.lectures.map(lec => (
              <LectureCard key={lec.num} lec={lec} bank={bank} lang={lang} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
