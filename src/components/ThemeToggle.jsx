import { useEffect, useState } from "react";
import { applyTheme, readTheme } from "../theme";
import Icon from "./Icon";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => (typeof document === "undefined" ? "dark" : readTheme()));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const light = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      onClick={() => setTheme(light ? "dark" : "light")}
    >
      <Icon name={light ? "moon" : "sun"} size={20} />
    </button>
  );
}
