import { create } from 'zustand';

// Define the shape of your state
interface ThemeState {
  theme: string;
  setTheme: (newTheme: string) => void;
}

// Create the Zustand store
const useThemeStore = create<ThemeState>((set) => ({
  theme: 'default', // default theme
  setTheme: (newTheme) => set({ theme: newTheme }),
}));

export default useThemeStore;
