'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Chessboard,
} from 'react-chessboard';

import {
  MoreVertical,
} from 'lucide-react';

import {
  useChessStore,
} from '../store/chessStore';

import {
  useAIMove,
} from '../../ai/hooks/useAIMove';

import {
  useLearningAnalysis,
} from '../../learning/hooks/useLearningAnalysis';

import {
  useLearningStore,
} from '../../learning/store/learningStore';

import {
  useMultiplayerVote,
} from '../../home/hooks/useMultiplayerVote';

function formatTime(
  seconds: number
) {
  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return `${mins}:${secs
    .toString()
    .padStart(2, '0')}`;
}

export default function ChessGame() {
  useAIMove();
  useLearningAnalysis();

  const {
    enabled,
    setLearningMode,
    moveCategory,
    coachingText,
    bestMove,
  } =
    useLearningStore();

  const {
    vote,
    submitVote,
    resetVote,
  } =
    useMultiplayerVote();

  const [
    showMenu,
    setShowMenu,
  ] = useState(
    false
  );

  const {
    fen,
    turn,
    mode,
    winner,
    gameStatus,
    whiteTime,
    blackTime,
    gameMode,
    aiDifficulty,
    playerColor,
    aiThinking,
    setMode,
    makeMove,
    restartGame,
    resign,
    offerDraw,
    tick,
  } =
    useChessStore();

  useEffect(() => {
    if (
      !mode ||
      winner
    )
      return;

    const interval =
      setInterval(
        () =>
          tick(),
        1000
      );

    return () =>
      clearInterval(
        interval
      );
  }, [
    mode,
    winner,
    tick,
  ]);

  function onDrop(
    sourceSquare: string,
    targetSquare: string
  ) {
    if (
      aiThinking
    )
      return false;

    const playerTurn =
      playerColor ===
      'white'
        ? 'w'
        : 'b';

    if (
      gameMode ===
        'ai' &&
      turn !==
        playerTurn
    ) {
      return false;
    }

    return makeMove(
      sourceSquare,
      targetSquare
    );
  }

  if (!mode) {
    return (
      <div className="flex h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-[36px] border border-white/10 bg-[#151A22]/80 p-10 backdrop-blur-xl">

          <div className="mb-10 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#94A3B8]">
              MODERN CHESS
            </p>

            <h1 className="mb-2 text-5xl font-bold tracking-[-0.06em]">
              Knightly
            </h1>

            <p className="text-[#94A3B8]">
              Sharpen your chess.
            </p>
          </div>

          <div className="mb-8 rounded-[28px] border border-[#A78BFA]/20 bg-gradient-to-br from-[#181F2A] to-[#141922] p-6">

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A78BFA]/10 text-xl">
                🚀
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Multiplayer Coming Soon
                </h3>

                <p className="text-sm text-[#94A3B8]">
                  Would you play online multiplayer?
                </p>
              </div>
            </div>

            {!vote ? (
              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    submitVote(
                      'yes'
                    )
                  }
                  className="rounded-[20px] bg-[#A78BFA] px-5 py-4 font-semibold text-white transition hover:scale-[1.02]"
                >
                  YES
                </button>

                <button
                  onClick={() =>
                    submitVote(
                      'no'
                    )
                  }
                  className="rounded-[20px] bg-[#1C2430] px-5 py-4 font-semibold text-[#CBD5E1] transition hover:bg-[#242F40]"
                >
                  NO
                </button>
              </div>
            ) : (
              <div className="space-y-3">

                <div className="rounded-[20px] bg-[#1C2430] px-5 py-4 text-center text-sm text-[#CBD5E1]">
                  Thanks for voting —
                  you said{' '}
                  <span className="font-semibold capitalize text-white">
                    {vote}
                  </span>
                </div>

                <button
                  onClick={
                    resetVote
                  }
                  className="w-full rounded-[18px] border border-white/10 bg-[#151A22] px-4 py-3 text-sm text-[#94A3B8] transition hover:bg-[#1C2430]"
                >
                  Change Vote
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                useChessStore.setState({
                  gameMode:
                    'local',
                })
              }
              className={`rounded-[24px] px-6 py-5 transition-all ${
                gameMode ===
                'local'
                  ? 'bg-[#A78BFA] text-white shadow-[0_0_40px_rgba(167,139,250,0.25)]'
                  : 'bg-[#1C2430] text-[#94A3B8] hover:bg-[#242F40]'
              }`}
            >
              Play Local
            </button>

            <button
              onClick={() =>
                useChessStore.setState({
                  gameMode:
                    'ai',
                })
              }
              className={`rounded-[24px] px-6 py-5 transition-all ${
                gameMode ===
                'ai'
                  ? 'bg-[#A78BFA] text-white shadow-[0_0_40px_rgba(167,139,250,0.25)]'
                  : 'bg-[#1C2430] text-[#94A3B8] hover:bg-[#242F40]'
              }`}
            >
              Play AI
            </button>
          </div>

          {gameMode ===
          'ai' && (
            <div className="mt-5">
              <button
                onClick={() =>
                  setLearningMode(
                    !enabled
                  )
                }
                className={`w-full rounded-[24px] px-6 py-5 font-semibold transition-all ${
                  enabled
                    ? 'bg-[#8FB8A8] text-black shadow-[0_0_40px_rgba(143,184,168,0.25)]'
                    : 'bg-[#1C2430] text-[#94A3B8] hover:bg-[#242F40]'
                }`}
              >
                {enabled
                  ? 'Learning Mode Enabled'
                  : 'Enable Learning Mode'}
              </button>
            </div>
          )}

          {gameMode ===
          'local' && (
            <div className="mt-6">

              <p className="mb-3 text-sm font-medium text-[#94A3B8]">
                Select Time Control
              </p>

              <div className="grid grid-cols-2 gap-4">

                <button
                  onClick={() =>
                    setMode(
                      'blitz'
                    )
                  }
                  className="rounded-[24px] bg-[#1C2430] px-6 py-5 transition hover:bg-[#242F40]"
                >
                  3 Min Blitz
                </button>

                <button
                  onClick={() =>
                    setMode(
                      'rapid'
                    )
                  }
                  className="rounded-[24px] bg-[#1C2430] px-6 py-5 transition hover:bg-[#242F40]"
                >
                  10 Min Rapid
                </button>
              </div>
            </div>
          )}

          {gameMode ===
          'ai' && (
            <div className="mt-6">

              <p className="mb-3 text-sm font-medium text-[#94A3B8]">
                Select Difficulty
              </p>

              <div className="grid grid-cols-3 gap-3">

                <button
                  onClick={() => {
                    useChessStore.setState({
                      aiDifficulty:
                        'easy',
                    });

                    setMode(
                      'rapid'
                    );
                  }}
                  className="rounded-[24px] bg-[#1C2430] px-4 py-5 transition hover:bg-[#242F40]"
                >
                  Easy
                </button>

                <button
                  onClick={() => {
                    useChessStore.setState({
                      aiDifficulty:
                        'medium',
                    });

                    setMode(
                      'rapid'
                    );
                  }}
                  className="rounded-[24px] bg-[#1C2430] px-4 py-5 transition hover:bg-[#242F40]"
                >
                  Medium
                </button>

                <button
                  onClick={() => {
                    useChessStore.setState({
                      aiDifficulty:
                        'hard',
                    });

                    setMode(
                      'rapid'
                    );
                  }}
                  className="rounded-[24px] bg-[#1C2430] px-4 py-5 transition hover:bg-[#242F40]"
                >
                  Hard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const opponentTime =
    playerColor ===
    'white'
      ? blackTime
      : whiteTime;

  const yourTime =
    playerColor ===
    'white'
      ? whiteTime
      : blackTime;

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto px-4 py-3 lg:h-screen lg:overflow-hidden">

      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-6 lg:h-full lg:flex-row lg:items-center lg:justify-center lg:gap-10">

        {/* LEFT PANEL */}
        <div className="hidden lg:block lg:w-[220px] lg:space-y-4">

          <div className="rounded-[32px] border border-white/10 bg-[#151A22]/80 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
              Opponent
            </p>

            <h2 className="mb-4 text-2xl font-semibold">
              {gameMode ===
              'ai'
                ? playerColor ===
                  'white'
                  ? 'AI (Black)'
                  : 'AI (White)'
                : 'Player 2'}
            </h2>

            {gameMode ===
            'local' ? (
              <p className="text-5xl font-bold">
              {formatTime(
                opponentTime
              )}
            </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-[#94A3B8]">
                  Difficulty
                </p>

                <div className="inline-flex rounded-full bg-[#A78BFA]/10 px-4 py-2 text-sm font-semibold capitalize text-[#A78BFA]">
                  {aiDifficulty}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#151A22]/80 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
              You
            </p>

            <h2 className="mb-4 text-2xl font-semibold">
              {playerColor}
            </h2>

            {gameMode ===
            'local' ? (
              <p className="text-5xl font-bold">
                {formatTime(
                  yourTime
                )}
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-[#94A3B8]">
                  Mode
                </p>

                <div className="inline-flex rounded-full bg-[#8FB8A8]/10 px-4 py-2 text-sm font-semibold text-[#8FB8A8]">
                  Practice vs AI
                </div>
              </div>
            )}
          </div>
        </div>

        
{/* MOBILE OPPONENT */}
        <div className="mb-4 w-full max-w-[420px] lg:hidden">
          <div className="rounded-[24px] border border-white/10 bg-[#151A22]/90 px-5 py-4">

            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
              Opponent
            </p>

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-semibold">
                {gameMode === 'ai'
                  ? playerColor === 'white'
                    ? 'AI (Black)'
                    : 'AI (White)'
                  : playerColor === 'white'
                    ? 'Black'
                    : 'White'}
              </h2>

              {gameMode === 'local' ? (
                <p className="text-xl font-bold">
                  {formatTime(opponentTime)}
                </p>
              ) : (
                <span className="rounded-full bg-[#A78BFA]/10 px-3 py-1 text-sm capitalize text-[#A78BFA]">
                  {aiDifficulty}
                </span>
              )}
            </div>
          </div>
        </div>

{/* BOARD */}
        <div className="order-1 flex w-full flex-col items-center lg:order-2">

          <div className="mb-3 text-center">
            <div className="mt-4 w-full max-w-[430px] lg:hidden">
              <div className="rounded-[24px] border border-white/10 bg-[#151A22]/90 px-5 py-4 backdrop-blur-xl">

                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                  Opponent
                </p>

                <div className="flex items-center justify-between">

                  <h2 className="text-lg font-semibold">
                    {gameMode ===
                    'ai'
                      ? playerColor ===
                        'white'
                        ? 'AI (Black)'
                        : 'AI (White)'
                      : playerColor ===
                        'white'
                        ? 'Black'
                        : 'White'}
                  </h2>

                  {gameMode ===
                  'local' ? (
                    <p className="text-xl font-bold">
                      {formatTime(
                        opponentTime
                      )}
                    </p>
                  ) : (
                    <div className="rounded-full bg-[#A78BFA]/10 px-3 py-1 text-sm capitalize text-[#A78BFA]">
                      {aiDifficulty}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold tracking-[-0.06em]">
              Knightly
            </h1>

            <p className="text-[#94A3B8]">
              {gameMode ===
              'ai'
                ? `AI Match · ${aiDifficulty}`
                : 'Local Match'}
            </p>

            <div className="mt-4 w-full max-w-[430px] lg:hidden">
              <div className="rounded-[24px] border border-white/10 bg-[#151A22]/90 px-5 py-4 backdrop-blur-xl">

                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                  Opponent
                </p>

                <div className="flex items-center justify-between">

                  <h2 className="text-lg font-semibold">
                    {gameMode ===
                    'ai'
                      ? playerColor ===
                        'white'
                        ? 'AI (Black)'
                        : 'AI (White)'
                      : playerColor ===
                        'white'
                        ? 'Black'
                        : 'White'}
                  </h2>

                  {gameMode ===
                  'local' ? (
                    <p className="text-xl font-bold">
                      {formatTime(
                        opponentTime
                      )}
                    </p>
                  ) : (
                    <div className="rounded-full bg-[#A78BFA]/10 px-3 py-1 text-sm capitalize text-[#A78BFA]">
                      {aiDifficulty}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-[#151A22]/80 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <Chessboard
              id="KnightlyBoard"
              position={fen}
              onPieceDrop={
                onDrop
              }
              boardWidth={
                typeof window !==
                'undefined'
                  ? window.innerWidth <
                    1024
                    ? Math.min(
                        window.innerWidth -
                          32,
                        590
                      )
                    : 590
                  : 590
              }
              boardOrientation={
                playerColor
              }
              customDarkSquareStyle={{
                backgroundColor:
                  '#232A35',
              }}
              customLightSquareStyle={{
                backgroundColor:
                  '#D8D4CC',
              }}
            />
          </div>
        </div>

        
        {/* MOBILE PLAYER */}
        <div className="mt-4 w-full max-w-[420px] lg:hidden">
          <div className="rounded-[24px] border border-white/10 bg-[#151A22]/90 px-5 py-4">

            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
              You
            </p>

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-semibold capitalize">
                {playerColor}
              </h2>

              {gameMode === 'local' ? (
                <p className="text-xl font-bold">
                  {formatTime(yourTime)}
                </p>
              ) : (
                <span className="rounded-full bg-[#8FB8A8]/10 px-3 py-1 text-sm text-[#8FB8A8]">
                  Practice
                </span>
              )}
            </div>
          </div>
        </div>

{/* RIGHT PANEL */}
        <div className="hidden lg:block lg:w-[260px] lg:space-y-4">

          <div className="rounded-[32px] border border-white/10 bg-[#151A22]/80 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
              Status
            </p>

            <h3 className="text-2xl font-semibold">
              {gameStatus}
            </h3>

            {aiThinking && (
              <p className="mt-3 text-[#A78BFA]">
                AI is thinking...
              </p>
            )}
          </div>

          {enabled && moveCategory && (
            <div className="rounded-[32px] border border-[#A78BFA]/20 bg-[#151A22]/80 p-6">

              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#A78BFA]">
                Learning Coach
              </p>

              <div className="mb-3 inline-flex rounded-full bg-[#A78BFA]/10 px-4 py-2 text-sm font-semibold capitalize text-[#A78BFA]">
                {moveCategory}
              </div>

              <p className="text-sm leading-7 text-[#CBD5E1]">
                {coachingText}
              </p>

              {bestMove && (
                <div className="mt-4 rounded-2xl bg-[#1C2430] p-4">
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                    Suggested Move
                  </p>

                  <p className="font-semibold text-white">
                    {bestMove}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="relative rounded-[32px] border border-white/10 bg-[#151A22]/80 p-6">

            <button
              onClick={() =>
                setShowMenu(
                  !showMenu
                )
              }
              className="rounded-2xl bg-[#1C2430] p-3 transition hover:bg-[#242F40]"
            >
              <MoreVertical />
            </button>

            {showMenu && (
              <div className="absolute right-7 top-20 z-50 flex w-44 flex-col rounded-[24px] border border-white/10 bg-[#1C2430] p-2 shadow-xl">

                <button
                  onClick={() => {
                    restartGame();

                    setShowMenu(
                      false
                    );
                  }}
                  className="rounded-xl px-4 py-3 text-left hover:bg-white/5"
                >
                  Restart Match
                </button>

                <button
                  onClick={() => {
                    restartGame();

                    useChessStore.setState({
                      mode:
                        null,
                    });

                    setShowMenu(
                      false
                    );
                  }}
                  className="rounded-xl px-4 py-3 text-left hover:bg-white/5"
                >
                  Go Home
                </button>


                <button
                  onClick={() => {
                    resign(
                      turn ===
                        'w'
                        ? 'white'
                        : 'black'
                    );

                    setShowMenu(
                      false
                    );
                  }}
                  className="rounded-xl px-4 py-3 text-left text-red-400 hover:bg-white/5"
                >
                  Resign
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
