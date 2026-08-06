import { useDisclosure } from '../hooks/useDisclosure';
import type { Challenge, ChallengeLabels } from '../lib/challenges';

/** Disclosure stages: the prompt alone, then the hint, then the solution. */
const HINT = 1;
const SOLUTION = 2;
const STAGE_COUNT = 3;

interface ChallengeCardProps {
  challenge: Challenge;
  labels: ChallengeLabels;
  onComplete?: () => void;
}

/**
 * One challenge and its reveal button. The card owns its own disclosure state,
 * so the section rendering the list never has to track a stage per index.
 */
export function ChallengeCard({ challenge, labels, onComplete }: ChallengeCardProps) {
  const { stage, next, isRevealed } = useDisclosure(STAGE_COUNT);

  const buttonLabel =
    stage === SOLUTION
      ? labels.hide
      : stage === HINT
        ? labels.showSolution
        : labels.showHint;

  return (
    <div className="agent-box reveal">
      <h4>{challenge.title}</h4>
      <p>{challenge.prompt}</p>

      {isRevealed(HINT) && (
        <p className="notice">
          <b>{labels.hint}:</b> {challenge.hint}
        </p>
      )}

      {isRevealed(SOLUTION) && (
        <>
          <pre>
            <code>{challenge.code}</code>
          </pre>
          <p className="notice">
            <b>{labels.complexity}:</b> {challenge.complexity}
          </p>
        </>
      )}

      <button
        type="button"
        className="ghost"
        aria-expanded={stage > 0}
        onClick={() => {
          if (stage === HINT) onComplete?.();
          next();
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
