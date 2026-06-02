import { create } from 'zustand';

type MultiplayerStore = {
  connected: boolean;
  setConnected: (status: boolean) => void;
};

export const useMultiplayerStore =
  create<MultiplayerStore>((set) => ({
    connected: false,

    setConnected: (status) =>
      set({
        connected: status,
      }),
  }));
