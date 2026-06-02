'use client';

import {
  useEffect,
  useRef,
} from 'react';

import {
  track,
} from '@/lib/analytics/events';

import {
  useChessStore,
} from '@/features/chess/store/chessStore';

export function
  useGameAnalytics() {
  const {
    mode,
    gameMode,
    aiDifficulty,
    moves,
    winner,
  } =
    useChessStore();

  const started =
    useRef(false);

  const startTime =
    useRef<number | null>(
      null
    );

  // game started
  useEffect(() => {
    if (
      !mode ||
      started.current
    )
      return;

    started.current =
      true;

    startTime.current =
      Date.now();

    track(
      'game_started',
      {
        mode:
          gameMode,

        difficulty:
          aiDifficulty ??
          null,
      }
    );
  }, [
    mode,
    gameMode,
    aiDifficulty,
  ]);

  // game completed
  useEffect(() => {
    if (!winner)
      return;

    const duration =
      startTime.current
        ? Math.floor(
            (
              Date.now() -
              startTime.current
            ) / 1000
          )
        : null;

    track(
      'game_completed',
      {
        winner,

        moves:
          moves.length,

        duration,

        mode:
          gameMode,

        difficulty:
          aiDifficulty ??
          null,
      }
    );
  }, [
    winner,
    moves.length,
    gameMode,
    aiDifficulty,
  ]);
}
