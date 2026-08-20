import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProgress } from '../context/ProgressContext';
import { EN as LECTURES_EN, HE as LECTURES_HE } from '../lib/lectures';

/**
 * Total counts come from the same content the rest of the app renders, not
 * from a hardcoded number here — so a new lecture or challenge added to the
 * locale files is reflected automatically, without a second place to update.
 */
function useTotals() {
  const { lang, locale } = useLocale();
  return useMemo(() => {
    const lectureBank = lang === 'he' ? LECTURES_HE : LECTURES_EN;
    let totalLectures = 0;
    lectureBank.tracks.forEach(track => {
      track.lectures.forEach(lec => {
        if (lec.ready) totalLectures += 1;
      });
    });
    const totalChallenges = locale.codingChallenges.levels.reduce(
      (sum, level) => sum + level.items.length,
      0,
    );
    return { totalLectures, totalChallenges };
  }, [lang, locale]);
}

function Bar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      style={{
        background: 'var(--badge-outline)',
        borderRadius: '999px',
        height: '8px',
        overflow: 'hidden',
        marginTop: '6px',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: 'linear-gradient(90deg,var(--accent),var(--accent2))',
          borderRadius: '999px',
          transition: 'width .4s ease',
        }}
      />
    </div>
  );
}

function StatRow({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '.88rem',
          fontWeight: 600,
        }}
      >
        <span>{label}</span>
        <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{detail}</span>
      </div>
      <Bar value={value} />
    </div>
  );
}

export function ProgressTracker() {
  const t = useLocale().locale.progress;
  const { totalLectures, totalChallenges } = useTotals();
  const {
    lecturesViewed,
    practiceCompleted,
    interviewStarted,
    interviewCompleted,
    resumeStarted,
    resumeCompleted,
  } = useProgress();

  const lecturesCount = Math.min(lecturesViewed.length, totalLectures);
  const challengesCount = Math.min(practiceCompleted.length, totalChallenges);

  const lecturesPct = totalLectures ? (lecturesCount / totalLectures) * 100 : 0;
  const challengesPct = totalChallenges ? (challengesCount / totalChallenges) * 100 : 0;
  const interviewPct = interviewCompleted ? 100 : interviewStarted ? 50 : 0;
  const resumePct = resumeCompleted ? 100 : resumeStarted ? 50 : 0;

  const overallPct = Math.round((lecturesPct + challengesPct + interviewPct + resumePct) / 4);

  const statusText = (started: boolean, completed: boolean) =>
    completed ? t.doneLabel : started ? t.started : t.notStarted;

  const badges: Array<{ key: keyof typeof t.badges; unlocked: boolean }> = [
    { key: 'firstLecture', unlocked: lecturesCount >= 1 },
    { key: 'allLectures', unlocked: totalLectures > 0 && lecturesCount >= totalLectures },
    { key: 'firstChallenge', unlocked: challengesCount >= 1 },
    { key: 'allChallenges', unlocked: totalChallenges > 0 && challengesCount >= totalChallenges },
    { key: 'interview', unlocked: interviewCompleted },
    { key: 'resume', unlocked: resumeCompleted },
    {
      key: 'allRounder',
      unlocked:
        totalLectures > 0 &&
        lecturesCount >= totalLectures &&
        totalChallenges > 0 &&
        challengesCount >= totalChallenges &&
        interviewCompleted &&
        resumeCompleted,
    },
  ];

  return (
    <section id="progress" aria-label={t.title}>
      <div className="card" style={{ padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{t.title}</h3>
          <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
            {t.overallLabel}: <strong style={{ color: 'var(--accent)' }}>{overallPct}%</strong>
          </span>
        </div>
        <p className="lead" style={{ marginTop: '6px', marginBottom: '20px', fontSize: '.85rem' }}>
          {t.lead}
        </p>

        <StatRow
          label={t.lecturesLabel}
          value={lecturesPct}
          detail={`${lecturesCount}/${totalLectures}`}
        />
        <StatRow
          label={t.challengesLabel}
          value={challengesPct}
          detail={`${challengesCount}/${totalChallenges}`}
        />
        <StatRow
          label={t.interviewLabel}
          value={interviewPct}
          detail={statusText(interviewStarted, interviewCompleted)}
        />
        <StatRow
          label={t.resumeLabel}
          value={resumePct}
          detail={statusText(resumeStarted, resumeCompleted)}
        />

        <h4 style={{ marginTop: '24px', marginBottom: '10px', fontSize: '.95rem' }}>
          {t.badgesTitle}
        </h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '10px',
          }}
        >
          {badges.map(({ key, unlocked }) => {
            const badge = t.badges[key];
            return (
              <div
                key={key}
                title={badge.desc}
                style={{
                  border: '1px solid var(--badge-outline)',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                  borderStyle: unlocked ? 'solid' : 'dashed',
                  background: unlocked
                    ? 'linear-gradient(135deg, rgba(13,148,136,.08), rgba(30,58,95,.08))'
                    : 'transparent',
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>
                  {unlocked ? '🏅' : '🔒'}
                </div>
                <div style={{ fontSize: '.78rem', fontWeight: 600 }}>{badge.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
