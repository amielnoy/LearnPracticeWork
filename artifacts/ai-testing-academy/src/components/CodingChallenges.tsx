import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useReveal } from '../hooks/useReveal';
import { ChallengeCard } from './ChallengeCard';
import type { ChallengeLabels } from '../lib/challenges';

/**
 * The challenge section: three levels of increasing difficulty, each a list of
 * cards. Adding a level or a challenge is a content change in the locale files
 * — nothing here needs to know how many of either there are.
 */
export function CodingChallenges() {
  const { locale } = useLocale();
  const t = locale.codingChallenges;
  const sectionRef = useReveal();

  const labels = useMemo<ChallengeLabels>(
    () => ({
      hint: t.hintLabel,
      complexity: t.complexityLabel,
      showHint: t.showHintBtn,
      showSolution: t.showSolutionBtn,
      hide: t.hideBtn,
    }),
    [t]
  );

  return (
    <section id="coding-challenges" ref={sectionRef}>
      <h2>{t.title}</h2>
      <p className="lead reveal">{t.lead}</p>

      {t.levels.map(level => (
        <div className="challenge-level" key={level.label}>
          <h3 className="level-head">{level.label}</h3>
          <p className="level-blurb">{level.blurb}</p>

          {level.items.map(challenge => (
            <ChallengeCard
              key={challenge.title}
              challenge={challenge}
              labels={labels}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
