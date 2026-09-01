import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readValidated, writeValidated } from '../lib/storage';
import { useOptionalAuth } from './AuthContext';
import {
  fetchProgress,
  pushProgress,
  validateProgress,
  MAX_PROGRESS_IDS,
  type AcademyProgress,
  type ToolId,
} from '../lib/progressApi';

export type { ToolId };

interface ProgressContextValue extends AcademyProgress {
  startTool: (tool: ToolId) => void;
  completeResume: () => void;
  recordInterviewAnswer: () => void;
  completeInterview: () => void;
  completePracticeItem: (id: string) => void;
  viewLecture: (id: string) => void;
}

const STORAGE_KEY = 'ata_progress_v1';
const EMPTY_PROGRESS: AcademyProgress = {
  resumeStarted: false,
  resumeCompleted: false,
  interviewStarted: false,
  interviewAnswers: 0,
  interviewCompleted: false,
  practiceCompleted: [],
  lecturesViewed: [],
  lastTool: null,
};

function loadProgress(): AcademyProgress {
  // A stored value and a response body are the same kind of thing here — both
  // arrive from outside and both land in the state the site renders from — so
  // both go through the one validator.
  return (
    readValidated<AcademyProgress>(localStorage, STORAGE_KEY, validateProgress) ?? EMPTY_PROGRESS
  );
}

/** Order-insensitive on the two set columns, because the server's union is. */
function sameProgress(a: AcademyProgress, b: AcademyProgress): boolean {
  const sameIds = (left: string[], right: string[]) =>
    left.length === right.length &&
    [...left].sort().join('\u0000') === [...right].sort().join('\u0000');
  return (
    a.resumeStarted === b.resumeStarted &&
    a.resumeCompleted === b.resumeCompleted &&
    a.interviewStarted === b.interviewStarted &&
    a.interviewAnswers === b.interviewAnswers &&
    a.interviewCompleted === b.interviewCompleted &&
    a.lastTool === b.lastTool &&
    sameIds(a.practiceCompleted, b.practiceCompleted) &&
    sameIds(a.lecturesViewed, b.lecturesViewed)
  );
}

/**
 * How long a burst of local changes is allowed to settle before it is synced.
 *
 * Answering an interview question updates progress on every answer; without
 * this, so does a request.
 */
const SYNC_DELAY_MS = 1_000;

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<AcademyProgress>(loadProgress);
  // Optional on purpose: progress is tracked for everyone and synced only for
  // someone with an account, so a tree without an AuthProvider is a normal one.
  const user = useOptionalAuth()?.user ?? null;
  const signedIn = user !== null;

  const update = useCallback((fn: (current: AcademyProgress) => AcademyProgress) => {
    setProgress(current => {
      const next = fn(current);
      writeValidated(localStorage, STORAGE_KEY, next);
      return next;
    });
  }, []);

  /**
   * Take a copy that came back from the server, if it says anything new.
   *
   * The guard is what stops the sync below from running forever: adopting the
   * server's answer sets state, setting state re-runs the effect, and the next
   * push returns the same union. Comparing before adopting makes the second
   * round a no-op instead of the next lap.
   */
  const adopt = useCallback((remote: AcademyProgress | null) => {
    if (!remote) return;
    setProgress(current => {
      if (sameProgress(current, remote)) return current;
      writeValidated(localStorage, STORAGE_KEY, remote);
      return remote;
    });
  }, []);

  // Merge this device's copy into the stored one, and adopt the union. Runs on
  // sign-in and after every local change that settles, and it is the only write
  // path: the response is the merge, so one call both saves and refreshes.
  useEffect(() => {
    if (!signedIn) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void pushProgress(progress, controller.signal).then(adopt);
    }, SYNC_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [signedIn, progress, adopt]);

  // The other half of "follows you between devices": progress made on a phone
  // is already stored, and this is the moment the laptop is worth telling. A
  // read rather than a merge, because nothing changed here while the tab was
  // in the background.
  useEffect(() => {
    if (!signedIn) return;
    const controller = new AbortController();
    const refresh = () => {
      if (document.visibilityState === 'visible') {
        void fetchProgress(controller.signal).then(adopt);
      }
    };
    document.addEventListener('visibilitychange', refresh);
    return () => {
      document.removeEventListener('visibilitychange', refresh);
      controller.abort();
    };
  }, [signedIn, adopt]);

  const startTool = useCallback(
    (tool: ToolId) =>
      update(current => ({
        ...current,
        lastTool: tool,
        resumeStarted: current.resumeStarted || tool === 'resume',
        interviewStarted: current.interviewStarted || tool === 'interview',
      })),
    [update],
  );

  const completeResume = useCallback(
    () =>
      update(current => ({
        ...current,
        resumeStarted: true,
        resumeCompleted: true,
        lastTool: 'resume',
      })),
    [update],
  );

  const recordInterviewAnswer = useCallback(
    () =>
      update(current => ({
        ...current,
        interviewStarted: true,
        interviewAnswers: current.interviewAnswers + 1,
        lastTool: 'interview',
      })),
    [update],
  );

  const completeInterview = useCallback(
    () =>
      update(current => ({
        ...current,
        interviewStarted: true,
        interviewCompleted: true,
        lastTool: 'interview',
      })),
    [update],
  );

  const completePracticeItem = useCallback(
    (id: string) =>
      update(current => ({
        ...current,
        lastTool: 'practice',
        practiceCompleted: current.practiceCompleted.includes(id)
          ? current.practiceCompleted
          : [...current.practiceCompleted, id].slice(-MAX_PROGRESS_IDS),
      })),
    [update],
  );

  const viewLecture = useCallback(
    (id: string) =>
      update(current => ({
        ...current,
        lecturesViewed: current.lecturesViewed.includes(id)
          ? current.lecturesViewed
          : [...current.lecturesViewed, id].slice(-MAX_PROGRESS_IDS),
      })),
    [update],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...progress,
      startTool,
      completeResume,
      recordInterviewAnswer,
      completeInterview,
      completePracticeItem,
      viewLecture,
    }),
    [
      progress,
      startTool,
      completeResume,
      recordInterviewAnswer,
      completeInterview,
      completePracticeItem,
      viewLecture,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
