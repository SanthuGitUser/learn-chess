import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "chess-mentor-progress";

type ProgressState = {
  completed: string[];
};

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: [] };
    const parsed = JSON.parse(raw) as ProgressState;
    return { completed: Array.isArray(parsed.completed) ? parsed.completed : [] };
  } catch {
    return { completed: [] };
  }
}

function lessonKey(stageId: string, lessonId: string) {
  return `${stageId}/${lessonId}`;
}

type ProgressContextValue = {
  isComplete: (stageId: string, lessonId: string) => boolean;
  markComplete: (stageId: string, lessonId: string) => void;
  resetProgress: () => void;
  completedCount: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isComplete = useCallback(
    (stageId: string, lessonId: string) => state.completed.includes(lessonKey(stageId, lessonId)),
    [state.completed],
  );

  const markComplete = useCallback(
    (stageId: string, lessonId: string) => {
      const key = lessonKey(stageId, lessonId);
      if (state.completed.includes(key)) return;
      persist({ completed: [...state.completed, key] });
    },
    [persist, state.completed],
  );

  const resetProgress = useCallback(() => {
    persist({ completed: [] });
  }, [persist]);

  const value = useMemo(
    () => ({
      isComplete,
      markComplete,
      resetProgress,
      completedCount: state.completed.length,
    }),
    [isComplete, markComplete, resetProgress, state.completed.length],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

export { lessonKey };
