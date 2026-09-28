import { create } from "zustand";

type UiState = {
  menuOpen: boolean;
  headerScrolled: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  setHeaderScrolled: (scrolled: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  menuOpen: false,
  headerScrolled: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  setHeaderScrolled: (headerScrolled) => set({ headerScrolled }),
}));
