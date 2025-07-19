import { create } from "zustand";
import type { Theme, ThemeState } from "../types";

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("chat-theme") || ("coffee" as Theme),
  setTheme: (theme: Theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
