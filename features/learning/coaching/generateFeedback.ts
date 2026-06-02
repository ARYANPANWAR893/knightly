import {
  MoveCategory,
} from '../store/learningStore';

export function
  generateFeedback(
    category:
      MoveCategory,
    tacticalReason?:
      string | null
  ) {
  const tactical =
    tacticalReason
      ? ` ${tacticalReason}`
      : '';

  switch (
    category
  ) {
    case 'best':
      return {
        title:
          'Best Move',
        text:
          `You found the strongest continuation.${tactical}`,
      };

    case 'excellent':
      return {
        title:
          'Excellent Move',
        text:
          `A strong move that improved your position.${tactical}`,
      };

    case 'good':
      return {
        title:
          'Good Move',
        text:
          `A solid move that keeps your position healthy.${tactical}`,
      };

    case 'inaccuracy':
      return {
        title:
          'Inaccuracy',
        text:
          `You missed a slightly stronger continuation.${tactical}`,
      };

    case 'mistake':
      return {
        title:
          'Mistake',
        text:
          `This weakened your position.${tactical}`,
      };

    case 'blunder':
      return {
        title:
          'Blunder',
        text:
          `This move loses significant value.${tactical}`,
      };

    default:
      return {
        title:
          'Move Played',
        text:
          'Keep learning and improving.',
      };
  }
}
