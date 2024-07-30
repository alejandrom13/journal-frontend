"use client";
import { ThemeProvider } from "@/components/theme-context";
import ThemeSwitcher from "@/components/theme-switcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const HomeTemplate = ({ children }: any) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default HomeTemplate;
