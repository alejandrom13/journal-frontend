import { Button } from "./ui/button";
import { updateTheme } from "@/actions/handleTheme";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useThemeStore } from "@/app/states/themeState";


const styles = [
  { name: "Default", value: "default" },
  { name: "Emerald", value: "emerald" },
  { name: "Sunset Glow", value: "sunset_glow" },
  { name: "Lavender Mist", value: "lavender_mist" },
];

const ThemeSwitcher = () => {
  const { curTheme, changeTheme } = useThemeStore();
  const { user } = useUser();

  const handleUpdate = async (newTheme: string, userId: string) => {
    try {
      const data = {
        userId,
        theme: newTheme,
      };

      await updateTheme(data);
      changeTheme(newTheme);
      toast.success("Theme updated");
    } catch (error) {
      toast.error("An error occurred while updating the theme");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mt-4">Choose a theme</h3>
      <div className="flex flex-row gap-4 mt-2">
        {styles.map((style) => (
          <Button
            key={style.value}
            onClick={() => handleUpdate(style.value, user?.id!)}
            className={`${
              curTheme === style.value
                ? "bg-primary text-white rounded-full border border-primary/30"
                : "bg-white text-primary border border-primary/30 rounded-full hover:bg-primary/10"
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