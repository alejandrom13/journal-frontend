"use client";
import { ThemeProvider } from "@/components/theme-context";
import ThemeSwitcher from "@/components/theme-switcher";
import { useTheme } from "@/lib/useTheme";
import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import useThemeStore from "./states/themeState";

const queryClient = new QueryClient();

const HomeTemplate = ({ children }: any) => {
  const { user, isLoaded } = useUser();
  const { theme, setTheme } = useThemeStore();
  useEffect(() => {
    if (isLoaded && user) {
      const theme = user?.publicMetadata?.theme! as string;
      if (theme) {
        changeTheme(theme);
        setTheme(theme);
      }
    } else {
      changeTheme("default");
    }
  }, [isLoaded, setTheme, user]);

  const changeTheme = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    if (user?.publicMetadata?.theme) {
      changeTheme(user?.publicMetadata?.theme! as string);
    }
  }),
    [user?.publicMetadata?.theme];

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default HomeTemplate;
