import { Fragment, type ReactNode } from 'react';
import { useDisclosure } from '../hooks/useDisclosure';
import type { QuestionItem, QuestionLabels } from '../lib/questionBank';

/** Disclosure stages: the question alone, then the hint, then the full answer. */
const HINT = 1;
const ANSWER = 2;
const STAGE_COUNT = 3;

/** `code`, *emphasis* — the only two the answers use. */
const INLINE_RE = /`([^`]+)`|\*([^*]+)\*/g;

/**
 * Renders the small amount of inline markup the answers carry. It builds React
 * elements from the matched groups rather than assembling an HTML string, so
 * there is no `dangerouslySetInnerHTML` and nothing to escape — the content is
 * ours, but the rule holds regardless of who wrote it.
 */
function renderInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  INLINE_RE.lastIndex = 0;
  while ((match = INLINE_RE.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const key = `${match.index}`;
    if (match[1] !== undefined) {
      out.push(
        <code className="inline" key={key}>
          {match[1]}
        </code>,
      );
    } else {
      out.push(<em key={key}>{match[2]}</em>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));

  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

interface QuestionCardProps {
  item: QuestionItem;
  labels: QuestionLabels;
  onComplete?: () => void;
}

/**
 * One interview question. The question *is* the control — clicking it reveals
 * a hint, clicking again reveals the full answer, and a third click collapses
 * it. The card owns its own stage, so a stage listing many questions never has
 * to track one per index.
 *
 * Same three-stage cycle as `ChallengeCard`, and the same hook behind it, so
 * the two sections of the site behave identically.
 */
export function QuestionCard({ item, labels, onComplete }: QuestionCardProps) {
  const { stage, next, isRevealed } = useDisclosure(STAGE_COUNT);

  const cue = stage === ANSWER ? labels.hide : stage === HINT ? labels.showAnswer : labels.showHint;

  return (
    <li className="q-item">
      <button
        type="button"
        className="q-btn"
        aria-expanded={stage > 0}
        onClick={() => {
          if (stage === HINT) onComplete?.();
          next();
        }}
      >
        <span className="q-text">{item.q}</span>
        <span className="q-cue">{cue}</span>
      </button>

      {isRevealed(HINT) && (
        <p className="q-hint">
          <b>{labels.hint}:</b> {renderInline(item.hint)}
        </p>
      )}

      {isRevealed(ANSWER) && (
        <div className="q-answer">
          <b className="q-answer-label">{labels.answer}</b>
          {item.answer.map((paragraph, i) => (
            <p key={i}>{renderInline(paragraph)}</p>
          ))}
        </div>
      )}
    </li>
  );
}
