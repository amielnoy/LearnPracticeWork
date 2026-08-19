import { useLocale } from '../context/LocaleContext';
import { useReveal } from '../hooks/useReveal';
import { sectionNum } from '../lib/sections';
import { EN, HE, type BankData, type LectureData } from '../lib/lectures';

function LectureCard({ lec, bank }: { lec: LectureData; bank: BankData }) {
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
        <span
          style={{
            background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
            color: '#fff',
            borderRadius: '8px',
            padding: '3px 10px',
            fontFamily: 'monospace',
            fontSize: '.78rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {bank.lectureLabel} {lec.num}
        </span>
        {lec.ready ? (
          <span
            style={{
              background: 'var(--green)',
              color: '#fff',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '.7rem',
              fontWeight: 700,
              letterSpacing: '.03em',
            }}
          >
            <span aria-hidden="true">● </span>
            {bank.liveLabel}
          </span>
        ) : (
          <span style={{ color: 'var(--muted)', fontSize: '.75rem', fontStyle: 'italic' }}>
            {bank.comingSoon}
          </span>
        )}
      </div>
      <h4 style={{ marginBottom: '8px', fontSize: '1rem' }}>{lec.title}</h4>
      <p style={{ fontSize: '.88rem' }}>{lec.desc}</p>
      {lec.ready && lec.url && (
        <a className="lecture-cta" href={lec.url} target="_blank" rel="noopener noreferrer">
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
              <LectureCard key={lec.num} lec={lec} bank={bank} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
