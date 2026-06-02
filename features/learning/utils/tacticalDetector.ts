import { Chess } from 'chess.js';

type TacticalFeedback = {
  reason: string | null;
};

const pieceValue = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 100,
};

export function detectTacticalTheme(
  beforeFen: string,
  afterFen: string
): TacticalFeedback {
  const before =
    new Chess(
      beforeFen
    );

  const after =
    new Chess(
      afterFen
    );

  // king safety
  if (
    afterFen.includes(
      'K'
    ) &&
    after.history().some(
      (
        move
      ) =>
        move ===
          'O-O' ||
        move ===
          'O-O-O'
    )
  ) {
    return {
      reason:
        'Castling improved king safety.',
    };
  }

  // center control
  const center =
    ['d4', 'd5', 'e4', 'e5'];

  const moves =
    after.history({
      verbose:
        true,
    });

  const lastMove =
    moves[
      moves.length -
        1
    ];

  if (
    center.includes(
      lastMove?.to
    )
  ) {
    return {
      reason:
        'You improved control of the center.',
    };
  }

  // development
  if (
    ['n', 'b'].includes(
      lastMove
        ?.piece
    )
  ) {
    return {
      reason:
        'You developed a piece actively.',
    };
  }

  return {
    reason:
      null,
  };
}
