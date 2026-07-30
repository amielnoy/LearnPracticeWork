import { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useReveal } from '../hooks/useReveal';

export function CodingChallenges() {
  const { locale } = useLocale();
  const t = locale.codingChallenges;
  const sectionRef = useReveal();

  // 0 = nothing shown, 1 = hint shown, 2 = solution shown
  const [stages, setStages] = useState<number[]>(() => t.items.map(() => 0));

  const advance = (i: number) => {
    setStages(prev => prev.map((s, idx) => (idx === i ? (s + 1) % 3 : s)));
  };

  const buttonLabel = (stage: number) => {
    if (stage === 0) return t.showHintBtn;
    if (stage === 1) return t.showSolutionBtn;
    return t.hideBtn;
  };

  return (
    <section id="coding-challenges" ref={sectionRef}>
      <h2>{t.title}</h2>
      <p className="lead reveal">{t.lead}</p>

      {t.items.map((item, i) => {
        const stage = stages[i];
        return (
          <div className="agent-box reveal" key={i}>
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <p>{item.prompt}</p>

            {stage >= 1 && (
              <p className="notice">
                <b>{t.hintLabel}:</b> {item.hint}
              </p>
            )}

            {stage >= 2 && (
              <>
                <pre>
                  <code>{item.code}</code>
                </pre>
                <p className="notice">
                  <b>{t.complexityLabel}:</b> {item.complexity}
                </p>
              </>
            )}

            <button type="button" className="ghost" onClick={() => advance(i)}>
              {buttonLabel(stage)}
            </button>
          </div>
        );
      })}
    </section>
  );
}
