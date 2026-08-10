import { useCallback, useState } from 'react';

/**
 * A stepped disclosure. Each `next()` reveals one more stage and wraps back to
 * nothing once the last one has been shown — the "question → hint → solution →
 * collapsed" cycle, with no knowledge of what any stage actually contains.
 *
 * @param stageCount total number of stages including the collapsed state.
 */
export function useDisclosure(stageCount: number) {
  const [stage, setStage] = useState(0);

  const next = useCallback(() => setStage(current => (current + 1) % stageCount), [stageCount]);

  const isRevealed = useCallback((atLeast: number) => stage >= atLeast, [stage]);

  return { stage, next, isRevealed };
}
