import { create } from "zustand";

interface KeyStrokeState {
    enableKeyStroke: boolean;
    setEnableKeyStroke: (enable: boolean) => void;
}

export const useKeystrokeState = create<KeyStrokeState>((set) => ({
  enableKeyStroke: true,
  setEnableKeyStroke: (enable: boolean) => set({ enableKeyStroke: enable }),
}));
