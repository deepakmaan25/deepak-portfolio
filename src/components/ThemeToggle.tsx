import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      style={{
        position: "relative",
        width: 44,
        height: 24,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        padding: 0,
        background: dark ? "#6366F1" : "#E8E8E8",
        transition: "background 0.25s",
        verticalAlign: "middle",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: dark ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
        }}
      >
        {dark
          ? <Moon size={11} style={{ color: "#6366F1", flexShrink: 0 }} />
          : <Sun  size={11} style={{ color: "#F59E0B", flexShrink: 0 }} />
        }
      </div>
    </button>
  );
};

export default ThemeToggle;
