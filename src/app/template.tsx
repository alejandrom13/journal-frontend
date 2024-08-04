"use client";
import { ThemeProvider } from "@/components/theme-context";
import ThemeSwitcher from "@/components/theme-switcher";
import { useTheme } from "@/lib/useTheme";
import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

const HomeTemplate = ({ children }: any) => {
  const { user } = useUser();
  useEffect(() => {
    // if (localStorage.getItem("theme")) {
    //   changeTheme(localStorage.getItem("theme")!);
    // }
    if (user?.publicMetadata?.theme) {
      changeTheme(user?.publicMetadata?.theme! as string);
    } else {
      changeTheme("default");
    }
  }, []);

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
