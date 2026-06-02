/// <reference lib="webworker" />

const engine =
  new Worker(
    '/stockfish/stockfish.js'
  );

engine.postMessage(
  'uci'
);

engine.postMessage(
  'ucinewgame'
);

engine.postMessage(
  'isready'
);

self.onmessage =
  (
    event
  ) => {
    const {
      fen,
      depth,
    } =
      event.data;

    const handler =
      (
        e
      ) => {
        const line =
          e.data;

        if (
          typeof line !==
          'string'
        )
          return;

        if (
          line.startsWith(
            'bestmove'
          )
        ) {
          engine.removeEventListener(
            'message',
            handler
          );

          const move =
            line.split(
              ' '
            )[1];

          self.postMessage({
            bestMove:
              move,
          });
        }
      };

    engine.addEventListener(
      'message',
      handler
    );

    engine.postMessage(
      `position fen ${fen}`
    );

    engine.postMessage(
      `go depth ${depth}`
    );
  };
