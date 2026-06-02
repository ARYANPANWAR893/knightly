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

    let evaluation =
      0;

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
          line.includes(
            'score cp'
          )
        ) {
          const match =
            line.match(
              /score cp (-?\d+)/
            );

          if (
            match
          ) {
            evaluation =
              Number(
                match[1]
              );
          }
        }

        if (
          line.startsWith(
            'bestmove'
          )
        ) {
          engine.removeEventListener(
            'message',
            handler
          );

          const bestMove =
            line.split(
              ' '
            )[1];

          self.postMessage({
            bestMove,
            evaluation,
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
