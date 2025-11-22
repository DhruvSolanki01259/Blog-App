import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/theme.store";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300'>
      {theme === "light" ? (
        <Moon className='w-5 h-5' />
      ) : (
        <Sun className='w-5 h-5' />
      )}
    </button>
  );
};

export default ThemeToggle;
