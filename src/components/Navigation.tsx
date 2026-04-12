import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Download } from "lucide-react";

const FONT_BODY = "'Aileron', sans-serif";
const FONT_DISPLAY = "'Unbounded', sans-serif";

const NAV_H_MOBILE  = 48;
const NAV_H_DESKTOP = 64;

// ── Single source of truth for resume link ────────────────────────────────────
// Direct download URL — recruiter gets the PDF immediately without a Drive preview step
// Update the file ID here if you upload a new version
const RESUME_URL = "https://drive.google.com/uc?export=download&id=1-MjBAU2YX4O9X9UGCSlNg68h_pTTW16W";

const navLinks = [
  { label: "Work",    href: "/#work"   },
  { label: "About",   href: "/#about"  },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [isDesktop,  setIsDesktop]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  const navH = isDesktop ? NAV_H_DESKTOP : NAV_H_MOBILE;

  const scrolledBg = theme === "dark"
    ? "hsla(230,12%,11%,0.92)"
    : "hsla(249,33%,98%,0.88)";
  const solidBg = theme === "dark"
    ? "hsl(230,12%,11%)"
    : "hsl(249,33%,98%)";

  const iconBtnStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    minHeight: "unset",
    borderRadius: "50%",
    border: "1px solid hsl(var(--border))",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "hsl(var(--muted-foreground))",
    flexShrink: 0,
    transition: "color 0.2s, background 0.2s",
    padding: 0,
  };

  // ── Shared resume button style ─────────────────────────────────────────────
  const resumeBtnStyle: React.CSSProperties = {
    fontFamily: FONT_BODY,
    fontSize: 12,
    fontWeight: 500,
    padding: "6px 16px",
    borderRadius: 100,
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--border))",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    lineHeight: 1,
    minHeight: "unset",
    transition: "color 0.2s, border-color 0.2s, background 0.2s",
    cursor: "pointer",
  };

  return (
    <>
      {/* ── Header shell ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: navH,
          display: "flex",
          alignItems: "center",
          transition: "background 0.3s, border-bottom-color 0.3s",
          background: scrolled ? scrolledBg : solidBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(16px,4vw,32px)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: isDesktop ? 15 : 13,
              fontWeight: 600,
              color: "hsl(var(--foreground))",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
            onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
          >
            Deepak Maan
          </Link>

          {/* ── Desktop nav ── */}
          {isDesktop && (
            <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: FONT_BODY, fontSize: 14, fontWeight: 400,
                    color: "hsl(var(--muted-foreground))",
                    textDecoration: "none", lineHeight: 1,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                  onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
                >
                  {l.label}
                </a>
              ))}

              {/* Resume — outlined ghost style, downloads PDF directly */}
              <a
                href={RESUME_URL}
                style={resumeBtnStyle}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#6366f1";
                  el.style.borderColor = "rgba(99,102,241,0.5)";
                  el.style.background = "rgba(99,102,241,0.06)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "hsl(var(--foreground))";
                  el.style.borderColor = "hsl(var(--border))";
                  el.style.background = "transparent";
                }}
              >
                Resume <Download size={11} />
              </a>

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{ ...iconBtnStyle, width: 30, height: 30 }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = "hsl(var(--foreground))"; el.style.background = "hsl(var(--secondary))"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = "hsl(var(--muted-foreground))"; el.style.background = "transparent"; }}
              >
                {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
              </button>
            </nav>
          )}

          {/* ── Mobile controls ── */}
          {!isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={toggleTheme} aria-label="Toggle theme" style={iconBtnStyle}>
                {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
              </button>
              <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" style={iconBtnStyle}>
                {menuOpen ? <X size={13} /> : <Menu size={13} />}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile dropdown ── */}
      {menuOpen && !isDesktop && (
        <div
          style={{
            position: "fixed",
            top: NAV_H_MOBILE,
            left: 0, right: 0,
            zIndex: 49,
            background: solidBg,
            borderBottom: "1px solid hsl(var(--border))",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", padding: "16px clamp(16px,4vw,32px)", gap: 16 }}>
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: FONT_BODY, fontSize: 14, fontWeight: 400,
                  color: "hsl(var(--foreground))", textDecoration: "none", lineHeight: 1,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}

            {/* Mobile resume — same file, same download behaviour */}
            <a
              href={RESUME_URL}
              download="Deepak_Maan_Resume.pdf"
              style={{
                fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500,
                padding: "8px 16px", borderRadius: 100,
                background: "transparent",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 6,
                alignSelf: "flex-start", lineHeight: 1, minHeight: "unset",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Resume <Download size={11} />
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
