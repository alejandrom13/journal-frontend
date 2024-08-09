import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  setLoading: (enable: boolean) => void;
}

export const useLoadingState = create<LoadingState>((set) => ({
  loading: true,
  setLoading: (enable: boolean) => set({ loading: enable }),
}));
