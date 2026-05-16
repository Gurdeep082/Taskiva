import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
        padding: "10px 16px",
        borderRadius: "10px",
        fontWeight: "600",
      }}
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;