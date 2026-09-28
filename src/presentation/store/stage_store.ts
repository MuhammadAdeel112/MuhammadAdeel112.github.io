import { create } from "zustand";

type StageState = {
  isOpen: boolean;
  appId: string | null;
  screenIndex: number;
  splashHidden: boolean;
  shelfUsed: boolean;
  openApp: (id: string) => void;
  closeApp: () => void;
  hideSplash: () => void;
  setScreen: (index: number) => void;
  stepScreen: (dir: number, viewCount: number) => "splash" | "press" | "moved";
};

export const useStageStore = create<StageState>((set, get) => ({
  isOpen: false,
  appId: null,
  screenIndex: 0,
  splashHidden: false,
  shelfUsed: false,
  openApp: (id) =>
    set({
      isOpen: true,
      appId: id,
      screenIndex: 0,
      splashHidden: false,
      shelfUsed: true,
    }),
  closeApp: () =>
    set({
      isOpen: false,
      appId: null,
      screenIndex: 0,
      splashHidden: false,
    }),
  hideSplash: () => set({ splashHidden: true }),
  setScreen: (screenIndex) => set({ screenIndex }),
  stepScreen: (dir, viewCount) => {
    const { splashHidden, screenIndex } = get();
    if (!splashHidden) {
      set({ splashHidden: true });
      return "splash";
    }
    if (viewCount < 2) return "press";
    const next = (screenIndex + dir + viewCount) % viewCount;
    set({ screenIndex: next });
    return "moved";
  },
}));
