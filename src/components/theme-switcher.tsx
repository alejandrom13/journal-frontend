import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTheme } from "@/actions/handleTheme";
import { toast } from "sonner";
import { useTheme } from "@/lib/useTheme";

const ThemeSwitcher = ({ userId, currentTheme }: any) => {
  const {
    theme,
    setTheme,
    changeTheme,
    handleUpdate,

    styles,
  } = useTheme(currentTheme, userId);

  return (
    <div>
      <h3 className="text-lg font-semibold mt-4">Choose a theme</h3>
      <div className="flex flex-row gap-4 mt-2">
        {styles.map((style) => (
          <Button
            key={style}
            onClick={() => {
              setTheme(style);
              changeTheme(style);
              handleUpdate();
              localStorage.setItem("theme", style); // Save theme to local storage
              toast.success("Theme updated");

            }}
            className={`${
              theme === style
                ? "bg-primary text-white rounded-full border border-primary/30 "
                : "bg-white text-primary border border-primary/30 rounded-full  hover:bg-primary/10"
            }`}
          >
            {style}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
