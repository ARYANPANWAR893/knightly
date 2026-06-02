import { create } from 'zustand';

type UIStore = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
}));
