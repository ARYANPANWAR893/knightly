import { create } from 'zustand';

type ChessStore = {
  gameId: string | null;
  setGameId: (id: string | null) => void;
};

export const useChessStore = create<ChessStore>((set) => ({
  gameId: null,

  setGameId: (id) =>
    set({
      gameId: id,
    }),
}));
