import { create } from 'zustand';

interface DateState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<DateState>((set) => ({
  selectedDate: (() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  })(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}));