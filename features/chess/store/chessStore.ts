import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chess } from 'chess.js';

export type GameMode =
  | 'blitz'
  | 'rapid';

type Winner =
  | 'white'
  | 'black'
  | 'draw'
  | null;

type ChessMode =
  | 'local'
  | 'ai';

type AIDifficulty =
  | 'medium'
  | 'hard';

type ChessStore = {
  gameMode:
    | ChessMode
    | null;

  aiDifficulty:
    | AIDifficulty
    | null;

  aiThinking:
    boolean;

  playerColor:
    'white'
    | 'black';

  fen: string;
  turn: 'w' | 'b';

  mode:
    | GameMode
    | null;

  whiteTime:
    number;

  blackTime:
    number;

  winner:
    Winner;

  gameStatus:
    string;

  moves:
    string[];

  setMode: (
    mode:
      GameMode
  ) => void;

  makeMove: (
    from: string,
    to: string,
    promotion?: string
  ) => boolean;

  resign: (
    color:
      | 'white'
      | 'black'
  ) => void;

  offerDraw:
    () => void;

  restartGame:
    () => void;

  tick:
    () => void;
};

export const useChessStore =
  create<ChessStore>()(
    persist(
      (set, get) => ({
        gameMode:
          null,

        aiDifficulty:
          'medium',

        aiThinking:
          false,

        playerColor:
          'white',

        fen:
          new Chess().fen(),

        turn:
          'w',

        mode:
          null,

        whiteTime:
          600,

        blackTime:
          600,

        winner:
          null,

        gameStatus:
          'Choose game mode',

        moves:
          [],

        setMode:
          (
            mode
          ) => {
            const game =
              new Chess();

            const randomColor =
              Math.random() >
              0.5
                ? 'white'
                : 'black';

            set({
              fen:
                game.fen(),

              turn:
                'w',

              mode,

              playerColor:
                randomColor,

              winner:
                null,

              moves:
                [],

              gameStatus:
                'White to move',

              whiteTime:
                mode ===
                'blitz'
                  ? 180
                  : 600,

              blackTime:
                mode ===
                'blitz'
                  ? 180
                  : 600,
            });
          },

        makeMove:
          (
            from,
            to,
            promotion
          ) => {
            const game =
              new Chess(
                get().fen
              );

            try {
              const move =
                game.move({
                  from,
                  to,
                  promotion:
                    promotion ??
                    'q',
                });

              if (
                !move
              )
                return false;

              let winner:
                Winner =
                null;

              let status =
                game.turn() ===
                'w'
                  ? 'White to move'
                  : 'Black to move';

              if (
                game.isCheck()
              ) {
                status =
                  'Check';
              }

              if (
                game.isCheckmate()
              ) {
                winner =
                  game.turn() ===
                  'w'
                    ? 'black'
                    : 'white';

                status = `${winner} wins by checkmate`;
              }

              if (
                game.isStalemate()
              ) {
                winner =
                  'draw';

                status =
                  'Draw by stalemate';
              }

              set({
                fen:
                  game.fen(),

                turn:
                  game.turn(),

                winner,

                gameStatus:
                  status,

                moves: [
                  ...get()
                    .moves,
                  move.san,
                ],
              });

              return true;
            } catch {
              return false;
            }
          },

        resign:
          (
            color
          ) => {
            set({
              winner:
                color ===
                'white'
                  ? 'black'
                  : 'white',

              gameStatus: `${color} resigned`,
            });
          },

        offerDraw:
          () => {
            set({
              winner:
                'draw',

              gameStatus:
                'Draw agreed',
            });
          },

        restartGame:
          () => {
            localStorage.removeItem(
              'knightly-game'
            );

            set({
              mode:
                null,
            });
          },

        tick:
          () => {
            const {
              turn,
              winner,
              whiteTime,
              blackTime,
            } =
              get();

            if (
              winner
            )
              return;

            if (
              turn ===
              'w'
            ) {
              if (
                whiteTime <=
                1
              ) {
                set({
                  whiteTime:
                    0,

                  winner:
                    'black',

                  gameStatus:
                    'Black wins on timeout',
                });

                return;
              }

              set({
                whiteTime:
                  whiteTime -
                  1,
              });
            } else {
              if (
                blackTime <=
                1
              ) {
                set({
                  blackTime:
                    0,

                  winner:
                    'white',

                  gameStatus:
                    'White wins on timeout',
                });

                return;
              }

              set({
                blackTime:
                  blackTime -
                  1,
              });
            }
          },
      }),
      {
        name:
          'knightly-game',

        version:
          2,

        partialize:
          (
            state
          ) =>
            state.winner
              ? {}
              : {
                  fen:
                    state.fen,

                  turn:
                    state.turn,

                  mode:
                    state.mode,

                  whiteTime:
                    state.whiteTime,

                  blackTime:
                    state.blackTime,

                  moves:
                    state.moves,

                  gameMode:
                    state.gameMode,

                  aiDifficulty:
                    state.aiDifficulty,

                  playerColor:
                    state.playerColor,
                },
      }
    )
  );
