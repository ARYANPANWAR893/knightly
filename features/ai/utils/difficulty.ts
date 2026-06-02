export type AIDifficulty =
  | 'easy'
  | 'medium'
  | 'hard';

export function
  getDifficultyConfig(
    difficulty:
      AIDifficulty,
    adaptation = 0
  ) {
  switch (
    difficulty
  ) {
    case 'easy':
      return {
        depth:
          Math.max(
            2,
            4 +
              adaptation
          ),

        moveTime:
          700 +
          Math.floor(
            Math.random() *
              900
          ),

        randomness:
          0.45,
      };

    case 'medium':
      return {
        depth:
          7 +
          adaptation,

        moveTime:
          600 +
          Math.floor(
            Math.random() *
              700
          ),

        randomness:
          0.18,
      };

    case 'hard':
      return {
        depth:
          11 +
          adaptation,

        moveTime:
          700 +
          Math.floor(
            Math.random() *
              900
          ),

        randomness:
          0.08,
      };

    default:
      return {
        depth:
          7,

        moveTime:
          700,

        randomness:
          0.2,
      };
  }
}
