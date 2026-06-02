'use client';

import {
  useEffect,
  useRef,
} from 'react';

import {
  getAIMove,
} from '../engine/aiEngine';

import {
  useChessStore,
} from '../../chess/store/chessStore';

export function useAIMove() {
  const {
    fen,
    turn,
    winner,
    gameMode,
    aiDifficulty,
    playerColor,
    makeMove,
  } =
    useChessStore();

  const lastFenRef =
    useRef('');

  useEffect(() => {
    if (
      gameMode !==
      'ai'
    )
      return;

    if (
      winner
    )
      return;

    const aiTurn =
      playerColor ===
      'white'
        ? 'b'
        : 'w';

    if (
      turn !==
      aiTurn
    )
      return;

    // prevents duplicate move execution
    if (
      lastFenRef.current ===
      fen
    ) {
      return;
    }

    lastFenRef.current =
      fen;

    async function moveAI() {
      useChessStore.setState(
        {
          aiThinking:
            true,
        }
      );

      try {
        const bestMove =
          await getAIMove(
            fen,
            aiDifficulty ??
              'medium'
          );

        if (
          !bestMove ||
          bestMove.length <
            4
        ) {
          useChessStore.setState(
            {
              aiThinking:
                false,
            }
          );

          return;
        }

        const from =
          bestMove.slice(
            0,
            2
          );

        const to =
          bestMove.slice(
            2,
            4
          );

        makeMove(
          from,
          to
        );

        useChessStore.setState(
          {
            aiThinking:
              false,
          }
        );
      } catch {
        useChessStore.setState(
          {
            aiThinking:
              false,
          }
        );
      }
    }

    moveAI();
  }, [
    fen,
    turn,
    winner,
    gameMode,
    aiDifficulty,
    playerColor,
    makeMove,
  ]);
}
