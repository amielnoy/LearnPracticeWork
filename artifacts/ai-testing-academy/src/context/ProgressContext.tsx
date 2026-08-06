import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ToolId = 'resume' | 'interview' | 'practice';

interface AcademyProgress {
  resumeStarted: boolean;
  resumeCompleted: boolean;
  interviewStarted: boolean;
  interviewAnswers: number;
  interviewCompleted: boolean;
  practiceCompleted: string[];
  lastTool: ToolId | null;
}

interface ProgressContextValue extends AcademyProgress {
  startTool: (tool: ToolId) => void;
  completeResume: () => void;
  recordInterviewAnswer: () => void;
  completeInterview: () => void;
  completePracticeItem: (id: string) => void;
}

const STORAGE_KEY = 'ata_progress_v1';
const EMPTY_PROGRESS: AcademyProgress = {
  resumeStarted: false,
  resumeCompleted: false,
  interviewStarted: false,
  interviewAnswers: 0,
  interviewCompleted: false,
  practiceCompleted: [],
  lastTool: null,
};

function loadProgress(): AcademyProgress {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<AcademyProgress>;
    return {
      resumeStarted: parsed.resumeStarted === true,
      resumeCompleted: parsed.resumeCompleted === true,
      interviewStarted: parsed.interviewStarted === true,
      interviewAnswers: Number.isSafeInteger(parsed.interviewAnswers) && Number(parsed.interviewAnswers) >= 0
        ? Number(parsed.interviewAnswers)
        : 0,
      interviewCompleted: parsed.interviewCompleted === true,
      practiceCompleted: Array.isArray(parsed.practiceCompleted)
        ? parsed.practiceCompleted.filter((id): id is string => typeof id === 'string').slice(0, 500)
        : [],
      lastTool: ['resume', 'interview', 'practice'].includes(parsed.lastTool || '')
        ? parsed.lastTool as ToolId
        : null,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<AcademyProgress>(loadProgress);

  const update = useCallback((fn: (current: AcademyProgress) => AcademyProgress) => {
    setProgress(current => {
      const next = fn(current);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const startTool = useCallback((tool: ToolId) => update(current => ({
    ...current,
    lastTool: tool,
    resumeStarted: current.resumeStarted || tool === 'resume',
    interviewStarted: current.interviewStarted || tool === 'interview',
  })), [update]);

  const completeResume = useCallback(() => update(current => ({
    ...current,
    resumeStarted: true,
    resumeCompleted: true,
    lastTool: 'resume',
  })), [update]);

  const recordInterviewAnswer = useCallback(() => update(current => ({
    ...current,
    interviewStarted: true,
    interviewAnswers: current.interviewAnswers + 1,
    lastTool: 'interview',
  })), [update]);

  const completeInterview = useCallback(() => update(current => ({
    ...current,
    interviewStarted: true,
    interviewCompleted: true,
    lastTool: 'interview',
  })), [update]);

  const completePracticeItem = useCallback((id: string) => update(current => ({
    ...current,
    lastTool: 'practice',
    practiceCompleted: current.practiceCompleted.includes(id)
      ? current.practiceCompleted
      : [...current.practiceCompleted, id],
  })), [update]);

  const value = useMemo<ProgressContextValue>(() => ({
    ...progress,
    startTool,
    completeResume,
    recordInterviewAnswer,
    completeInterview,
    completePracticeItem,
  }), [progress, startTool, completeResume, recordInterviewAnswer, completeInterview, completePracticeItem]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
