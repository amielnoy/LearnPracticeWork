import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProgress } from '../context/ProgressContext';
import { useOptionalAuth } from '../context/AuthContext';
import { EN as LECTURES_EN, HE as LECTURES_HE } from '../lib/lectures';

/**
 * Where a reader is, and the one thing worth doing next.
 *
 * It used to be four bars and seven padlocks — a scoreboard that could say how
 * far along you were and never what to do about it. Three things were wrong
 * with that, and all three are fixed here rather than restyled:
 *
 * - The criteria for every badge were already written, in the locale, and were
 *   reachable only through a `title` attribute: invisible on touch, invisible
 *   to the keyboard, and announced inconsistently by screen readers. They are
 *   shown now, next to how far off they are.
 * - A padlock says "you cannot". Every one of these is one click away, so the
 *   marker is an unchecked circle and the row carries a distance instead.
 * - The panel claimed progress was stored "locally in this browser", which
 *   stopped being true when progress started syncing to an account — and hid
 *   the reason to sign in at all. The footer states which of the two it is.
 *
 * Presentation moved to `.progress-*` in `app.css`. Inline styles are how the
 * old version came to use `--badge-outline`, a token that is real but lives in
 * a stylesheet this app does not import, so the meter track was transparent
 * and every badge outline fell back to `currentColor`.
 */

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

type StepKey = 'lecture' | 'challenge' | 'resume' | 'interview';

/** A labelled bar. `role="progressbar"` so the number is announced, not just drawn. */
function Meter({ value, label }: { value: number; label: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className="meter"
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

function StatRow({
  label,
  value,
  status,
  statusKind,
  count,
}: {
  label: string;
  value: number;
  status: string;
  statusKind: 'todo' | 'doing' | 'done';
  count?: string;
}) {
  return (
    <div className="progress-row">
      <div className="progress-row-head">
        <span className="progress-label">{label}</span>
        <span className={`status-chip is-${statusKind}`}>{status}</span>
        {count && <span className="progress-count">{count}</span>}
      </div>
      <Meter value={value} label={label} />
    </div>
  );
}

export function ProgressTracker() {
  const t = useLocale().locale.progress;
  const { totalLectures, totalChallenges } = useTotals();
  const auth = useOptionalAuth();
  const signedIn = auth?.user != null;
  // Only offer the hint where there is something to act on: a build with no
  // Google client ID hides sign-in entirely, and telling someone to sign in
  // when no control exists is worse than saying nothing.
  const canSignIn = auth?.configured === true;
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

  const kindOf = (started: boolean, completed: boolean) =>
    completed ? ('done' as const) : started ? ('doing' as const) : ('todo' as const);
  const statusText = (started: boolean, completed: boolean) =>
    completed ? t.doneLabel : started ? t.started : t.notStarted;
  const countKind = (done: number, total: number) =>
    done >= total && total > 0
      ? ('done' as const)
      : done > 0
        ? ('doing' as const)
        : ('todo' as const);

  /**
   * The next step, picked from a fixed order rather than from whichever bar is
   * lowest. Order is by what it costs the reader: the two that need nothing but
   * a click come before the two that spend an AI request, so a first visit is
   * never sent straight at the quota. The first unfinished one wins.
   */
  const nextStep = (
    [
      ['lecture', lecturesCount >= 1, '#lecture-series'],
      ['challenge', challengesCount >= 1, '#coding-challenges'],
      ['resume', resumeCompleted, '#resume'],
      ['interview', interviewCompleted, '#interview-talk'],
    ] as Array<[StepKey, boolean, string]>
  ).find(([, done]) => !done);

  /**
   * Each badge with the distance to it, so "locked" is a number rather than a
   * padlock. The boolean ones are counted out of 1 for the same reason: one
   * shape for every row means the column reads as a column.
   */
  const areasDone = [
    totalLectures > 0 && lecturesCount >= totalLectures,
    totalChallenges > 0 && challengesCount >= totalChallenges,
    interviewCompleted,
    resumeCompleted,
  ].filter(Boolean).length;

  const badges: Array<{ key: keyof typeof t.badges; done: number; target: number }> = [
    { key: 'firstLecture', done: Math.min(lecturesCount, 1), target: 1 },
    { key: 'allLectures', done: lecturesCount, target: totalLectures },
    { key: 'firstChallenge', done: Math.min(challengesCount, 1), target: 1 },
    { key: 'allChallenges', done: challengesCount, target: totalChallenges },
    { key: 'interview', done: interviewCompleted ? 1 : 0, target: 1 },
    { key: 'resume', done: resumeCompleted ? 1 : 0, target: 1 },
    { key: 'allRounder', done: areasDone, target: 4 },
  ];
  const earned = badges.filter(b => b.target > 0 && b.done >= b.target).length;

  return (
    <section id="progress" aria-label={t.title}>
      <div className="card" style={{ padding: '24px' }}>
        <div className="progress-head">
          <h3>{t.title}</h3>
          <span className="progress-total">
            <b>{overallPct}%</b>
            <small>{t.overallLabel}</small>
          </span>
        </div>
        <p className="lead" style={{ marginTop: '6px', marginBottom: 0, fontSize: '.85rem' }}>
          {t.lead}
        </p>

        <div className="progress-next">
          <div>
            <p className="progress-next-eyebrow">{t.nextEyebrow}</p>
            <p className="progress-next-title">
              {nextStep ? t.steps[nextStep[0]].title : t.allDoneTitle}
            </p>
            <p className="progress-next-meta">
              {nextStep ? t.steps[nextStep[0]].meta : t.allDoneMeta}
            </p>
          </div>
          {nextStep && (
            <a className="progress-next-cta" href={nextStep[2]}>
              {t.nextCta}
            </a>
          )}
        </div>

        <StatRow
          label={t.lecturesLabel}
          value={lecturesPct}
          status={statusText(
            lecturesCount > 0,
            lecturesCount >= totalLectures && totalLectures > 0,
          )}
          statusKind={countKind(lecturesCount, totalLectures)}
          count={`${lecturesCount}/${totalLectures}`}
        />
        <StatRow
          label={t.challengesLabel}
          value={challengesPct}
          status={statusText(
            challengesCount > 0,
            challengesCount >= totalChallenges && totalChallenges > 0,
          )}
          statusKind={countKind(challengesCount, totalChallenges)}
          count={`${challengesCount}/${totalChallenges}`}
        />
        <StatRow
          label={t.interviewLabel}
          value={interviewPct}
          status={statusText(interviewStarted, interviewCompleted)}
          statusKind={kindOf(interviewStarted, interviewCompleted)}
        />
        <StatRow
          label={t.resumeLabel}
          value={resumePct}
          status={statusText(resumeStarted, resumeCompleted)}
          statusKind={kindOf(resumeStarted, resumeCompleted)}
        />

        <div className="badge-head">
          <h4>{t.badgesTitle}</h4>
          <span className="progress-count">
            {earned}/{badges.length} {t.badgesEarned}
          </span>
        </div>
        <ul className="badge-list">
          {badges.map(({ key, done, target }) => {
            const badge = t.badges[key];
            const unlocked = target > 0 && done >= target;
            return (
              <li key={key} className={`badge-item${unlocked ? ' is-earned' : ''}`}>
                <span className="badge-mark" aria-hidden="true">
                  {unlocked ? '✓' : ''}
                </span>
                <span className="badge-text">
                  <span className="badge-name">{badge.label}</span>
                  <span className="badge-desc">{badge.desc}</span>
                </span>
                {target > 1 && (
                  <span className="badge-distance">
                    {done}/{target}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <p className="progress-foot">
          <span>{signedIn ? t.storedSynced : t.storedLocal}</span>
          {!signedIn && canSignIn && <span>{t.signInHint}</span>}
        </p>
      </div>
    </section>
  );
}
