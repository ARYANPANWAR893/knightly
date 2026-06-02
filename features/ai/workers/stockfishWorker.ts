/// <reference lib="webworker" />

const stockfishEngine =
  new Worker(
    '/stockfish/stockfish.js'
  );

stockfishEngine.postMessage(
  'uci'
);

stockfishEngine.postMessage(
  'ucinewgame'
);

stockfishEngine.postMessage(
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
        e: MessageEvent
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
          stockfishEngine.removeEventListener(
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

    stockfishEngine.addEventListener(
      'message',
      handler
    );

    stockfishEngine.postMessage(
      `position fen ${fen}`
    );

    stockfishEngine.postMessage(
      `go depth ${depth}`
    );
  };
