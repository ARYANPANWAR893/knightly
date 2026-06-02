import {
  AIDifficulty,
  getDifficultyConfig,
} from '../utils/difficulty';

let worker:
  | Worker
  | null = null;

function initWorker() {
  if (
    typeof window ===
    'undefined'
  )
    return null;

  if (!worker) {
    worker =
      new Worker(
        new URL(
          '../workers/stockfishWorker.ts',
          import.meta.url
        ),
        {
          type:
            'module',
        }
      );
  }

  return worker;
}

export async function getAIMove(
  fen: string,
  difficulty:
    AIDifficulty,
  adaptation = 0
): Promise<
  string | null
> {
  const config =
    getDifficultyConfig(
      difficulty,
      adaptation
    );

  const worker =
    initWorker();

  if (!worker)
    return null;

  return new Promise(
    (
      resolve
    ) => {
      const timeout =
        setTimeout(
          () => {
            resolve(
              null
            );
          },
          8000
        );

      worker.onmessage =
        (
          event
        ) => {
          const move =
            event.data
              ?.bestMove;

          if (
            !move
          )
            return;

          clearTimeout(
            timeout
          );

          setTimeout(
            () => {
              resolve(
                move
              );
            },
            config.moveTime
          );
        };

      worker.postMessage({
        fen,
        depth:
          config.depth,
      });
    }
  );
}
