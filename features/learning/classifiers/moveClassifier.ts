import {
  MoveCategory,
} from '../store/learningStore';

export function
  classifyMove(
    centipawnLoss:
      number
  ): MoveCategory {
  if (
    centipawnLoss <=
    10
  ) {
    return 'best';
  }

  if (
    centipawnLoss <=
    30
  ) {
    return 'excellent';
  }

  if (
    centipawnLoss <=
    60
  ) {
    return 'good';
  }

  if (
    centipawnLoss <=
    100
  ) {
    return 'inaccuracy';
  }

  if (
    centipawnLoss <=
    200
  ) {
    return 'mistake';
  }

  return 'blunder';
}
