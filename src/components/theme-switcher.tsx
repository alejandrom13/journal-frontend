import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTheme } from "@/actions/handleTheme";
import { toast } from "sonner";
import { useTheme } from "@/lib/useTheme";

const ThemeSwitcher = ({ userId, currentTheme }: any) => {
  const [curTheme, setCurTheme] = useState(currentTheme);

  useEffect(() => {
    if (currentTheme) {
      setCurTheme(currentTheme);
    }
  }, [currentTheme]);

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
            key={style.value}
            onClick={() => {
              setTheme(style.value);
              setCurTheme(style.value);
              changeTheme(style.value);
              handleUpdate(style.value);

              toast.success("Theme updated");
            }}
            className={`${
              curTheme === style.value
                ? "bg-primary text-white rounded-full border border-primary/30 "
                : "bg-white text-primary border border-primary/30 rounded-full  hover:bg-primary/10"
            }`}
          >
            {style.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
