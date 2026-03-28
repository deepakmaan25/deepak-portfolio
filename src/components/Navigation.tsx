import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Download } from "lucide-react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "mailto:dipumaan2002@gmail.com" },
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
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
        className="flex items-center justify-between h-16"
      >
        {/* Logo / Name */}
        <Link
          to="/"
          className="font-heading text-foreground hover:text-indigo-500 transition-colors"
          style={{ fontSize: 20 }}
        >
          Deepak Maan
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}

          <a
            href="https://drive.google.com/file/d/1tWK-Bwp1GitmStoG1zW5VvXjg-2zU4-3/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium px-4 py-2 rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Resume
            <Download size={12} />
          </a>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </nav>

        {/* Mobile — theme + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-sm font-medium text-foreground hover:text-indigo-500 transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1tWK-Bwp1GitmStoG1zW5VvXjg-2zU4-3/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              Resume ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
