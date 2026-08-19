import { useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useReveal } from '../hooks/useReveal';
import { ChallengeCard } from './ChallengeCard';
import type { ChallengeLabels } from '../lib/challenges';
import { useProgress } from '../context/ProgressContext';
import { sectionNum } from '../lib/sections';

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
      <h2>
        <span className="num">{sectionNum('coding-challenges')}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>

      {/* Collapsed by default, the way the question bank's stages are. Expanded,
          the forty cards ran to 9,096px — 53% of the whole page — which pushed
          every section below them out of reach and buried the lecture series.
          All three stay closed, the way the question bank's stages do, with the
          count on each summary saying what opening one costs. */}
      {t.levels.map((level, levelIndex) => (
        <details className="challenge-level" key={level.label}>
          <summary>
            <h3 className="level-head">{level.label}</h3>
            <span className="level-count">
              {t.challengeCountLabel.replace('{count}', String(level.items.length))}
            </span>
          </summary>
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
        </details>
      ))}
    </section>
  );
}
