import { create } from 'zustand';

interface DateState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<DateState>((set) => ({
  selectedDate: (() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of day in user's local time
    return now;
  })(),
  setSelectedDate: (date: Date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0); // Ensure any set date is also at start of day
    set({ selectedDate: adjustedDate });
  },
}));