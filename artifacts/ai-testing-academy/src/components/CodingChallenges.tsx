import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useReveal } from '../hooks/useReveal';
import { ChallengeCard } from './ChallengeCard';
import type { ChallengeLabels } from '../lib/challenges';
import { useProgress } from '../context/ProgressContext';
import { useRemoteContent } from '../hooks/useRemoteContent';
import { fetchChallengeLevels } from '../lib/contentClient';

/**
 * The challenge section: three levels of increasing difficulty, each a list of
 * cards. Adding a level or a challenge is a content change in the locale files
 * — nothing here needs to know how many of either there are.
 */
export function CodingChallenges() {
  const { locale, lang } = useLocale();
  const t = locale.codingChallenges;
  const sectionRef = useReveal();
  const { completePracticeItem } = useProgress();
  const contentLang = lang === 'he' ? 'he' : 'en';
  const remoteLevels = useRemoteContent(() => fetchChallengeLevels(contentLang), [contentLang]);
  const levels = remoteLevels ?? t.levels;

  const labels = useMemo<ChallengeLabels>(
    () => ({
      hint: t.hintLabel,
      complexity: t.complexityLabel,
      showHint: t.showHintBtn,
      showSolution: t.showSolutionBtn,
      hide: t.hideBtn,
    }),
    [t],
  );

  return (
    <section id="coding-challenges" ref={sectionRef}>
      <h2>{t.title}</h2>
      <p className="lead reveal">{t.lead}</p>

      {levels.map((level, levelIndex) => (
        <div className="challenge-level" key={level.label}>
          <h3 className="level-head">{level.label}</h3>
          <p className="level-blurb">{level.blurb}</p>

          {level.items.map((challenge, challengeIndex) => (
            <ChallengeCard
              key={challenge.title}
              challenge={challenge}
              labels={labels}
              onComplete={() =>
                completePracticeItem(`${lang}:challenge:${levelIndex}:${challengeIndex}`)
              }
            />
          ))}
        </div>
      ))}
    </section>
  );
}
