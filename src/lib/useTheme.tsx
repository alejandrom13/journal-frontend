import { updateTheme } from "@/actions/handleTheme";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useTheme = (currentTheme: any, userId: string) => {
    const [theme, setTheme] = useState(currentTheme || "Default");
  
    useEffect(() => {
      if (currentTheme) {
        setTheme(currentTheme);
        changeTheme(currentTheme);
      } else {
        setTheme("Default");
      }
    }, [currentTheme]);
  
    const { mutate, isPending, isSuccess } = useMutation({
      mutationFn: () => updateTheme(userId, theme),
      onSuccess: () => {
        toast.success("Theme updated");
      },
    });
  
    const changeTheme = (newTheme: string) => {
      document.documentElement.setAttribute("data-theme", newTheme);
      setTheme(newTheme);
    };
  
    const handleUpdate = () => {
      mutate();
    };
  
    const styles = ["Default", "Emerald", "Sunset Glow", "Lavender Mist"];
  
    return {
      theme,
      setTheme,
      changeTheme,
      handleUpdate,
      isPending,
      isSuccess,
      styles,
    };
  };