type AnalysisResult = {
  evaluation:
    number;

  bestMove:
    string;
};

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
          './learningWorker.ts',
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

export async function
  analyzePosition(
    fen: string
  ): Promise<
    AnalysisResult
  > {
  const worker =
    initWorker();

  if (!worker) {
    return {
      evaluation:
        0,

      bestMove:
        '',
    };
  }

  return new Promise(
    (
      resolve
    ) => {
      const timeout =
        setTimeout(
          () => {
            resolve({
              evaluation:
                0,

              bestMove:
                '',
            });
          },
          5000
        );

      worker.onmessage =
        (
          event
        ) => {
          clearTimeout(
            timeout
          );

          resolve({
            evaluation:
              event.data
                ?.evaluation ??
              0,

            bestMove:
              event.data
                ?.bestMove ??
              '',
          });
        };

      worker.postMessage({
        fen,
        depth: 8,
      });
    }
  );
}
