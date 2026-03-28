import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const sections = ["work", "process", "about", "contact"];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isWork = location.pathname.startsWith("/case-study");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Work",    href: isHome ? "#work"    : "/#work",    sectionId: "work" },
    { label: "Process", href: isHome ? "#process" : "/#process", sectionId: "process" },
    { label: "About",   href: isHome ? "#about"   : "/#about",   sectionId: "about" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact", sectionId: "contact" },
  ];

  const LinkOrAnchor = ({
    href, children, className, onClick,
  }: {
    href: string; children: React.ReactNode; className?: string; onClick?: () => void;
  }) => {
    if (href.startsWith("#")) {
      return <a href={href} className={className} onClick={onClick}>{children}</a>;
    }
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-background/90 backdrop-blur-sm border-b border-border/40"
        }`}
      >
        <nav className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-[15px] font-semibold text-foreground hover:opacity-70 transition-opacity flex-shrink-0"
          >
            Deepak Maan
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isWork
                ? link.sectionId === "work"
                : activeSection === link.sectionId;
              return (
                <li key={link.label}>
                  <LinkOrAnchor
                    href={link.href}
                    className={`text-[14px] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </LinkOrAnchor>
                </li>
              );
            })}
          </ul>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 bg-foreground text-primary-foreground text-[13px] font-medium rounded-full hover:opacity-85 transition-opacity"
            >
              Resume
            </a>
          </div>

          {/* Mobile right side — ThemeToggle constrained, hamburger fixed size */}
          <div
            className="md:hidden flex items-center gap-2"
            style={{ flexShrink: 0 }}
          >
            {/* Wrap ThemeToggle in a fixed-size container so it can't grow */}
            <div
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <ThemeToggle />
            </div>

            {/* Hamburger — fixed 36×36 */}
            <button
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                position: "relative",
                zIndex: 60,
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: "block",
                  height: 1.5,
                  width: 20,
                  borderRadius: 2,
                  background: "hsl(var(--foreground))",
                  transformOrigin: "center",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1.5,
                  width: 20,
                  borderRadius: 2,
                  background: "hsl(var(--foreground))",
                  transition: "opacity 0.3s, transform 0.3s",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1.5,
                  width: 20,
                  borderRadius: 2,
                  background: "hsl(var(--foreground))",
                  transformOrigin: "center",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
                }}
              />
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(10,10,14,0.97)" }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <LinkOrAnchor
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-white/60 transition-colors"
                >
                  {link.label}
                </LinkOrAnchor>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
