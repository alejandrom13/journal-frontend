import { updateTheme } from "@/actions/handleTheme";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useTheme = (currentTheme: any, userId: string) => {
  const [theme, setTheme] = useState(currentTheme || "Default");
  const [isUpdating, setIsUpdating] = useState(false);

  const changeTheme = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  const handleUpdate = async (newTheme: string) => {
    setIsUpdating(true);
    try {
      const data = JSON.parse(
        JSON.stringify({
          userId,
          theme: newTheme,
        })
      );

      const result = await updateTheme(data);
      setIsUpdating(false);
      return result;
    } catch (error) {
      toast.error("An error occurred while updating the theme");
    } finally {
      setIsUpdating(false);
    }
  };

  const styles = [
    {
      name: "Default",
      value: "default",
    },
    {
      name: "Emerald",
      value: "emerald",
    },
    {
      name: "Sunset Glow",
      value: "sunset_glow",
    },
    {
      name: "Lavender Mist",
      value: "lavender_mist",
    },
  ];

  return {
    theme,
    setTheme,
    changeTheme,
    handleUpdate,

    styles,
  };
};
