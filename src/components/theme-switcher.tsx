import React from "react";
import { useTheme } from "./theme-context";
import { Select } from "@/components/ui/select";

interface ThemeOption {
  value: string;
  label: string;
}

const ThemeSwitcher: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  const themes: ThemeOption[] = [
    { value: "light-1", label: "Light 1" },
    { value: "light-2", label: "Light 2" },
    { value: "light-3", label: "Light 3" },
    { value: "dark-1", label: "Dark 1" },
    { value: "dark-2", label: "Dark 2" },
    { value: "dark-3", label: "Dark 3" },
  ];

  return (
    <Select
      value={theme}
      onValueChange={(value:any) => changeTheme(value)}
    />
  );
};

export default ThemeSwitcher;
