import { useEffect } from "react";
import { useThemeStore } from "../store/theme.store";


const ThemeWrapper = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Set both data-theme and class for Tailwind dark
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return children;
};

export default ThemeWrapper;
