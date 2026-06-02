'use client';

import {
  useEffect,
  useRef,
} from 'react';

import {
  analyzePosition,
} from '../engine/learningEngine';

import {
  classifyMove,
} from '../classifiers/moveClassifier';

import {
  generateFeedback,
} from '../coaching/generateFeedback';

import {
  detectTacticalTheme,
} from '../utils/tacticalDetector';

import {
  useChessStore,
} from '../../chess/store/chessStore';

import {
  useLearningStore,
} from '../store/learningStore';

export function
  useLearningAnalysis() {
  const {
    fen,
    turn,
    gameMode,
    playerColor,
    moves,
  } =
    useChessStore();

  const {
    enabled,
    setFeedback,
  } =
    useLearningStore();

  const previousFen =
    useRef<
      string | null
    >(null);

  const lastMoveCount =
    useRef(0);

  useEffect(() => {
    if (
      !enabled
    )
      return;

    if (
      gameMode !==
      'ai'
    )
      return;

    const playerTurn =
      playerColor ===
      'white'
        ? 'w'
        : 'b';

    // save board before player move
    if (
      turn ===
      playerTurn
    ) {
      previousFen.current =
        fen;

      return;
    }

    // prevent duplicate analysis
    if (
      moves.length ===
      lastMoveCount.current
    ) {
      return;
    }

    lastMoveCount.current =
      moves.length;

    async function
      runAnalysis() {
      if (
        !previousFen.current
      )
        return;

      try {
        const before =
          await analyzePosition(
            previousFen.current
          );

        const after =
          await analyzePosition(
            fen
          );

        const cpLoss =
          Math.abs(
            before.evaluation -
              after.evaluation
          );

        const category =
          classifyMove(
            cpLoss
          );

        const tactical =
          detectTacticalTheme(
            previousFen.current,
            fen
          );

        const feedback =
          generateFeedback(
            category,
            tactical.reason
          );

        console.log(
          'SMART LEARNING:',
          {
            before,
            after,
            cpLoss,
            category,
            tactical,
          }
        );

        setFeedback({
          evaluation:
            after.evaluation,

          bestMove:
            before.bestMove,

          moveCategory:
            category,

          coachingText:
            feedback.text,
        });
      } catch (
        err
      ) {
        console.error(
          'LEARNING ERROR:',
          err
        );
      }
    }

    runAnalysis();
  }, [
    fen,
    turn,
    enabled,
    gameMode,
    playerColor,
    moves,
    setFeedback,
  ]);
}
