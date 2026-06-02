import { create } from 'zustand';

export type MoveCategory =
  | 'opening'
  | 'best'
  | 'excellent'
  | 'good'
  | 'inaccuracy'
  | 'mistake'
  | 'blunder'
  | 'miss'
  | 'brilliant'
  | null;

type LearningState = {
  enabled: boolean;

  evaluation:
    number | null;

  bestMove:
    string | null;

  moveCategory:
    MoveCategory;

  coachingText:
    string | null;

  missedOpportunity:
    string | null;

  setLearningMode: (
    enabled: boolean
  ) => void;

  setFeedback: (
    data: {
      evaluation?: number;
      bestMove?: string;
      moveCategory?: MoveCategory;
      coachingText?: string;
      missedOpportunity?: string;
    }
  ) => void;

  clearFeedback:
    () => void;
};

export const
  useLearningStore =
    create<
      LearningState
    >((set) => ({
      enabled:
        false,

      evaluation:
        null,

      bestMove:
        null,

      moveCategory:
        null,

      coachingText:
        null,

      missedOpportunity:
        null,

      setLearningMode:
        (
          enabled
        ) =>
          set({
            enabled,
          }),

      setFeedback:
        (
          data
        ) =>
          set(
            data
          ),

      clearFeedback:
        () =>
          set({
            evaluation:
              null,

            bestMove:
              null,

            moveCategory:
              null,

            coachingText:
              null,

            missedOpportunity:
              null,
          }),
    }));
