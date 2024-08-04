// src/store/themeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  curTheme: string
  changeTheme: (newTheme: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      curTheme: 'default',
      changeTheme: (newTheme: string) => {
        set({ curTheme: newTheme })
        document.documentElement.setAttribute('data-theme', newTheme)
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)