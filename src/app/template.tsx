"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useThemeStore } from "./states/themeState";

// Create a theme context
const ThemeContext = createContext<{
  curTheme: string;
  changeTheme: (newTheme: string) => void;
}>({ curTheme: "default", changeTheme: () => {} });

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

const queryClient = new QueryClient();

const HomeTemplate = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { changeTheme } = useThemeStore();

  useEffect(() => {
    if (isLoaded && user) {
      const theme = user.publicMetadata?.theme as string;
      if (theme) {
        changeTheme(theme);
      }
    } else if (isLoaded && !user) {
      changeTheme("default");
    }
  }, [isLoaded, user, changeTheme]);


  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default HomeTemplate;