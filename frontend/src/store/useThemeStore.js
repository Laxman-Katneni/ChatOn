import { create } from "zustand";
// To save the theme to our local storage
// So everytime we still have the selected theme

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    // Manipulating the local storage
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
