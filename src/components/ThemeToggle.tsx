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
      className="relative w-[52px] h-[28px] rounded-full transition-colors duration-250 flex-shrink-0"
      style={{
        background: dark ? '#6366F1' : '#E8E8E8',
      }}
      aria-label="Toggle theme"
    >
      <div
        className="absolute top-[2px] w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center transition-all duration-250"
        style={{
          left: dark ? '26px' : '2px',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {dark ? <Moon size={14} className="text-white" style={{ color: '#6366F1' }} /> : <Sun size={14} style={{ color: '#F59E0B' }} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
