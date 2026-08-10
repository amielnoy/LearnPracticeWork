import { useLocale } from '../context/LocaleContext';
import { useProgress, type ToolId } from '../context/ProgressContext';
import { useProviderContext } from '../context/ProviderContext';
import { EN_BANK, HE_BANK } from '../lib/questionBank';

const TOOL_LINKS: Record<ToolId, string> = {
  resume: '#resume',
  interview: '#interview-talk',
  practice: '#interview-questions',
};

export function ToolLauncher() {
  const { locale, lang } = useLocale();
  const t = locale.tools;
  const progress = useProgress();
  const { anonymousQuota } = useProviderContext();
  const bank = lang === 'he' ? HE_BANK : EN_BANK;
  const practiceTotal =
    bank.stages.reduce((total, stage) => total + stage.items.length, 0) +
    locale.codingChallenges.levels.reduce((total, level) => total + level.items.length, 0);
  const languagePrefix = `${lang}:`;
  const practiceDone = progress.practiceCompleted.filter(id =>
    id.startsWith(languagePrefix),
  ).length;

  const percentages: Record<ToolId, number> = {
    resume: progress.resumeCompleted ? 100 : progress.resumeStarted ? 35 : 0,
    interview: progress.interviewCompleted
      ? 100
      : progress.interviewStarted
        ? Math.min(90, 15 + progress.interviewAnswers * 12)
        : 0,
    practice: practiceTotal ? Math.round((practiceDone / practiceTotal) * 100) : 0,
  };

  const cards: Array<{ id: ToolId; icon: string; title: string; desc: string; cta: string }> = [
    { id: 'resume', icon: '📄', ...t.resume },
    { id: 'interview', icon: '🎙️', ...t.interview },
    { id: 'practice', icon: '🧠', ...t.practice },
  ];
  const continueHref = progress.lastTool ? TOOL_LINKS[progress.lastTool] : TOOL_LINKS.interview;

  return (
    <section className="tool-launcher" aria-labelledby="tools-title">
      <p className="tool-eyebrow">{t.eyebrow}</p>
      <h2 id="tools-title">{t.title}</h2>
      <p className="lead">{t.lead}</p>

      {progress.lastTool && (
        <a
          className="continue-card"
          href={continueHref}
          onClick={() => progress.startTool(progress.lastTool!)}
        >
          <span>{t.continueLabel}</span>
          <strong>{cards.find(card => card.id === progress.lastTool)?.title}</strong>
          <span aria-hidden="true">→</span>
        </a>
      )}

      <div className="tool-grid">
        {cards.map(card => {
          const percent = percentages[card.id];
          return (
            <a
              key={card.id}
              className="tool-card"
              href={TOOL_LINKS[card.id]}
              onClick={() => {
                progress.startTool(card.id);
                if (card.id === 'resume')
                  window.dispatchEvent(new CustomEvent('ata:sample-resume'));
                if (card.id === 'interview')
                  window.dispatchEvent(new CustomEvent('ata:start-sample-interview'));
              }}
            >
              <span className="tool-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div
                className="tool-progress"
                role="progressbar"
                aria-label={`${card.title} — ${t.progressLabel}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <span style={{ width: `${percent}%` }} />
              </div>
              <span className="tool-meta">
                {percent ? `${percent}% ${t.completedLabel}` : t.freshLabel}
              </span>
              <strong className="tool-cta">{card.cta}</strong>
            </a>
          );
        })}
      </div>

      {anonymousQuota && (
        <p className="quota-note" aria-live="polite">
          {anonymousQuota.remaining === null
            ? t.quotaAvailableLabel.replace('{limit}', String(anonymousQuota.limit))
            : t.quotaLabel
                .replace('{remaining}', String(anonymousQuota.remaining))
                .replace('{limit}', String(anonymousQuota.limit))}
        </p>
      )}
    </section>
  );
}
