import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Download } from "lucide-react";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const navLinks = [
  { label: "Work",    href: "/#work"    },
  { label: "About",   href: "/#about"   },
  { label: "Contact", href: "#contact"  },
];

const Navigation = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Also toggle the "dark" class so useDarkMode() hook works in Hero/CreativeSide
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent md:bg-transparent bg-background/95"
      }`}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,32px)" }}
        className="flex items-center justify-between h-12 md:h-16"
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600, color: "hsl(var(--foreground))", textDecoration: "none", letterSpacing: "-0.02em" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
          onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
        >
          Deepak Maan
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 400, color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
              onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
            >
              {l.label}
            </a>
          ))}

          {/* Desktop Resume — filled indigo */}
          <a
            href="https://drive.google.com/file/d/1tWK-Bwp1GitmStoG1zW5VvXjg-2zU4-3/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500, padding: "7px 16px", borderRadius: 100, background: "#6366f1", color: "#fff", textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Resume <Download size={12} />
          </a>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>

        {/* Mobile — theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 400, color: "hsl(var(--foreground))", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}

            {/* Mobile Resume — matches desktop style */}
            <a
              href="https://drive.google.com/file/d/1tWK-Bwp1GitmStoG1zW5VvXjg-2zU4-3/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start"
              style={{
                fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500,
                padding: "8px 18px", borderRadius: 100,
                background: "#6366f1", color: "#fff",
                textDecoration: "none", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              onClick={() => setMenuOpen(false)}
            >
              Resume <Download size={12} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
